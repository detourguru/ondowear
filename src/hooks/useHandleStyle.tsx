import { getLocalStorage, setLocalStorage } from "@/app/utils/storage";
import { useState } from "react";

export const useHandleStyle = () => {
  let currentStyle = getLocalStorage("style");
  currentStyle = currentStyle ? JSON.parse(currentStyle).style : "일상";
  const [select, setSelect] = useState(currentStyle);

  const handleClick = (style: string) => {
    setSelect(style);
  };

  const handleSubmit = () => {
    setLocalStorage("style", { style: select });
    alert("저장 되었습니다.");
    location.href = "/setting";
  };

  return { handleClick, handleSubmit, select };
};
