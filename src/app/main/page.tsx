import SubmitButton from "@/componants/common/button/SubmitButton";

import Image from "next/image";

export default function Main() {
  return (
    <section className="grid place-items-center h-full">
      <div className="grid grid-cols-1 gap-2">
        <span className="text-bold-34">
          오늘의 날씨에 맞춰
          <br />
          ondowear
        </span>
        <span className="text-regular-12 text-gray-50 text-opacity-40">
          언제 어디든 당신이 있는 곳에 맞는 옷차림으로 외출하세요!
        </span>
      </div>
      <div className="grid grid-cols-3 gap-7">
        <Image
          className="bg-black"
          src="svg/ic-freezing.svg"
          alt="freezing"
          width={80}
          height={80}
        />
        <Image
          className="bg-black"
          src="svg/ic-smile-face.svg"
          alt="smile-face"
          width={80}
          height={80}
        />
        <Image
          className="bg-black"
          src="svg/ic-melting.svg"
          alt="melting"
          width={80}
          height={80}
        />
      </div>
      <SubmitButton href="setting">설정 변경하기</SubmitButton>
    </section>
  );
}
