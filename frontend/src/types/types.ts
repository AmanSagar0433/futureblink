export type Contact = {
  name: string;
  email: string;
  number: string;
};



export type List = {
  userId: string;
  name: string;
  contacts: Contact[];
};

export type ListWithContactsCount = {
  _id: string;
  name: string;
  contactsSize: number;
}

type Position = {
  x: number;
  y: number;
};

type NodeData = {
  key: string;
  label: string;
  value: string;
};

type Node = {
  id: string;
  position: Position;
  type: string;
  data: Partial<NodeData>;
};

type Edge = {
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
  userId: string;
  name: string;
  flowchart: Flowchart;
};
