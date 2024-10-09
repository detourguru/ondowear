"use client";

import Button from "@/componants/button/Button";
import StyleCard from "@/componants/card/StyleCard";
import StyleCardList from "@/componants/card/StyleCardList";
import Header from "@/componants/header/Header";
import { STYLES_DATA } from "@/constants/style";
import { useSelectStyle } from "@/hooks/useSelectStyle";

export default function Style() {
  const { handleSubmit, handleClick, select } = useSelectStyle();
  const styles = Object.entries(STYLES_DATA);

  return (
    <>
      <Header>나의 스타일</Header>
      <section className="grid place-items-center h-full">
        <div className="grid grid-cols-2 gap-5 place-items-center">
          {styles.map((style) => (
            <StyleCard
              key={style[0]}
              style={style[0]}
              imagePath={style[1]}
              isSelected={select === style[0]}
              onClick={() => handleClick(style[0])}
            />
          ))}
        </div>
        <Button onClick={handleSubmit}>저장하기</Button>
      </section>
    </>
  );
}
