import { INITIAL_COORDINATE_DATA } from "@/constants/location";
import { useEffect, useState } from "react";
import { Map as KakaoMap, Loader, MapMarker } from "react-kakao-maps-sdk";

interface MapProps {
  address: string;
}

const Map = ({ address }: MapProps) => {
  const [coordinate, setCoordinate] = useState(INITIAL_COORDINATE_DATA);

  useEffect(() => {
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
  }, [address]);

  return (
    <div className="w-full">
      <KakaoMap
        center={{
          lat: coordinate.lat,
          lng: coordinate.lng,
        }}
        style={{
          width: "100%",
          height: "300px",
        }}
        level={3}
      >
        <MapMarker
          position={{
            lat: coordinate.lat,
            lng: coordinate.lng,
          }}
        />
      </KakaoMap>
    </div>
  );
};

export default Map;
