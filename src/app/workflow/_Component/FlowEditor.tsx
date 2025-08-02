"use client";
import { Workflow } from "@prisma/client";
import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import React from "react";
import "@xyflow/react/dist/style.css";
import { CreateFlowNode } from "@/lib/workflow/CreateFlowNode";
import { TaskType } from "@/Types/TaskType";
import NodesComponent from "./Nodes/NodesComponent";

const nodeTypes = {
  FlowScrapeNode: NodesComponent,
};

const SnapGrid: [number, number] = [50, 50];

const FlowEditor = ({ workflow }: { workflow: Workflow }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([
    CreateFlowNode(TaskType.LAUNCH_BROWSER),
  ]);

  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

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
