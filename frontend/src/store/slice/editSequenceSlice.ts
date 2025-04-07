import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  type Node,
  type Edge,
} from '@xyflow/react';
import { toast } from "../../hooks/use-toast";

export interface EditSequencePageState {
  nodes: Node[],
  edges: Edge[],
  h: number,
  w: number,
  lastEdge?: string
}

const initialState: EditSequencePageState = {
  nodes: [
    { id: '1.1', position: { x: 0, y: 0 }, type: "addLead", data: {} },
    { id: '2', position: { x: 0, y: 200 }, type: "startPoint", data: {} },
    { id: '3', position: { x: 0, y: 350 }, type: "add", data: {} },
  ],
  edges: [
    { id: '2(3)', source: '2', target: '3' }
  ],
  h: 350,
  w: 0,
  lastEdge: undefined
}

const emailH = 250;
const delayH = 135;
const newLeadW = 250;

type List = {
  _id: string;
  name: string;
  contactsCount: number;
}

type Delay = {
  waitFor: string,
  waitType: string,
}

export const editSequencePage = createSlice({
  name: "editSequence",
  initialState: initialState,
  reducers: {
    setFlowchart: (state, action: PayloadAction<EditSequencePageState>) => {
      state = action.payload
    },
    setNodes: (state, action: PayloadAction<Node[]>) => {
      state.nodes = action.payload
    },
    setEdges: (state, action: PayloadAction<Edge[]>) => {
      state.edges = action.payload
    },
    addNewLead: (state, action: PayloadAction<{ id: string, list: List }>) => {
      const { id, list } = action.payload;

      // Parse position
      state.w = state.w + newLeadW;
      const newX = state.w;

      // Generate new node ID
      const temp = Number(id.split('.')[1]);
      const newId = `1.${temp + 1}`;

      // Update the clicked node's type to "lead"
      state.nodes = state.nodes.map(n =>
        n.id === id ? {
          ...n,
          type: 'lead',
          data: {
            key: list.name,
            label: list.name,
            value: list._id
          }
        } : n
      );

      // Add a new addLead node
      state.nodes.push({
        id: newId,
        position: { x: newX, y: 0 },
        type: 'addLead',
        data: { position: `${newX},0` },
      });

      // current edgeId
      const edgeId = `${id}(2)`;

      // Add new edge from the old node to node "2"
      state.edges.push({
        id: edgeId,
        source: id,
        target: '2',
      });

      // Save last edge ID
      state.lastEdge = edgeId;

      toast({
        title: `Node ${id}   Position: $${newX},0`,
        description: `Edge: ${edgeId}`,
      });
    },
    deleteLead: (state, action: PayloadAction<{ id: string, position: string }>) => {
      const { id } = action.payload;
      const deletedLeadIndex = Number(id.split('.')[1]);
      const deletedX = state.nodes.find(n => n.id === id)?.position.x || 0;

      // Step 1: Remove the target node
      state.nodes = state.nodes.filter(node => node.id !== id);

      // Step 2: Find and shift right-side nodes (1.x pattern) to the left
      const updatedNodes: Node[] = [];
      state.nodes.forEach(node => {
        const isLeadNode = node.id.startsWith("1.");
        const currentIndex = Number(node.id.split('.')[1]);

        if (isLeadNode && currentIndex > deletedLeadIndex) {
          const newIndex = currentIndex - 1;
          const newId = `1.${newIndex}`;
          const newX = node.position.x - newLeadW;

          updatedNodes.push({
            ...node,
            id: newId,
            position: { x: newX, y: node.position.y },
            data: node.data,
          });
        } else {
          updatedNodes.push(node);
        }
      });

      state.nodes = updatedNodes;

      // Step 3: Update width
      state.w = state.w - newLeadW;

      // Step 4: Remove last edge (optional, or recalculate based on logic)
      state.edges = state.edges.filter(edge => edge.id !== state.lastEdge);

      // Step 6: Show toast
      toast({
        title: `Deleted lead node ${id}`,
        description: `Shifted remaining lead nodes and removed related edges.`,
      });
    },
    addEmail: (state, action: PayloadAction<{ id: string, position: string }>) => {
      const { id, position } = action.payload;

      // const newY = previous h + email h;
      state.h = state.h + emailH;
      const newY = state.h;

      // Generate new node ID
      const oldId = id;
      const newId = `${Number(id) + 1}`;

      // Update the clicked node's type to "lead"
      state.nodes = state.nodes.map(n =>
        n.id === id ? { ...n, type: 'email', id: oldId } : n
      );

      // Add a new addLead node
      state.nodes.push({
        id: newId,
        position: { x: 0, y: newY },
        type: 'add',
        data: {},
      });

      // Add new edge from the old node to new node
      state.edges.push({
        id: `${oldId}(${newId})`,
        source: oldId,
        target: newId,
      });

      toast({
        title: `Node ${id}   Position: ${0},${newY}`,
        description: `Edge: ${oldId}(${newId})`,
      });
    },
    deleteEmail: (state, action: PayloadAction<{ id: string, position: string }>) => {
      const { id } = action.payload;
      const deletedId = Number(id);

      // Step 1: Remove the current node
      state.nodes = state.nodes.filter(node => node.id !== id);

      // Step 2: Find nodes with id > deletedId and shift them up
      const updatedNodes: Node[] = [];
      state.nodes.forEach(node => {
        const nodeIdNum = Number(node.id);
        if (!isNaN(nodeIdNum) && nodeIdNum > deletedId) {
          const newId = String(nodeIdNum - 1);
          const newY = node.position.y - emailH;

          updatedNodes.push({
            ...node,
            id: newId,
            position: { x: node.position.x, y: newY },
            data: {},
          });
        } else {
          updatedNodes.push(node);
        }
      });

      state.nodes = updatedNodes;

      // Step 3: Remove the last edge
      state.edges.pop();

      // Step 4: Reduce total height
      state.h = state.h - emailH;

      toast({
        title: `Deleted delay node ${id}`,
        description: `Shifted subsequent nodes and removed the last edge.`,
      });
    },
    addDelay: (state, action: PayloadAction<{ id: string, delay: Delay }>) => {
      const { id, delay } = action.payload;

      // const newY = previous h + delay h;
      state.h = state.h + delayH;
      const newY = state.h;

      // Generate new node ID
      const oldId = id;
      const newId = `${Number(id) + 1}`;

      // Update the clicked node's type to "lead"
      state.nodes = state.nodes.map(n =>
        n.id === id ? {
          ...n,
          type: 'delay',
          id: oldId,
          data: {
            key: delay.waitType,
            label: `${delay.waitFor} ${delay.waitType}(s)`,
            value: delay.waitFor
          }
        } : n
      );

      // Add a new addLead node
      state.nodes.push({
        id: newId,
        position: { x: 0, y: newY },
        type: 'add',
        data: {},
      });

      // Add new edge from the old node to new node
      state.edges.push({
        id: `${oldId}(${newId})`,
        source: oldId,
        target: newId,
      });

      toast({
        title: `Node ${id}   Position: 0,${newY}`,
        description: `Edge: ${oldId}(${newId})`,
      });
    },
    deleteDelay: (state, action: PayloadAction<{ id: string, position: string }>) => {
      const { id } = action.payload;
      const deletedId = Number(id);

      // Step 1: Remove the current node
      state.nodes = state.nodes.filter(node => node.id !== id);

      // Step 2: Find nodes with id > deletedId and shift them up
      const updatedNodes: Node[] = [];
      state.nodes.forEach(node => {
        const nodeIdNum = Number(node.id);
        if (!isNaN(nodeIdNum) && nodeIdNum > deletedId) {
          const newId = String(nodeIdNum - 1);
          const newY = node.position.y - delayH;

          updatedNodes.push({
            ...node,
            id: newId,
            position: { x: node.position.x, y: newY },
          });
        } else {
          updatedNodes.push(node);
        }
      });

      state.nodes = updatedNodes;

      // Step 3: Remove the last edge
      state.edges.pop();

      // Step 4: Reduce total height
      state.h = state.h - delayH;

      toast({
        title: `Deleted delay node ${id}`,
        description: `Shifted subsequent nodes and removed the last edge.`,
      });


    },
    setDefault: (state, action: PayloadAction<{
      h: number,
      w: number,
      lastEdge?: string
    }>) => {
      state.h = action.payload.h
      state.w = action.payload.w
      state.lastEdge = action.payload.lastEdge
    },
  },
});

const editSequencePageReducer = editSequencePage.reducer;

export const {
  setNodes,
  setEdges,
  setDefault,
  setFlowchart,
  addNewLead,
  deleteLead,
  addEmail,
  addDelay,
  deleteDelay,
  deleteEmail
} = editSequencePage.actions;
export default editSequencePageReducer;
