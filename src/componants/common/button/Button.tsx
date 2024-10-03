"use client";

import React from "react";

import { cva, type VariantProps } from "class-variance-authority";
import Image from "next/image";

const buttonVariants = cva("w-10/12 h-[60px] rounded-lg shadow-xl", {
  variants: {
    variant: {
      default: "bg-blue-500 semibold-16 text-white",
      secondary: "bg-gray-200 text-regular-12 text-blue-50 text-opacity-40",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const handleButtonClick = (href: string | undefined) => {
  if (href !== undefined) {
    return (location.href = href);
  }
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
  rightArrow?: boolean;
}

const ButtonRightArrow = () => {
  return (
    <Image
      className="absolute justify-self-end -mt-1 mr-5"
      priority
      src="/svg/ic-right-arrow.svg"
      alt="right-arrow"
      width={24}
      height={24}
    />
  );
};

const Button = ({ children, href, variant }: ButtonProps) => {
  return (
    <button
      className={`${buttonVariants({
        variant,
      })}`}
      onClick={() => handleButtonClick(href)}
    >
      {children}
    </button>
  );
};

Button.RightArrow = ButtonRightArrow;

export default Button;
