import { IconProps } from "@/types";
import * as React from "react";

export const USDT = ({ className, ...rest }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={36}
    height={32}
    fill="none"
    className={`${className}`}
    {...rest}
  >
    <g fillRule="evenodd" clipPath="url(#a)" clipRule="evenodd">
      <path
        fill="#50AF95"
        d="M6.592.154.028 13.942a.267.267 0 0 0 .057.311l17.728 16.988a.27.27 0 0 0 .374 0l17.728-16.986a.268.268 0 0 0 .057-.312L29.408.155A.265.265 0 0 0 29.167 0H6.836a.265.265 0 0 0-.244.154Z"
      />
      <path
        fill="#fff"
        d="M20.278 15.357c-.128.01-.785.05-2.252.05a49.19 49.19 0 0 1-2.286-.05c-4.508-.198-7.874-.983-7.874-1.922 0-.94 3.366-1.724 7.874-1.925v3.066c.295.021 1.14.07 2.306.07 1.4 0 2.101-.057 2.227-.07v-3.064c4.5.2 7.857.985 7.857 1.923 0 .937-3.357 1.722-7.857 1.921l.005.002Zm0-4.162V8.45h6.278V4.267H9.462V8.45h6.277v2.743c-5.102.234-8.94 1.245-8.94 2.456 0 1.211 3.838 2.22 8.94 2.456V24.9h4.538v-8.796c5.09-.234 8.921-1.244 8.921-2.454 0-1.21-3.827-2.22-8.921-2.455Z"
      />
    </g>
  </svg>
);
