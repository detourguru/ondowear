import LocalStorage from "@/app/utils/storage";
import { useEffect, useState } from "react";

export const useHandleStyle = () => {
  const [select, setSelect] = useState("");

  useEffect(() => {
    const currentStyle =
      LocalStorage.getLocalStorage("style") ?? `{"style": "일상"}`;
    setSelect(JSON.parse(currentStyle).style);
  }, []);

  const handleClick = (style: string) => {
    setSelect(style);
  };

  const handleSubmit = () => {
    LocalStorage.setLocalStorage("style", { style: select });
    alert("저장 되었습니다.");
    location.href = "/setting";
  };

  return { handleClick, handleSubmit, select };
};
