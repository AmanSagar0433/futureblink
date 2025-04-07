import mongoose, { Schema, Document, Types } from "mongoose";

export type Position = {
  x: number;
  y: number;
};

export type NodeData = {
  key: string;
  label: string;
  value: string;
};

export type Node = {
  id: string;
  position: Position;
  type: string;
  data: Partial<NodeData>;
};

export type Edge = {
  id: string;
  source: string;
  target: string;
};

export type Flowchart = {
  nodes: Node[];
  edges: Edge[];
  h: number;
  w: number;
  lastEdge?: string;
};

export type Sequence = {
  userId: Types.ObjectId;
  name: string;
  flowchart: Flowchart;
};

interface SequenceDocument extends Document, Sequence { }

const positionSchema = new Schema<Position>(
  {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
  },
  { _id: false }
);

const nodeDataSchema = new Schema<NodeData>(
  {
    key: { type: String, default: "" },
    label: { type: String, default: "" },
    value: { type: String, default: "" },
  },
  { _id: false }
);

const nodeSchema = new Schema<Node>(
  {
    id: { type: String, required: true },
    position: { type: positionSchema, required: true },
    type: { type: String, required: true },
    data: { type: nodeDataSchema, default: {} },
  },
  { _id: false }
);

const edgeSchema = new Schema<Edge>(
  {
    id: { type: String, required: true },
    source: { type: String, required: true },
    target: { type: String, required: true },
  },
  { _id: false }
);
const flowchartSchema = new Schema<Flowchart>(
  {
    nodes: { type: [nodeSchema], default: [] },
    edges: { type: [edgeSchema], default: [] },
    h: { type: Number, required: true },
    w: { type: Number, required: true },
    lastEdge: { type: String, required: false },
  },
  { _id: false }
);


const sequenceSchema = new Schema<SequenceDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    flowchart: { type: flowchartSchema, required: true },
  },
  { versionKey: false }
);

sequenceSchema.path("flowchart").default({
  nodes: [
    {
      id: "1.1",
      position: { x: 0, y: 0 },
      type: "addLead",
      data: {},
    },
    {
      id: "2",
      position: { x: 0, y: 200 },
      type: "startPoint",
      data: {},
    },
    {
      id: "3",
      position: { x: 0, y: 350 },
      type: "add",
      data: {},
    },
  ],
  edges: [
    {
      id: "2(3)",
      source: "2",
      target: "3",
    },
  ],
  h: 350,
  w: 0,
  lastEdge: undefined
});


export const SequenceModel = mongoose.model<SequenceDocument>("Sequence", sequenceSchema);
