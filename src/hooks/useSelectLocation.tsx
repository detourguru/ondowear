import { getLocalStorage, setLocalStorage } from "@/app/utils/storage";
import { useState } from "react";

export const useSelectLocation = () => {
  let currentLocation = getLocalStorage("location");
  const [select, setSelect] = useState(currentLocation);

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
