import { AddTask, DateTitle, EachTaskListItem } from "../elements";
import { DateTitle } from "../gui/groups";

export const DailyTask = ({ date, title, tasks, sx, item_xs0, item_xs1 }) => {
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
                            <EachTaskListItem task={task} />
                        })}
                    </List>
                </CardContent>
            </Card>
        </>
    )
}