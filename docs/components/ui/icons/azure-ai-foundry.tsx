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
      <defs>
        <linearGradient id="azure-foundry-grad" x1="0" y1="0" x2="18" y2="18" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0078D4" />
          <stop offset="100%" stopColor="#5C2D91" />
        </linearGradient>
      </defs>
      <path
        d="M9.32 2.59L15.78 13.56H2.85L9.32 2.59z"
        fill="url(#azure-foundry-grad)"
      />
      <path
        d="M9.32 5.87L13.46 13.56H5.17L9.32 5.87z"
        fill="#50E6FF"
        opacity="0.8"
      />
      <path
        d="M7 13.56h4.64L9.32 9.71 7 13.56z"
        fill="#fff"
        opacity="0.6"
      />
    </svg>
  );
};
