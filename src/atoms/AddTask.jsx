import { useState } from "react";
import { createPortal } from "react-dom";
import { AddTaskModal } from "./Modal.jsx";

import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/AddTask";

const ModalPortal = ({ children }) => {
  const target = document.querySelector(".container.end");
  return createPortal(children, target);
};

export const AddTask = ({ isTemporary, temporaryDate }) => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <IconButton
        aria-label="addTask"
        onClick={() => setModalOpen(true)}
        disabled={modalOpen}
      >
        <AddIcon />
      </IconButton>

      <div className="container end" />

      {modalOpen && (
        <ModalPortal>
          <AddTaskModal
            handleCloseClick={() => setModalOpen(false)}
            isTemporary={isTemporary}
            temporaryDate={temporaryDate}
          />
        </ModalPortal>
      )}
    </div>
  );
};
