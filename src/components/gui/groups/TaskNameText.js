export const TaskNameText = ({ labelId, taskName, style }) => {
    return (
        <ListItemText
            id={labelId}
            primary={taskName}
            style={style}
        />
    )
}