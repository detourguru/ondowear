import Link from "next/link";
import { PropsWithChildren } from "react";

interface SubmitButtonProps extends PropsWithChildren {
  href: string;
}

const SubmitButton = ({ children, href }: SubmitButtonProps) => {
  return (
    <Link
      href={href}
      className="flex items-center justify-center w-10/12 h-[60px] rounded-lg bg-blue-500 semibold-16 text-white"
    >
      {children}
    </Link>
  );
};

export default SubmitButton;
