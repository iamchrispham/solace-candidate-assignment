import { Box, BoxProps } from "@mui/material";
import { styled } from "@mui/material/styles";

interface TableCellProps extends BoxProps {
  flex: number;
}

const TableCell = styled(Box, {
  shouldForwardProp: (prop) => prop !== "flex" && prop !== "justifyContent",
})<TableCellProps>(({ flex }) => ({
  flex,
  display: "flex",
  alignItems: "center",
}));

export default TableCell;
