"use client";

import Button from "@/componants/button/Button";
import MainWithOutSetting from "@/componants/main/MainWithOutSetting";
import MainWithSetting from "@/componants/main/MainWithSetting";
import { PATH } from "@/constants/path";
import { useHandleAddress } from "@/hooks/useHandleAddress";

export default function Main() {
  const { isSetted } = useHandleAddress();
  return (
    <section className="grid place-items-center h-full">
      {isSetted ? <MainWithSetting /> : <MainWithOutSetting />}
      <Button variant="default" href={PATH.SETTING}>
        설정 변경하기
      </Button>
    </section>
  );
}
