import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import DatePicker from "react-datepicker";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";

export const TaskInputCard = ({
  selectedPriority,
  setSelectedPriority,
  name,
  setName,
  isTemporary,
  date,
  setDate,
  category,
  setCategory,
  allCategories,
}) => {

    console.log("category", category)
  function getChipBackgroundColor(isSelected, priority) {
    switch (priority) {
      case "HIGH":
        return isSelected ? "rgba(255, 0, 0, 1)" : "rgba(255, 0, 0, 0.2)"; // 高優先度の場合、赤色
      case "MIDDLE":
        return isSelected ? "rgba(255,165,0, 1)" : "rgba(255,165,0, 0.2)"; // 中優先度の場合、オレンジ色
      case "LOW":
        return isSelected ? "rgba(0,128,0, 1)" : "rgba(0,128,0, 0.2)"; // 低優先度の場合、緑色
      default:
        return "gray"; // その他の場合、グレー色
    }
  }

  return (
    <CardContent>
      <Stack
        direction="row"
        spacing={1}
        sx={{ marginTop: "15px", display: "flex", justifyContent: "center" }}
      >
        {["HIGH", "MIDDLE", "LOW"].map((priority) => {
          {
            return (
              <Chip
                key={priority}
                label={priority}
                style={{
                  backgroundColor: getChipBackgroundColor(
                    selectedPriority === priority,
                    priority
                  ),
                  color: "white",
                }}
                onClick={() => setSelectedPriority(priority)}
              />
            );
          }
        })}
      </Stack>
      <Stack sx={{ marginTop: "15px" }}>
        <TextField
          required
          id="outlined-required"
          label="Required"
          value={name}
          onChange={() => setName(event.target.value)}
        />
      </Stack>

      {!isTemporary && (
        <Box
          sx={{ marginTop: "15px", display: "flex", justifyContent: "center" }}
        >
          <DatePicker
            showIcon
            selected={date}
            onChange={(selectedDate) => {
              setDate(selectedDate);
            }}
            minDate={new Date()}
            isClearable
          />
        </Box>
      )}

      <Stack
        sx={{ marginTop: "15px", display: "flex", justifyContent: "center" }}
      >
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={allCategories}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Category" />}
          onChange={(event, newValue) => setCategory(newValue.label)}
          onInputChange={(event, newInputValue) => {
            setCategory(newInputValue);
          }}
          value={category}
        />
      </Stack>
    </CardContent>
  );
};
