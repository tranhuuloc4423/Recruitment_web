import React from "react";
import dayjs from "dayjs";
import "dayjs/locale/vi"; // Import ngôn ngữ Tiếng Việt
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { viVN } from "@mui/x-date-pickers/locales";

const DateTimePicker = ({ date, setDate, validDate, minDate, maxDate }) => {
  const today = dayjs().add(1, "day");

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vi" localeText={viVN.components.MuiLocalizationProvider.defaultProps.localeText}>
      <DatePicker
        format="DD/MM/YYYY"
        value={date}
        onChange={handleDateChange}
        minDate={minDate || undefined}
        maxDate={maxDate || undefined}
        shouldDisableDate={validDate ? (date) => date < today : undefined}
        slotProps={{
          textField: {
            placeholder: "Chọn ngày...",
            sx: {
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: "400",
              fontFamily: "Lexend",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "2px solid",
                borderColor: "#e5e7eb",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#e5e7eb",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#e5e7eb",
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default DateTimePicker;
