import Button from "@/componants/common/button/Button";
import Header from "@/componants/common/header/Header";

export default function Location() {
  return (
    <>
      <Header>현재 위치</Header>
      <section className="grid place-items-center h-full">
        <div className="grid grid-cols-1 gap-5 w-full place-items-center"></div>
        <Button>저장하기</Button>
      </section>
    </>
  );
}
