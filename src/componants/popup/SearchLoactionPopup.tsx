"use client";

import { useState } from "react";
import { Address, useDaumPostcodePopup } from "react-daum-postcode";
import SearchBar from "@/componants/searchBar/SearchBar";
import Map from "@/componants/map/Map";

const SearchLoactionPopup = () => {
  const [address, setAddress] = useState("");
  const open = useDaumPostcodePopup();

  const handleComplete = (data: Address) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setAddress(fullAddress);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <div className="grid grid-cols-1 gap-5 w-full place-items-center">
      <SearchBar onClick={handleClick} address={address} />
      <Map address={address} />
    </div>
  );
};

export default SearchLoactionPopup;
