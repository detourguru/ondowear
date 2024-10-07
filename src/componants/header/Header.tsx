"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Header = ({ children }: React.PropsWithChildren) => {
  const { back } = useRouter();

  return (
    <div className="flex relative">
      <div className="m-3 grid grid-cols-1 gap-5 w-full place-items-center">
        <button className="absolute justify-self-start" onClick={() => back()}>
          <Image
            src="/svg/ic-left-arrow.svg"
            alt="left arrow"
            width={24}
            height={24}
          />
        </button>
        <span className="relative">{children}</span>
      </div>
    </div>
  );
};

export default Header;
