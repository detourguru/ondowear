import ArrowButton from "@/componants/common/button/ArrowButton";
import Button from "@/componants/common/button/Button";
import { PATH } from "@/constants/path";

export default function Setting() {
  return (
    <>
      <section className="grid place-items-center h-full">
        <div className="grid grid-cols-1 gap-5 w-full place-items-center">
          <ArrowButton href={PATH.STYLE}>나의 스타일</ArrowButton>
          <ArrowButton href={PATH.LOCATION}>현재 위치</ArrowButton>
        </div>

        <Button>저장하기</Button>
      </section>
    </>
  );
}
