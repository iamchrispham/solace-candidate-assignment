import { Grid2 as Grid } from "@mui/material";
import AdvocateCard from "./AdvocateCard";
import { Advocate } from "@/app/types/advocates";

interface AdvocatesGridProps {
  advocates: Advocate[];
}

export default function AdvocatesGrid({ advocates }: AdvocatesGridProps) {
  return (
    <Grid container spacing={2}>
      {advocates.map((advocate) => (
        <Grid key={advocate.id} size={{ xs: 12, md: 6, lg: 4 }}>
          <AdvocateCard advocate={advocate} />
        </Grid>
      ))}
    </Grid>
  );
}
