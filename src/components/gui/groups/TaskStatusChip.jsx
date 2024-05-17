import { Chip } from "@mui/material"

export const TaskStatusChip = ({ label, style }) => {
    return (
        <Chip
            label={label}
            style={style}
        />
    )
}