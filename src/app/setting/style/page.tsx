import Button from "@/componants/button/Button";
import StyleCardList from "@/componants/card/StyleCardList";
import Header from "@/componants/header/Header";

export default function Style() {
  return (
    <>
      <Header>나의 스타일</Header>
      <section className="grid place-items-center h-full">
        <StyleCardList />
        <Button current="style">저장하기</Button>
      </section>
    </>
  );
}
