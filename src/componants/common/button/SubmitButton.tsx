import Link, { LinkProps } from "next/link";

interface SubmitButtonProps extends LinkProps {
  text: string;
}

const SubmitButton = ({ href, text }: SubmitButtonProps) => {
  return (
    <Link
      href={href}
      className="flex items-center justify-center w-10/12 h-[60px] rounded-lg bg-blue-500 semibold-16 text-white"
    >
      {text}
    </Link>
  );
};

export default SubmitButton;
