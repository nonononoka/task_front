import { gql, useMutation, useQuery } from "@apollo/client";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { formatISO } from "date-fns";
import "./Modal.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { TaskCard } from "./TaskCard";
import { TaskInputCard } from "./TaskInputCard";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

export const AddTaskModal = ({ isTemporary, temporaryDate, onClose }) => {
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
        category
      }
    }
  `;

  const ALL_CATEGORIES = gql`
    query AllCategories {
      allCategories {
        label
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
  const [name, setName] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("HIGH");

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
                  <Card
                    onClick={() => {
                      setName(task.name);
                      setSelectedPriority(task.priority);
                      setCategory(task.category);
                    }}
                    variant="outlined"
                  >
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
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        <Card variant="outlined">
          <TaskInputCard
            selectedPriority={selectedPriority}
            setSelectedPriority={setSelectedPriority}
            name={name}
            setName={setName}
            isTemporary={isTemporary}
            date={date}
            setDate={setDate}
            category={category}
            setCategory={setCategory}
            allCategories={data.allCategories}
          />
        </Card>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "15px",
          marginBottom: "10px",
        }}
      >
        <Button
          variant="outlined"
          onClick={() => {
            isTemporary
              ? addShortTask({
                  variables: {
                    input: {
                      name: name,
                      expirationDate: formatISO(temporaryDate),
                      priority: selectedPriority,
                      category: category,
                    },
                  },
                })
              : addTask({
                  variables: {
                    input: {
                      name: name,
                      limitDate: date ? date.toISOString() : null,
                      priority: selectedPriority,
                      category: category,
                    },
                  },
                });
            onClose();
          }}
        >
          Register
        </Button>
      </Box>
    </>
  );
};
