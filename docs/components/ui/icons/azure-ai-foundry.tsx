import React from "react";
import { cn } from "@/lib/utils";

interface AzureAIFoundryIconProps {
  className?: string;
  width?: number;
  height?: number;
}

const DEFAULT_CLASSNAME = "text-icon";

export const AzureAIFoundryIcon = ({
  className,
  width = 20,
  height = 20,
}: AzureAIFoundryIconProps) => {
  return (
    <svg
      viewBox="0 0 18 18"
      fill="none"
      className={cn(DEFAULT_CLASSNAME, className)}
      style={{ width: `${width}px`, height: `${height}px` }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer ring: outer triangle minus middle triangle */}
      <path
        d="M9.32 2.59L15.78 13.56H2.85Z M9.32 5.87L13.46 13.56H5.17Z"
        fill="currentColor"
        fillRule="evenodd"
      />
      {/* Middle ring: middle triangle minus inner triangle */}
      <path
        d="M9.32 5.87L13.46 13.56H5.17Z M7 13.56h4.64L9.32 9.71Z"
        fill="currentColor"
        fillRule="evenodd"
        opacity="0.6"
      />
      {/* Inner triangle */}
      <path
        d="M7 13.56h4.64L9.32 9.71Z"
        fill="currentColor"
        opacity="0.3"
      />
    </svg>
  );
};
