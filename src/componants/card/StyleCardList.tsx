"use client";

import { STYLES_DATA } from "@/constants/style";
import { createContext, useState } from "react";
import StyleCard from "@/componants/card/StyleCard";
import { StyleContextType } from "@/app/type/context";
import { getLocalStorage } from "@/app/utils/storage";

export const StyleContext = createContext<StyleContextType>({ style: "일상" });

const StyleCardList = () => {
  const styles = Object.entries(STYLES_DATA);

  const currentStyle = getLocalStorage("style");

  const style = currentStyle ? JSON.parse(currentStyle).style : "일상";

  const [select, setSelect] = useState(style);
  const handleClick = (key: string) => {
    setSelect(key);
  };

  return (
    <StyleContext.Provider value={{ style: select }}>
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
    </StyleContext.Provider>
  );
};

export default StyleCardList;
