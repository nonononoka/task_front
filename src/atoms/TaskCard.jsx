import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

export const TaskCard = ({
  priority,
  name,
  setName,
  limitDate,
  selectedPriority,
  setSelectedPriority,
  date,
  setDate,
  category,
  setCategory,
}) => {
  //task優先度でchip背景色を切り替える関数
  function getChipBackgroundColor(priority) {
    switch (priority) {
      case "HIGH":
        return "red"; // 高優先度の場合、赤色
      case "MIDDLE":
        return "orange"; // 中優先度の場合、オレンジ色
      case "LOW":
        return "green"; // 低優先度の場合、緑色
      default:
        return "gray"; // その他の場合、グレー色
    }
  }

  return (
    <CardContent>
      <Chip
        label={priority}
        style={{
          backgroundColor: getChipBackgroundColor(priority),
          color: "white",
        }}
      />
      <Typography variant="h5" component="div">
        {name}
      </Typography>
      {limitDate ? (
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {limitDate.split("T")[0]}
        </Typography>
      ) : (
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Timeless
        </Typography>
      )}
      <Typography variant="body2">
        well meaning and kindly
        <br />
        {'"a benevolent smile"'}
      </Typography>
    </CardContent>
  );
};
