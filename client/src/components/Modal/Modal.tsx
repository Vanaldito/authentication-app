import { createPortal } from "react-dom";

import "./Modal.css";

interface ModalProps {
  children: React.ReactNode;
  closeModal: () => void;
}

export default function Modal({ children, closeModal }: ModalProps) {
  return createPortal(
    <div className="modal-container">
      <div className="modal-background" onClick={closeModal} />
      <div className="modal">
        <button className="modal__close-button" onClick={closeModal}>
          X
        </button>
        <div className="modal__content">{children}</div>
      </div>
    </div>,
    document.getElementById("root") as HTMLElement
  );
}
