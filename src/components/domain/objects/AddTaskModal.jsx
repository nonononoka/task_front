import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { formatISO } from "date-fns";
import "./Modal.css";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { TaskInputCard } from "../../gui/groups/TaskInputCard";
import { AllRegisteredTasks } from "../../gui/groups";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { TaskRegisterButton } from "../../gui/groups/TaskRegisterButton";

export const AddTaskModal = ({ isTemporary, temporaryDate, onClose, categories, registeredTaskData, addTask }) => {

    const [date, setDate] = useState(temporaryDate);
    const [category, setCategory] = useState(null);
    const [name, setName] = useState("");
    const [selectedPriority, setSelectedPriority] = useState("HIGH");

    return (
        <>
            {isTemporary && (
                <AllRegisteredTasks allRegisteredTasks={registeredTaskData.allRegisteredTasks}
                    handleClick={() => {
                        setName(task.name);
                        setSelectedPriority(task.priority);
                        setCategory(task.category);
                    }} />
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
                        allCategories={categories.allCategories}
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
                <TaskRegisterButton handleClick={() => {
                    addTask({
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
                }} />
            </Box>
        </>
    );
};
