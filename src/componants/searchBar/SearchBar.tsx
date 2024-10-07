interface SearchBarProps {
  onClick: () => void;
  address: string;
}

const SearchBar = ({ onClick, address }: SearchBarProps) => {
  return (
    <form className="flex p-3 gap-3 w-5/6 rounded-lg border" onClick={onClick}>
      <input
        readOnly
        id="search"
        name="search"
        value={address}
        className="outline-none bg-[#F1F3F5] text-regular-14 placeholder:text-[#ADB5BD] w-full cursor-pointer"
        placeholder="도로명 주소로 현재 위치를 검색해보세요"
      />
    </form>
  );
};

export default SearchBar;
