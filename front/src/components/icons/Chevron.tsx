import { IconProps } from "@/types";

const Chevron = ({ className, ...rest }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...rest}
  >
    <path fill="#fff" d="M.167 0h17.667v18H.167z" />
    <path
      fill="#AAA"
      d="M9 10.94 3.847 5.69l-1.04 1.06L9 13.06l6.194-6.31-1.041-1.06L9 10.94Z"
    />
  </svg>
);
export default Chevron;
