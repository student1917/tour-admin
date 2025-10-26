"use client";
import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

interface DropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; 
  className?: string;
  
}

export default function SearchableDropdown({
  options,
  value,
  onChange,
  className = "flex-1",
  onInputChange
}: DropdownProps) {
  const [query, setQuery] = useState("");

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) =>
          option.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <div className={`${className} relative`}>
      <Combobox value={value} onChange={onChange}>
        <div className="relative">
          <Combobox.Input
            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-4 pr-5 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 sm:text-base "
            // onChange={(event) => setQuery(event.target.value)}
              onChange={(event) => {
                setQuery(event.target.value); 
                if (onInputChange) onInputChange(event); 
              }}
            displayValue={(val: string) => val}
            placeholder="Type to search..."
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-3">
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
            </Combobox.Button>
          {query !== "" && 
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-50">
              {filteredOptions.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredOptions.map((option, idx) => (
                  <Combobox.Option
                    key={idx}
                    value={option}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-blue-100 text-blue-900" : "text-gray-900"
                      }`
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {option}
                        </span>
                        {selected && (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                            <CheckIcon className="h-5 w-5" />
                          </span>
                        )}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
}
        </div>
      </Combobox>
    </div>
  );
}
