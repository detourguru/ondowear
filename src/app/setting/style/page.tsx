"use client";

import Button from "@/componants/button/Button";
import StyleCard from "@/componants/card/StyleCard";
import Header from "@/componants/header/Header";
import { STYLES_DATA } from "@/constants/style";

export default function Style() {
  const styles = Object.entries(STYLES_DATA);

  return (
    <>
      <Header>나의 스타일</Header>
      <section className="grid place-items-center h-full">
        <div className="grid grid-cols-2 gap-5 place-items-center">
          {styles.map((style) => (
            <StyleCard key={style[0]} style={style[0]} imagePath={style[1]} />
          ))}
        </div>
        <Button>저장하기</Button>
      </section>
    </>
  );
}
