import { Button } from "@mui/material"

export const TaskRegisterButton = ({ handleClick }) => {
    return (
        <Button
            variant="outlined"
            onClick={handleClick}
        >
            Register
        </Button>
    )
}