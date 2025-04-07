import { addMinutes, addHours, addDays } from 'date-fns';
import { getEmailsUsingListIds } from "../db/repositories/list.respository";
import { Edge, Node, Sequence } from "../models/suquence.model";
import { SequenceResponse } from "../types/response.types";
import { agenda } from "./agenda";

export const scheduleEmailReminder = async (
  to: string,
  subject: string,
  message: string,
  when: string = "in 10 seconds"
) => {
  console.log("Email Schedule Started");

  await agenda.schedule(when, "send email", {
    to,
    subject,
    message,
  });
};

export const scheduleEmail = async (
  sequence: SequenceResponse,
  scheduledAt: string
) => {

  const listIds = sequence.flowchart.nodes
    .filter(node => node.type === "lead")
    .map(node => String(node.data.value));

  const emails = await getEmailsUsingListIds(listIds);

  const nodeArr = getConsecutiveFlowPath(sequence.flowchart.nodes, sequence.flowchart.edges)
  const scheduledNodeArr = processNodesWithSchedule(nodeArr, new Date(scheduledAt));

  for (const node of scheduledNodeArr) {
    await agenda.schedule(new Date(node.data.scheduledAt), "send email", {
      to: emails,
      subject: "Hellow world",
      message: "Future blink assignment",
    });
  }
};

export function addDelayToDate(date: Date, value: number, type: string): Date {
  switch (type) {
    case 'minutes':
      return addMinutes(date, value);
    case 'hours':
      return addHours(date, value);
    case 'days':
      return addDays(date, value);
    default:
      return date;
  }
}

export function getConsecutiveFlowPath(nodes: Node[], edges: Edge[]): Node[] {
  const result: Node[] = [];

  const startNode = nodes.find((node) => node.type === 'startPoint');
  if (!startNode) return result;

  let currentId = startNode.id;

  const nodeMap: Record<string, Node> = Object.fromEntries(
    nodes.map((node) => [node.id, node])
  );

  const edgeMap: Record<string, string[]> = edges.reduce((map, edge) => {
    if (!map[edge.source]) map[edge.source] = [];
    map[edge.source].push(edge.target);
    return map;
  }, {} as Record<string, string[]>);

  while (edgeMap[currentId] && edgeMap[currentId].length > 0) {
    const nextId = edgeMap[currentId][0];
    const nextNode = nodeMap[nextId];

    if (!nextNode) break;

    result.push(nextNode);
    currentId = nextId;
  }

  result.pop(); 

  return result;
}

export function processNodesWithSchedule(
  nodeArr: Node[],
  scheduledAt: Date
): any[] {
  if (nodeArr.length === 0) return [];

  const copiedNodes = nodeArr.map((node) => ({
    ...node,
    data: { ...node.data } as any,
  }));

  copiedNodes[0].data.scheduledAt = scheduledAt;

  if (copiedNodes.length === 1) return copiedNodes;

  for (let i = 1; i < copiedNodes.length; i++) {
    const prevNode = copiedNodes[i - 1];
    const currentNode = copiedNodes[i];

    const prevScheduledAt = new Date(prevNode.data.scheduledAt!);

    if (currentNode.type === 'delay') {
      const { value, key } = currentNode.data;

      const numericValue = parseInt(value || '0', 10);
      const newScheduledAt = addDelayToDate(
        prevScheduledAt,
        numericValue,
        key
      );

      currentNode.data.scheduledAt = newScheduledAt;
    } else {
      currentNode.data.scheduledAt = prevScheduledAt;
    }
  }

  return copiedNodes.filter(node => node.type !== "delay");
}