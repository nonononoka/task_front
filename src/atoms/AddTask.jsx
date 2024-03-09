import { useState } from "react";
import { AddTaskModal } from "./Modal.jsx";
import Modal from "@mui/material/Modal";
import Box from '@mui/material/Box';

import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/AddTask";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const AddTask = ({ isTemporary, temporaryDate }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
  return (
    <div>
      <IconButton
        aria-label="addTask"
        onClick={handleOpen}
        disabled={modalOpen}
      >
        <AddIcon />
      </IconButton>

      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddTaskModal
            isTemporary={isTemporary}
            temporaryDate={temporaryDate}
          />
        </Box>
      </Modal>
    </div>
  );
};
