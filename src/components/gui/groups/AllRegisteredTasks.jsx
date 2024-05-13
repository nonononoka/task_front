import { TaskCard } from "./TaskCard.js"
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

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
                            onClick={handleClick}
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