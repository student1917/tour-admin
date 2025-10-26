"use client";

import React from "react";
import { FiSearch, FiSliders } from "react-icons/fi";
import { HiPaperAirplane } from "react-icons/hi";
import Button from "./Button";

const SearchBox = () => {
  return (
    <div className="relative py-20 px-4 flex justify-center bg-transparent">
      <div className="bg-[var(--background)] rounded-2xl shadow-md flex items-center w-full max-w-7xl px-4 py-3 gap-3">
        <div className="relative flex-1">
          <span className="absolute -top-3 left-3 bg-[var(--background)] px-1 text-[var(--primary)] text-sm font-medium">
            Tìm kiếm
          </span>

          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--foreground)] w-5 h-5" />

          <FiSliders className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--foreground)] w-5 h-5" />

          <input
            type="text"
            placeholder="Tìm kiếm địa điểm, quán ăn, khu vui chơi xung quanh bạn…"
            className="w-full border border-[var(--primary)] rounded-md pl-10 pr-10 py-3 text-sm text-[var(--foreground)] placeholder-gray-400 focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition"
          />
        </div>

        <Button
          variant="primary"
          className="flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-md"
        >
          <HiPaperAirplane className="w-5 h-5 rotate-45" />
          TÌM KIẾM
        </Button>
      </div>
    </div>
  );
};

export default SearchBox;
