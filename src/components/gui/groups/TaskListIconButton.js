import IconButton from "@mui/material/IconButton";

export const TaskListIconButton = ({ children, label, handleClick, disabled = false}) => {
    return (
        <IconButton
            aria-label={label}
            style={{
                marginLeft: "20px",
            }}
            onClick={handleClick}
            disabled = {disabled}
        >
            {children}
        </IconButton>
    )
}