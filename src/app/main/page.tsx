import Button from "@/componants/button/Button";
import MainWithSetting from "@/componants/main/MainWithSetting";
import { PATH } from "@/constants/path";

export default function Main() {
  return (
    <section className="grid place-items-center h-full">
      <MainWithSetting />
      <Button variant="default" href={PATH.SETTING}>
        설정 변경하기
      </Button>
    </section>
  );
}
