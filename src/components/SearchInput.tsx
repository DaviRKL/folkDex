// src/components/SearchInput.tsx
import { useId, useState } from "react";
import type { KeyboardEvent } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";
import { useUrlFilters } from "../hooks/useUrlFilters";

export function SearchInput() {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const { t } = useTranslation();
  const { search, searchBy, updateFilters } = useUrlFilters();
  const listboxId = useId();
  const options = [
    { value: "all", label: t("table.choose") },
    { value: "id", label: t("table.id") },
    { value: "firstName", label: t("table.firstName") },
    { value: "lastName", label: t("table.lastName") },
    { value: "title", label: t("table.title") },
    { value: "date", label: t("table.date") },
    { value: "age", label: t("table.age") },
  ];
  const selectedIndex = Math.max(
    options.findIndex((option) => option.value === searchBy),
    0,
  );

  const selectOption = (value: string) => {
    updateFilters({ searchBy: value });
    setIsSelectOpen(false);
  };

  const handleSelectKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Escape") {
      setIsSelectOpen(false);
      return;
    }

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const direction = event.key === "ArrowDown" ? 1 : -1;
      setHighlightedIndex((index) =>
        isSelectOpen
          ? Math.min(Math.max(index + direction, 0), options.length - 1)
          : selectedIndex,
      );
      setIsSelectOpen(true);
      return;
    }

    if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      setHighlightedIndex(event.key === "Home" ? 0 : options.length - 1);
      setIsSelectOpen(true);
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (isSelectOpen) {
        selectOption(options[highlightedIndex].value);
      } else {
        setHighlightedIndex(selectedIndex);
        setIsSelectOpen(true);
      }
    }
  };

  return (
    <div className="w-full max-w-5xl mb-8 flex flex-col md:flex-row gap-3">
      <div className="relative md:w-48">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={isSelectOpen}
          aria-controls={listboxId}
          aria-activedescendant={
            isSelectOpen ? `${listboxId}-option-${highlightedIndex}` : undefined
          }
          onClick={() => {
            if (isSelectOpen) {
              setIsSelectOpen(false);
            } else {
              setHighlightedIndex(selectedIndex);
              setIsSelectOpen(true);
            }
          }}
          onBlur={() => setIsSelectOpen(false)}
          onKeyDown={handleSelectKeyDown}
          className="w-full bg-surface border border-grey-500 rounded-lg pl-4 pr-10 py-3 text-left text-grey-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all cursor-pointer"
        >
          {options[selectedIndex].label}
        </button>
        <ChevronDown
          size={18}
          aria-hidden="true"
          className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-grey-300 transition-transform duration-200 ${
            isSelectOpen ? "-rotate-90" : ""
          }`}
        />
        {isSelectOpen && (
          <div
            id={listboxId}
            role="listbox"
            className="absolute z-10 mt-1 w-full overflow-hidden rounded-lg border border-grey-500 bg-surface shadow-lg"
          >
            {options.map((option, index) => (
              <div
                key={option.value}
                id={`${listboxId}-option-${index}`}
                role="option"
                aria-selected={option.value === searchBy}
                onMouseDown={(event) => event.preventDefault()}
                onMouseEnter={() => setHighlightedIndex(index)}
                onClick={() => selectOption(option.value)}
                className={`cursor-pointer px-4 py-2 text-grey-200 hover:bg-primary hover:text-white ${
                  option.value === searchBy ? "font-medium" : ""
                }`}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>

      <input
        type="text"
        value={search}
        onChange={(e) => updateFilters({ search: e.target.value })}
        placeholder={t("searchPlaceholder")}
        className="flex-1 bg-transparent border border-grey-500 rounded-lg px-4 py-3 text-grey-200 placeholder:text-grey-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
      />
    </div>
  );
}
