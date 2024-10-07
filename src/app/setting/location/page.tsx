import Button from "@/componants/button/Button";
import Header from "@/componants/header/Header";
import SearchLoactionPopup from "@/componants/popup/SearchLoactionPopup";

export default function Location() {
  return (
    <>
      <Header>현재 위치</Header>
      <section className="grid place-items-center h-full">
        <SearchLoactionPopup />
        <Button>저장하기</Button>
      </section>
    </>
  );
}
