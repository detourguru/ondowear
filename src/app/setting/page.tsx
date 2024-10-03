import ArrowButton from "@/componants/common/button/ArrowButton";
import Button from "@/componants/common/button/Button";
import Header from "@/componants/common/header/Header";
import { PATH } from "@/constants/path";

export default function Setting() {
  return (
    <>
      <Header>설정</Header>
      <section className="grid place-items-center h-full">
        <div className="grid grid-cols-1 gap-5 w-full place-items-center">
          <ArrowButton href={PATH.STYLE}>나의 스타일</ArrowButton>
          <ArrowButton href={PATH.LOCATION}>현재 위치</ArrowButton>
        </div>

        <Button href={PATH.MAIN}>돌아가기</Button>
      </section>
    </>
  );
}
