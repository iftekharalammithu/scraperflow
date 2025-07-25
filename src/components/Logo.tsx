import { cn } from "@/lib/utils";
import { SquareDashedMousePointer } from "lucide-react";
import Link from "next/link";
import React from "react";

const Logo = ({
  fontSize = "2xl",
  iconSize = 20,
}: {
  fontSize?: string;
  iconSize?: number;
}) => {
  return (
    <div>
      <Link
        href={"/"}
        className={cn(
          "font-extrabold text-2xl flex items-center gap-2",
          fontSize
        )}
      >
        <div className=" rounded-xl  bg-gradient-to-r from-emerald-500 to-emerald-600 p-2">
          <SquareDashedMousePointer
            size={iconSize}
            className=" stroke-white"
          ></SquareDashedMousePointer>
        </div>
        <div>
          <span className=" bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text  text-transparent">
            Flow
          </span>
          <span className=" text-stone-700 dark:text-stone-300">Scrape</span>
        </div>
      </Link>
    </div>
  );
};

export default Logo;
