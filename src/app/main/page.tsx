import Button from "@/componants/common/button/Button";
import { PATH } from "@/constants/path";

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
        <span className="text-regular-12 text-blue-50 text-opacity-40">
          언제 어디든 당신이 있는 곳에 맞는 옷차림으로 외출하세요!
        </span>
      </div>
      <div className="grid grid-cols-3 gap-7">
        <Image
          src="/svg/ic-freezing.svg"
          alt="freezing"
          width={80}
          height={80}
        />
        <Image
          src="/svg/ic-smile-face.svg"
          alt="smile-face"
          width={80}
          height={80}
        />
        <Image src="/svg/ic-melting.svg" alt="melting" width={80} height={80} />
      </div>
      <Button variant="default" href={PATH.SETTING}>
        설정 변경하기
      </Button>
    </section>
  );
}
