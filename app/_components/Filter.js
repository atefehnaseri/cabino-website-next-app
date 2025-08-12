"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const filterOptions = [
  {
    label: "All cabins",
    value: "all",
  },
  {
    label: "2-3 guests",
    value: "small",
  },
  {
    label: "4-7 guests",
    value: "medium",
  },
  {
    label: "8-12 guests",
    value: "large",
  },
];
export default function Filter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeFilter = searchParams.get("capacity") ?? "all";

  const createQueryString = (name, value) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);

    return params.toString();
  };

  function handleFilter(filter) {
    router.replace(
      `${pathname + "?" + createQueryString("capacity", filter)}`,
      { scroll: false }
    );
  }

  return (
    <div className="border border-primary-800 flex">
      {filterOptions.map((filter) => (
        <FilterButton
          key={filter.value}
          filter={filter.value}
          handleFilter={handleFilter}
          activeFilter={activeFilter}
        >
          {filter.label}
        </FilterButton>
      ))}
    </div>
  );
}

function FilterButton({ filter, handleFilter, activeFilter, children }) {
  return (
    <button
      type="button"
      className={`px-5 py-2 hover:bg-primary-700 ${
        filter === activeFilter ? "bg-primary-700 text-primary-50" : ""
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}
