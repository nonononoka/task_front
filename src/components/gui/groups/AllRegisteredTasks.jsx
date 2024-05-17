import { TaskCard } from "./TaskCard.jsx"
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Card } from "@mui/material";

export const AllRegisteredTasks = ({ allRegisteredTasks, handleClick }) => {
    return (
        <Swiper
            slidesPerView={3}
            spaceBetween={30}
            navigation={true}
            modules={[Navigation]}
            className="mySwiper"
        >
            {allRegisteredTasks.map((task) => {
                return (
                    <SwiperSlide key={task.id}>
                        <Card
                            onClick={() => handleClick(task)}
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
    )
}