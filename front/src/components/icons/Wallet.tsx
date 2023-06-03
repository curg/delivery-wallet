import { IconProps } from "@/types";

export const Wallet = ({ className, ...rest }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={29}
    fill="none"
    {...rest}
  >
    <path
      stroke="#fff"
      strokeWidth={1.5}
      d="M5.592 9.336v11.759a2 2 0 0 0 2 2h16.842a2 2 0 0 0 2-2v-9.759a2 2 0 0 0-2-2h-3.75m-15.092 0v-1.93a2 2 0 0 1 2-2h11.093a2 2 0 0 1 2 2v1.93m-15.093 0h15.093"
    />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M19.247 16.216h2.875"
    />
  </svg>
);
