import { INITIAL_COORDINATE_DATA } from "@/constants/location";
import { useEffect, useState } from "react";
import { Map as KakaoMap, Loader, MapMarker } from "react-kakao-maps-sdk";

interface MapProps {
  address: string;
  coordinate: { lat: number; lng: number };
  handleCoordinate: () => void;
}

const Map = ({ address, handleCoordinate, coordinate }: MapProps) => {
  useEffect(() => {
    handleCoordinate();
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
