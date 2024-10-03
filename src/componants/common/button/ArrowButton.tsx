"use client";

import Button, { type ButtonProps } from "@/componants/common/button/Button";

const ArrowButton = ({ children, href }: ButtonProps) => {
  return (
    <Button variant="secondary" href={href}>
      <div className="grid">
        {children}
        <Button.RightArrow />
      </div>
    </Button>
  );
};

export default ArrowButton;
