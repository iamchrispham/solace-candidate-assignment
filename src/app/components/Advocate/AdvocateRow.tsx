import { Box, Stack, Typography } from "@mui/material";
import { Advocate } from "@/app/types/advocates";
import TableCell from "../Table/TableCell";
import formatPhoneNumber from "@/app/utils/formatPhoneNumber";

interface AdvocateRowProps extends Advocate {}

const AdvocateRow = ({
  id,
  firstName,
  lastName,
  city,
  degree,
  specialties,
  yearsOfExperience,
  phoneNumber,
}: AdvocateRowProps) => {
  return (
    <Stack
      key={id}
      direction="row"
      spacing={2}
      sx={{ p: 2, borderBottom: 1, borderColor: "grey.300" }}
    >
      <TableCell flex={2}>
        <Typography variant="body2">{firstName}</Typography>
      </TableCell>
      <TableCell flex={2}>
        <Typography variant="body2">{lastName}</Typography>
      </TableCell>
      <TableCell flex={2}>
        <Typography variant="body2">{city}</Typography>
      </TableCell>
      <TableCell flex={1}>
        <Typography variant="body2">{degree}</Typography>
      </TableCell>
      <TableCell
        flex={3}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 0.5,
        }}
      >
        {specialties.map((s, i) => (
          <Box
            key={`${s}${i}`}
            sx={{
              px: 1,
              py: 0.5,
              backgroundColor: "grey.200",
              borderRadius: 1,
            }}
          >
            <Typography variant="body2">{s}</Typography>
          </Box>
        ))}
      </TableCell>
      <TableCell flex={0.8}>
        <Typography variant="body2">{yearsOfExperience}</Typography>
      </TableCell>
      <TableCell flex={1.2}>
        <Typography
          component="a"
          href={`tel:${phoneNumber}`}
          variant="body2"
          sx={{
            textDecoration: "none",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          {formatPhoneNumber(phoneNumber)}
        </Typography>
      </TableCell>
    </Stack>
  );
};

export default AdvocateRow;
