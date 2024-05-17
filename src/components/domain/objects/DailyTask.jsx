import { AddTask, EachTaskListItem } from "../elements";
import { DateTitle } from "../../gui/groups";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";

export const DailyTask = ({ date, title, tasks, sx, item_xs0, item_xs1, font_size }) => {
    return (
        <>
            <Card sx={sx}>
                <CardContent>
                    <Grid container alignItems="center">
                        <Grid item xs={item_xs0}>
                            <DateTitle title={title} />
                        </Grid>
                        <Grid item xs={item_xs1}>
                            <div>
                                <AddTask isTemporary={true} temporaryDate={date} />
                            </div>
                        </Grid>
                    </Grid>
                    <List>
                        {tasks.map((task) => {
                            return <EachTaskListItem key = {task.id} task={task} font_size = {font_size}/>
                        })}
                    </List>
                </CardContent>
            </Card>
        </>
    )
}