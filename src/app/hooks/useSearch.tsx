import {
  Typography,
  TextField,
  IconButton,
  InputAdornment,
  Stack,
  Box,
} from "@mui/material";
import { useState, ChangeEvent, useMemo, useRef, useCallback } from "react";
import ClearIcon from "@mui/icons-material/Clear";

function useDebounce(callback: (value: string) => void, delay: number) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  return (value: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => callback(value), delay);
  };
}

export default function useSearch() {
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(setSearchTerm, 300);

  const handleSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);
      debouncedSearch(value);
    },
    [debouncedSearch]
  );

  const handleReset = useCallback(() => {
    setInputValue("");
    setSearchTerm("");
  }, []);

  const SearchComponent = useMemo(() => {
    return (
      <Stack>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Type to search..."
          value={inputValue}
          onChange={handleSearch}
          slotProps={{
            input: {
              endAdornment: inputValue && (
                <InputAdornment position="end">
                  <IconButton onClick={handleReset} size="small">
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          sx={{
            width: "100%",
            minWidth: 275,
            borderRadius: 1,
            backgroundColor: "#fff",
          }}
        />
        <Typography variant="body2" pl={1}>
          Searching for: {inputValue ?? ""}
        </Typography>
      </Stack>
    );
  }, [handleSearch, handleReset, inputValue]);

  return {
    searchTerm,
    SearchComponent,
  };
}
