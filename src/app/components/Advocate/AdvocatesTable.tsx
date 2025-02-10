import { Advocate } from "@/app/types/advocates";
import { Paper, Stack, Box, Typography } from "@mui/material";
import { useMemo } from "react";
import AdvocateRow from "./AdvocateRow";
import TableCell from "../Table/TableCell";

interface AdvocateTableProps {
  advocates: Advocate[];
}

const AdvocatesTable = ({ advocates }: AdvocateTableProps) => {
  const advocateRows = useMemo(() => {
    return advocates.map((advocate) => (
      <AdvocateRow {...advocate} key={advocate.id} />
    ));
  }, [advocates]);

  return (
    <Paper>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          fontWeight: "bold",
          backgroundColor: "grey.100",
          p: 2,
          borderBottom: 1,
          borderColor: "grey.300",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <TableCell flex={2} justifyContent="center">
          <Typography variant="body2" sx={{ textAlign: "left" }}>
            First Name
          </Typography>
        </TableCell>
        <TableCell flex={2} justifyContent="center">
          <Typography variant="body2" sx={{ textAlign: "left" }}>
            Last Name
          </Typography>
        </TableCell>
        <TableCell flex={2} justifyContent="center">
          <Typography variant="body2" sx={{ textAlign: "left" }}>
            City
          </Typography>
        </TableCell>
        <TableCell flex={1} justifyContent="center">
          <Typography variant="body2" sx={{ textAlign: "left" }}>
            Degree
          </Typography>
        </TableCell>
        <TableCell flex={3} justifyContent="center">
          <Typography variant="body2" sx={{ textAlign: "left" }}>
            Specialties
          </Typography>
        </TableCell>
        <TableCell flex={1} justifyContent="center">
          <Typography variant="body2" sx={{ textAlign: "left" }}>
            Years of Experience
          </Typography>
        </TableCell>
        <TableCell flex={1} justifyContent="center">
          <Typography variant="body2" sx={{ textAlign: "left" }}>
            Phone Number
          </Typography>
        </TableCell>
      </Stack>
      <Box>{advocateRows}</Box>
    </Paper>
  );
};

export default AdvocatesTable;
