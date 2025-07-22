"use client";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "./ui/breadcrumb";

const BreadcrumbHeader = () => {
  const pathname = usePathname();
  const path = pathname === "/" ? [""] : pathname.split("/");
  return (
    <div className=" flex items-center float-start">
      <Breadcrumb>
        <BreadcrumbList>
          {path.map((path, i) => (
            <div key={i}>
              <BreadcrumbItem>
                <BreadcrumbLink className=" capitalize" href={`/${path}`}>
                  {path === "" ? "Home" : path}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default BreadcrumbHeader;
