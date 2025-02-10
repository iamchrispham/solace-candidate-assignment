import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Button,
  SxProps,
  Theme,
} from "@mui/material";
import { Advocate } from "@/app/types/advocates";
import { colors } from "@/app/constants";
import formatPhoneNumber from "@/app/utils/formatPhoneNumber";

const { SOLACE_GREEN, BLACK, GOLD } = colors;

interface AdvocateCardProps {
  advocate: Advocate;
}

const wrapChipSx: SxProps<Theme> = {
  height: "auto",
  backgroundColor: "rgba(255, 255, 255, 0.15)",
  color: "#FFFFFF",
  "& .MuiChip-label": {
    whiteSpace: "normal",
    lineHeight: 1.3,
    padding: "6px 6px",
  },
};

export default function AdvocateCard({ advocate }: AdvocateCardProps) {
  const {
    firstName,
    lastName,
    city,
    degree,
    specialties,
    yearsOfExperience,
    phoneNumber,
  } = advocate;

  const [showAll, setShowAll] = useState(false);
  const specialtiesToShow = showAll ? specialties : specialties.slice(0, 3);

  const handleShowAll = () => setShowAll(!showAll);
  return (
    <Card
      sx={{
        height: "100%",
        background: `linear-gradient(180deg, ${SOLACE_GREEN} 85%, ${BLACK} 100%)`,
        color: "white",
        transition: "box-shadow 0.2s ease-in-out",
        "&:hover": {
          boxShadow: `0 0 12px 2px ${GOLD}`,
        },
      }}
      onClick={handleShowAll}
    >
      <CardContent>
        <Typography sx={{ wordWrap: "break-word" }} variant="subtitle1">
          {firstName} {lastName} &bull; {city} &bull; <em>{degree}</em>
        </Typography>

        <Typography sx={{ wordWrap: "break-word" }} variant="subtitle1">
          {yearsOfExperience} Years of Experience
        </Typography>

        <Typography
          component="a"
          href={`tel:${phoneNumber}`}
          variant="subtitle1"
          gutterBottom
          sx={{
            wordWrap: "break-word",
            textDecoration: "none",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          {formatPhoneNumber(phoneNumber)}
        </Typography>

        <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
          {specialtiesToShow.map((specialty, idx) => (
            <Chip key={idx} label={specialty} sx={wrapChipSx} />
          ))}
        </Box>

        {specialties.length > 3 && (
          <Box sx={{ mt: 1 }}>
            <Button
              variant="text"
              size="small"
              onClick={handleShowAll}
              sx={{ color: "#FFF" }}
            >
              {showAll ? "Show less" : "Show more"}
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
