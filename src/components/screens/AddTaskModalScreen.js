import { AddTaskModalContainer } from "../containers";

export const AddTaskModalScreen = ({ onClose, isTemporary, temporaryDate }) => (
    <>
        <AddTaskModalContainer onClose={onClose} isTemporary={isTemporary} temporaryDate={temporaryDate} />
    </>
);