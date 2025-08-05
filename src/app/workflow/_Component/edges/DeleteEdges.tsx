"use client";
import { Button } from "@/components/ui/button";
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getSmoothStepPath,
  useReactFlow,
} from "@xyflow/react";
import React from "react";

const DeleteEdges = (props: EdgeProps) => {
  const [edgePath, labelx, labely] = getSmoothStepPath(props);
  const { setEdges } = useReactFlow();
  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={props.markerEnd}
        style={props.style}
      ></BaseEdge>
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50% , -50%) translate(${labelx}px , ${labely}px)`,
            pointerEvents: "all",
          }}
        >
          <Button
            className=" w-5 h-5 border cursor-pointer rounded-full text-xs leading-none hover:shadow-lg "
            variant={"outline"}
            size={"icon"}
            onClick={() =>
              setEdges((edges) => edges.filter((edg) => edg.id !== props.id))
            }
          >
            X
          </Button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default DeleteEdges;
