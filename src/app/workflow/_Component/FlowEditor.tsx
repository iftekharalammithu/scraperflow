"use client";
import { Workflow } from "@prisma/client";
import {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
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

  const { setViewport, screenToFlowPosition } = useReactFlow();

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

  const onDrop = useCallback((e: React.DragEvent) => {
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
  }, []);

  const onConnect = useCallback((connection: Connection) => {
    setEdges((eds) => addEdge({ ...connection, animated: true }, eds));
    console.log("connect", connection);
  }, []);
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
