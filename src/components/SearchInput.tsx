// src/components/SearchInput.tsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";
import { useUrlFilters } from "../hooks/useUrlFilters";

export function SearchInput() {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const { t } = useTranslation();
  const { search, searchBy, updateFilters } = useUrlFilters();

  return (
    <div className="w-full max-w-5xl mb-8 flex flex-col md:flex-row gap-3">
      <div className="relative md:w-48">
        <select
          value={searchBy}
          onChange={(e) => {
            updateFilters({ searchBy: e.target.value });
            setIsSelectOpen(false);
          }}
          onMouseDown={() => setIsSelectOpen((open) => !open)}
          onBlur={() => setIsSelectOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setIsSelectOpen(false);
            } else if (["Enter", " ", "ArrowDown", "ArrowUp"].includes(e.key)) {
              setIsSelectOpen(true);
            }
          }}
          className="w-full bg-surface border border-grey-500 rounded-lg pl-4 pr-10 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none cursor-pointer"
        >
          <option value="all">{t("table.choose")}</option>
          <option value="id">{t("table.id")}</option>
          <option value="firstName">{t("table.firstName")}</option>
          <option value="lastName">{t("table.lastName")}</option>
          <option value="title">{t("table.title")}</option>
          <option value="date">{t("table.date")}</option>
          <option value="age">{t("table.age")}</option>
        </select>
        <ChevronDown
          size={18}
          aria-hidden="true"
          className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-grey-300 transition-transform duration-200 ${
            isSelectOpen ? "-rotate-90" : ""
          }`}
        />
      </div>

      <input
        type="text"
        value={search}
        onChange={(e) => updateFilters({ search: e.target.value })}
        placeholder={t("searchPlaceholder")}
        className="flex-1 bg-transparent border border-grey-500 rounded-lg px-4 py-3 text-white placeholder:text-grey-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
      />
    </div>
  );
}
