"use client";

import { useState, useCallback } from "react";
import {
  Box,
  Container,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import TableRowsIcon from "@mui/icons-material/TableRows";
import AdvocatesGrid from "./components/Advocate/AdvocatesGrid";
import AdvocatesTable from "./components/Advocate/AdvocatesTable";
import { useGetAdvocates } from "./hooks/useGetAdvocates";
import useSearch from "./hooks/useSearch";
import { colors } from "@/app/constants";

const { SOLACE_GREEN, BLACK } = colors;

export default function Home() {
  const { searchTerm, SearchComponent } = useSearch();
  const { advocates } = useGetAdvocates(searchTerm);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  const toggleView = useCallback(() => {
    setViewMode((prev) => (prev === "grid" ? "table" : "grid"));
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(180deg, ${SOLACE_GREEN} 85%, ${BLACK} 100%)`,
        color: "white",
      }}
    >
      <Container className="mt-6" sx={{ paddingBottom: 10 }}>
        <Stack py={2}>
          <Typography variant="h4" className="mb-6">
            Solace Advocates
          </Typography>
        </Stack>

        <Stack
          spacing={2}
          py={2}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {SearchComponent}

          {/* Icon toggle for Grid vs Table */}
          <IconButton
            onClick={toggleView}
            color="primary"
            sx={{ maxWidth: 48, color: "#FFF" }}
          >
            {viewMode === "grid" ? <TableRowsIcon /> : <ViewModuleIcon />}
          </IconButton>
        </Stack>

        <Stack>
          {viewMode === "grid" ? (
            <AdvocatesGrid advocates={advocates} />
          ) : (
            <AdvocatesTable advocates={advocates} />
          )}
        </Stack>
      </Container>
    </Box>
  );
}
