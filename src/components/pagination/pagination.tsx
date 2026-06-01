"use client";

import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import usePagination from "@mui/material/usePagination";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useTheme } from "next-themes";

export interface CustomPaginationProps {
  page: number;
  count: number;
  onChange: (page: number) => void;
  siblingCount?: number;
  customActiveClass?: string;
  customClassName?: string;
  customItemClassName?: string;
  arrowIconClassName?: string;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  page,
  count,
  onChange,
  siblingCount = 1,
  customActiveClass,
  customClassName,
  customItemClassName,
  arrowIconClassName,
}) => {
  const { items } = usePagination({
    page,
    count,
    siblingCount,
    onChange: (_event, value) => onChange(value),
  });

  const { theme } = useTheme();

  const isDark = theme === "dark";

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={1}
      className={customClassName}
    >
      {items.map((item, index) => {
        if (item.type === "previous") {
          return (
            <IconButton
              key={index}
              disabled={item.disabled}
              onClick={item.onClick}
              aria-label="Previous page"
              sx={{
                color: isDark ? "#ffffff" : "inherit",

                "&.Mui-disabled": {
                  color: isDark
                    ? "rgba(255,255,255,0.3)"
                    : undefined,
                },

                "&:hover": {
                  backgroundColor: isDark
                    ? "rgba(255,255,255,0.08)"
                    : undefined,
                },
              }}
            >
              <ChevronLeftIcon className={arrowIconClassName} />
            </IconButton>
          );
        }

        if (item.type === "next") {
          return (
            <IconButton
              key={index}
              disabled={item.disabled}
              onClick={item.onClick}
              aria-label="Next page"
              sx={{
                color: isDark ? "#ffffff" : "inherit",

                "&.Mui-disabled": {
                  color: isDark
                    ? "rgba(255,255,255,0.3)"
                    : undefined,
                },

                "&:hover": {
                  backgroundColor: isDark
                    ? "rgba(255,255,255,0.08)"
                    : undefined,
                },
              }}
            >
              <ChevronRightIcon className={arrowIconClassName} />
            </IconButton>
          );
        }

        if (
          item.type === "start-ellipsis" ||
          item.type === "end-ellipsis"
        ) {
          return (
            <Typography
              key={index}
              px={1}
              sx={{
                color: isDark ? "#ffffff" : "inherit",
              }}
            >
              …
            </Typography>
          );
        }

        return (
          <IconButton
            key={index}
            onClick={item.onClick}
            className={`${customItemClassName} ${
              item.selected ? customActiveClass : undefined
            }`}
            sx={{
              minWidth: 36,
              height: 36,
              borderRadius: "8px",
              fontWeight: 500,

              backgroundColor: item.selected
                ? "primary.main"
                : isDark
                  ? "transparent"
                  : "transparent",

              color: item.selected
                ? "#fff"
                : isDark
                  ? "#ffffff"
                  : "text.primary",

              transition: "all 0.2s ease",

              "&:hover": {
                backgroundColor: item.selected
                  ? "primary.dark"
                  : isDark
                    ? "rgba(255,255,255,0.15) !important"
                    : "action.hover",

                color: isDark ? "#ffffff" : undefined,
              },
            }}
          >
            {item.page}
          </IconButton>
        );
      })}
    </Box>
  );
};

export default CustomPagination;