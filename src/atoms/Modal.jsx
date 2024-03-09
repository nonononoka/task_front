import { gql, useMutation, useQuery } from "@apollo/client";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { formatISO } from "date-fns";
import "./Modal.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const TaskCard = ({ priority, name, limitDate }) => {
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

export const AddTaskModal = ({
  isTemporary,
  temporaryDate,
  handleCloseClick,
}) => {
  const ADD_TASK_MUTATION = gql`
    mutation RegisterTask($input: AddTaskInput!) {
      registerTask(input: $input) {
        id
        limitDate
        name
        postedBy
      }
    }
  `;

  const ADD_SHORT_TASK_MUTATION = gql`
    mutation RegisterTask($input: AddShortTaskInput!) {
      registerShortTask(input: $input) {
        id
        expirationDate
        name
        postedBy
      }
    }
  `;

  const ALL_TASKS = gql`
    query AllTasks {
      allRegisteredTasks {
        id
        limitDate
        name
        isCompleted
        priority
      }
    }
  `;

  const ALL_CATEGORIES = gql`
    query AllCategories {
      allCategories {
        category
      }
    }
  `;

  const ALL_REGISTERED_SHORT_TASKS = gql`
    query AllTasks {
      allRegisteredShortTasks {
        id
        expirationDate
        name
        isCompleted
      }
    }
  `;
  const { data, error, loading } = useQuery(ALL_CATEGORIES);
  const {
    data: taskData,
    error: taskError,
    loading: taskLoading,
  } = useQuery(ALL_TASKS);

  const [date, setDate] = useState(temporaryDate);
  const [category, setCategory] = useState(null);
  const [priority, setPriority] = useState("HIGH");
  const [val, setVal] = useState("");

  const [addTask] = useMutation(ADD_TASK_MUTATION, {
    refetchQueries: [{ query: ALL_TASKS }, { query: ALL_CATEGORIES }],
  });

  const [addShortTask] = useMutation(ADD_SHORT_TASK_MUTATION, {
    refetchQueries: [
      { query: ALL_REGISTERED_SHORT_TASKS },
      { query: ALL_CATEGORIES },
    ],
  });
  if (error || loading) {
    return <></>;
  }
  if (taskError || taskLoading) {
    return <></>;
  }

  return (
    <>
      {isTemporary && (
        <>
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            navigation={true}
            modules={[Navigation]}
            className="mySwiper"
          >
            {taskData.allRegisteredTasks.map((task) => {
              return (
                <SwiperSlide key={task.id}>
                  <Card variant="outlined">
                    <TaskCard
                      priority={task.priority}
                      name={task.name}
                      limitDate={task.limitDate}
                    />
                  </Card>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </>
      )}
      <div>
        <input
          placeholder="your task"
          value={val}
          onChange={(e) => setVal(e.target.value)}
        />
      </div>
      {!isTemporary && (
        <>
          <div>
            <DatePicker
              showIcon
              selected={date}
              onChange={(selectedDate) => {
                setDate(selectedDate);
              }}
            />
          </div>
          <div>
            <button onClick={() => setDate(null)}>日付を設定しない</button>
          </div>
        </>
      )}
      <div>
        <input
          placeholder="add Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="HIGH">HIGH</option>
          <option value="MIDDLE">MIDDLE</option>
          <option value="LOW">LOW</option>
        </select>
      </div>
      <div>
        {data.allCategories.length >= 1 && (
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {data.allCategories.map((category) => (
              <option key={category.category} value={category.category}>
                {category.category}
              </option>
            ))}
          </select>
        )}
      </div>
      <Button
        variant="outlined"
        onClick={() => {
          handleCloseClick();
          isTemporary
            ? addShortTask({
                variables: {
                  input: {
                    name: val,
                    expirationDate: formatISO(temporaryDate),
                    priority: priority,
                    category: category,
                  },
                },
              })
            : addTask({
                variables: {
                  input: {
                    name: val,
                    limitDate: date ? date.toISOString() : null,
                    priority: priority,
                    category: category,
                  },
                },
              });
        }}
      >
        Register
      </Button>
    </>
  );
};
