import React, { useCallback, useEffect, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import debounce from "lodash.debounce";

function SearchBox({ setSearch, search }) {
  const inputRef = useRef(null); 
  const debouncedSetSearch = useCallback(
    debounce((value) => {
      setSearch(value);
    }, 300),
    []
  );

  useEffect(() => {
    return () => {
      debouncedSetSearch.cancel();
    };
  }, [debouncedSetSearch]);

  const handleInputChange = (e) => {
    debouncedSetSearch(e.target.value);
  };

  useEffect(() => {
    inputRef.current.focus();
  }, [search]);

  return (
    <div className="flex bg-[#ffffff] w-[1140px] items-center border border-[#E4E4E4] rounded-xl p-2 justify-between">
      <div className="flex bg-[#ffffff] items-center mr-2 gap-2">
        <CiSearch />
        <input
          ref={inputRef} 
          className="outline-none"
          value={search}
          placeholder="جستجو کالا"
          onChange={handleInputChange}
        />
      </div>
      <div className="flex gap-2 items-center">
        <div className="bg-[#E4E4E4] h-[64px] w-[2px] rounded-xl"></div>
        <img
          className="w-[46px] h-[46px] border border-[#E4E4E480] rounded-[42px]"
          src="images/adminpng.jpg"
          alt="admin-picture"
        />
        <div>
          <p className="text-[16px] text-shadow font-normal text-[#282828]">
            میلاد عظمی
          </p>
          <p className="text-[16px] text-shadow font-normal text-[#282828]">
            مدیر
          </p>
        </div>
      </div>
    </div>
  );
}

export default SearchBox;
