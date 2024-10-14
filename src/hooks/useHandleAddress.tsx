import LocalStorage from "@/app/utils/storage";
import {
  INITIAL_COORDINATE_DATA,
  INITIAL_LOCATION,
} from "@/constants/location";
import { useEffect, useState } from "react";
import { Address, useDaumPostcodePopup } from "react-daum-postcode";
import { Loader } from "react-kakao-maps-sdk";

export const useHandleAddress = () => {
  const [address, setAddress] = useState("");
  const [isSetted, setIsSetted] = useState(false);
  const [coordinate, setCoordinate] = useState(INITIAL_COORDINATE_DATA);

  useEffect(() => {
    if (
      LocalStorage.getLocalStorage("location") &&
      LocalStorage.getLocalStorage("style")
    ) {
      setIsSetted(true);
    }

    const currentLocation =
      LocalStorage.getLocalStorage("location") ??
      `{"location": "${INITIAL_LOCATION}"}`;
    setAddress(JSON.parse(currentLocation).location);
  }, [isSetted]);

  const open = useDaumPostcodePopup();

  const handleSubmit = () => {
    LocalStorage.setLocalStorage("location", {
      location: address,
      lat: coordinate.lat,
      lng: coordinate.lng,
    });
    alert("저장 되었습니다.");
    location.href = "/setting";
  };

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

  const handleCoordinate = () => {
    new Loader({
      appkey: `${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}`,
      libraries: ["services"],
    })
      .load()
      .then((kakao) => {
        if (address.length > 0) {
          const geocoder = new kakao.maps.services.Geocoder();
          geocoder.addressSearch(address, function (result, status) {
            if (status === kakao.maps.services.Status.OK) {
              setCoordinate({
                lat: parseFloat(result[0].y),
                lng: parseFloat(result[0].x),
              });
            } else {
              alert(
                "해당하는 주소를 지도에서 찾지 못했습니다.\n잠시후 다시 시도해주세요"
              );
            }
          });
        }
      });
  };

  return {
    isSetted,
    handleClick,
    address,
    handleSubmit,
    handleCoordinate,
    coordinate,
  };
};
