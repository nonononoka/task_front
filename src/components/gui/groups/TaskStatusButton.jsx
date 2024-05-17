import { ListItemButton } from "@mui/material";

export const TaskStatusButton = ({ handleClick, style, children }) => {
    return (
        <ListItemButton
            role={undefined}
            onClick={handleClick}
            style={style}
        >
            {children}
        </ListItemButton>
    )
}