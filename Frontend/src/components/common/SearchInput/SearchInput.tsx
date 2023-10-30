import { ChangeEvent, useCallback, useEffect, useState } from "react";
import "./SearchInput.css";
import useDebounce from "../../../hooks/useDebounce/useDebounce.hook";

interface SearchUsersInputProps {
  onSearchChange: (value: string) => void;
}

function SearchInput({ onSearchChange }: SearchUsersInputProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const { debouncedValue, setValue: setDebouncedValue } = useDebounce("");

  const handleSearchQuery = useCallback(
    (value: string) => {
      setSearchQuery(value);
      setDebouncedValue(value);
    },
    [setDebouncedValue]
  );

  useEffect(() => {
    onSearchChange(debouncedValue);
  }, [debouncedValue, onSearchChange]);

  return (
    <input
      className="search-input"
      type="text"
      placeholder="Search input"
      value={searchQuery}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        handleSearchQuery(e.target.value)
      }
    />
  );
}

export default SearchInput;
