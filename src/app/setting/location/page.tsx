"use client";

import Button from "@/componants/button/Button";
import Header from "@/componants/header/Header";
import Map from "@/componants/map/Map";
import SearchBar from "@/componants/searchBar/SearchBar";
import { useGetAddress } from "@/hooks/useGetAddress";

export default function Location() {
  const { handleClick, address } = useGetAddress();

  return (
    <>
      <Header>현재 위치</Header>
      <section className="grid place-items-center gap-10">
        <div className="grid grid-cols-1 gap-12 w-full place-items-center my-10">
          <SearchBar onClick={handleClick} address={address} />
          <Map address={address} />
        </div>
        <Button>저장하기</Button>
      </section>
    </>
  );
}
