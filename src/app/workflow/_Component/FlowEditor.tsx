"use client";
import { Workflow } from "@prisma/client";
import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import React, { useEffect } from "react";
import "@xyflow/react/dist/style.css";
import NodesComponent from "./Nodes/NodesComponent";

const nodeTypes = {
  FlowScrapeNode: NodesComponent,
};

const SnapGrid: [number, number] = [50, 50];

const FlowEditor = ({ workflow }: { workflow: Workflow }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const { setViewport } = useReactFlow();

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
  }, [workflow.definition, setEdges, setNodes, workflow]);
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
