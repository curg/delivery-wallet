import { IconProps } from "@/types";
import React from "react";

export const Ethereum = ({ className, ...rest }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={36}
    height={36}
    fill="none"
    className={`${className}`}
    {...rest}
  >
    <path
      fill="#E9E9E9"
      d="M18 36c9.941 0 18-8.059 18-18S27.941 0 18 0 0 8.059 0 18s8.059 18 18 18Z"
    />
    <path
      fill="#343434"
      d="m18.151 22.268.168.168 7.676-4.538L18.32 5.161l-.168.57v16.537Z"
    />
    <path fill="#8C8C8C" d="M18.32 22.436V5.16l-7.677 12.737 7.676 4.538Z" />
    <path
      fill="#3C3C3B"
      d="m18.225 29.895.094.276L26 19.354l-7.68 4.535-.095.115v5.891Z"
    />
    <path fill="#8C8C8C" d="m10.643 19.354 7.676 10.817v-6.282l-7.676-4.535Z" />
    <path fill="#141414" d="M18.32 14.41v8.026l7.675-4.538-7.676-3.489Z" />
    <path fill="#393939" d="m18.319 14.41-7.676 3.488 7.676 4.538v-8.027Z" />
  </svg>
);
