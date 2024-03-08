import { useState } from "react";
import { createPortal } from "react-dom";
import { AddTaskModal } from "./Modal.jsx";

const ModalPortal = ({ children }) => {
  const target = document.querySelector(".container.end");
  return createPortal(children, target);
};

export const AddTask = ({ isTemporary, temporaryDate }) => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <div className="container end" />
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        disabled={modalOpen}
      >
        Add Task
      </button>

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
