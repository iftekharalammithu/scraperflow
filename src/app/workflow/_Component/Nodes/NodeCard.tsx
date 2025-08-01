import { cn } from "@/lib/utils";
import { useReactFlow } from "@xyflow/react";
import React, { ReactNode } from "react";

const NodeCard = ({
  children,
  nodeId,
  isSelectd,
}: {
  nodeId: string;
  children: ReactNode;
  isSelectd: boolean;
}) => {
  const { getNode, setCenter } = useReactFlow();
  return (
    <div
      onDoubleClick={() => {
        const node = getNode(nodeId);
        if (!node) {
          return;
        }
        const { position, measured } = node;
        if (!position || !measured) {
          return;
        }

        const { width, height } = measured;
        const x = position.x + width! / 2;
        const y = position.y + height! / 2;
        if (x === undefined || y === undefined) {
          return;
        }
        // console.log(position);
        setCenter(x, y, {
          zoom: 1,
          duration: 500,
        });
      }}
      className={cn(
        " rounded-md  cursor-pointer bg-background border-separate w-[420px] border-2 text-xs gap-1 flex flex-col",
        isSelectd && "border-primary"
      )}
    >
      {children}
    </div>
  );
};

export default NodeCard;
