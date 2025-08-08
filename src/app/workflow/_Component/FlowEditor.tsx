"use client";
import { Workflow } from "@prisma/client";
import {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  getOutgoers,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import React, { useCallback, useEffect } from "react";
import "@xyflow/react/dist/style.css";
import NodesComponent from "./Nodes/NodesComponent";
import { CreateFlowNode } from "@/lib/workflow/CreateFlowNode";
import { TaskType } from "@/Types/TaskType";
import { AppNodeProps } from "@/Types/AppNode";
import DeleteEdges from "./edges/DeleteEdges";
import { TaskRegistry } from "@/lib/workflow/task/registry";

const nodeTypes = {
  FlowScrapeNode: NodesComponent,
};

const edgeTypes = {
  default: DeleteEdges,
};

const SnapGrid: [number, number] = [50, 50];

const FlowEditor = ({ workflow }: { workflow: Workflow }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<AppNodeProps>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const { setViewport, screenToFlowPosition, updateNodeData } = useReactFlow();

  useEffect(() => {
    try {
      const flow = JSON.parse(workflow.definition);

      if (!flow) {
        return;
      }

      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);

      if (!flow.viewport) {
        return;
      }

      const { x = 0, y = 0, zoom = 1 } = flow.viewport;
      setViewport({ x, y, zoom });
    } catch (error) {
      throw new Error("Something Wrong!");
    }
  }, [workflow.definition, setEdges, setNodes, workflow, setViewport]);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();

      const tasktype = e.dataTransfer.getData("application/reactflow");

      if (typeof tasktype === undefined || !tasktype) {
        return;
      }

      const position = screenToFlowPosition({
        x: e.clientX,
        y: e.clientY,
      });

      const newNode = CreateFlowNode(tasktype as TaskType, position);
      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, setNodes]
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge({ ...connection, animated: true }, eds));

      if (!connection.targetHandle) {
        return;
      }
      const node = nodes.find((nd) => nd.id === connection.target);
      if (!node) {
        return;
      }
      const nodeinputs = node.data.inputs;
      // Best Approch
      // delete nodeinputs[connection.targetHandle];
      // updateNodeData(node.id, {
      //   inputs: {
      //     nodeinputs,
      //   },
      // });

      updateNodeData(node.id, {
        inputs: {
          ...nodeinputs,
          [connection.targetHandle]: "",
        },
      });
    },
    [setEdges, updateNodeData, nodes]
  );

  const isValidConnention = useCallback(
    (connection: Edge | Connection) => {
      if (connection.source === connection.target) {
        return false;
      }

      const source = nodes.find((node) => node.id === connection.source);
      const target = nodes.find((node) => node.id === connection.target);

      if (!source || !target) {
        console.log("invalid connection");
        return false;
      }

      const sourceTask = TaskRegistry[source.data.type];
      const targetTask = TaskRegistry[target.data.type];

      const output = sourceTask.outputs.find(
        (o) => o.name === connection.source
      );
      const input = targetTask.inputs.find(
        (o) => o.name === connection.targetHandle
      );
      if (input?.type !== output?.type) {
        console.log("invalid connection");
        return false;
      }
      const hasCycle = (node: AppNodeProps, visited = new Set()) => {
        if (visited.has(node.id)) {
          return false;
        }
        visited.add(node.id);

        for (const outgoer of getOutgoers(node, nodes, edges)) {
          if (outgoer.id === connection.source) {
            return true;
          }
          if (hasCycle(outgoer, visited)) {
            return true;
          }
        }
      };
      const detectedCycle = hasCycle(target);
      return !detectedCycle;
    },
    [nodes, edges]
  );
  return (
    <div className=" h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
        nodeTypes={nodeTypes}
        snapGrid={SnapGrid}
        fitViewOptions={{ padding: 3 }}
        fitView
        onDragOver={onDragOver}
        onDrop={onDrop}
        onConnect={onConnect}
        edgeTypes={edgeTypes}
        isValidConnection={isValidConnention}
      >
        <Controls
          fitViewOptions={{ padding: 3 }}
          className=" text-black hover:bg-gray-400 "
          position="top-left"
        ></Controls>
        <Background
          style={{ backgroundColor: "#ede5ca" }}
          size={1}
          variant={BackgroundVariant.Dots}
          gap={12}
        ></Background>
      </ReactFlow>
    </div>
  );
};

export default FlowEditor;
