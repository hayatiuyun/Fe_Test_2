import React from "react";
import MuiPagination from "@mui/material/Pagination";

interface PaginationProps {
  page: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    page: number
  ) => void;
  className?: string;
  total?: number;
}

const Pagination = ({
  page,
  onPageChange,
  className,
  total,
}: PaginationProps) => {

  return (
    <MuiPagination
      color="primary"
      className={className}
      count={total}
      page={page}
      variant="outlined"
      shape="rounded"
      onChange={(event, newPage) => {
        onPageChange(event as any, newPage);
      }}
    />
  );
};

export default Pagination;
