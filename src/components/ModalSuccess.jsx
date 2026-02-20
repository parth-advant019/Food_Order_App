import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import UserForm from "./UserForm";

const ModalSuccess = forwardRef(function Modal({ onClose }, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal();
      },
      close: () => {
        dialog.current.close();
      },
    };
  });

  return createPortal(
    <dialog className="modal" ref={dialog}>
      <h3>your order is placed</h3>
      <h3>Thanks for ordering.....</h3>
      <form method="dialog" className="modal-actions">
        <button
          className="button"
          onClick={() => {
            onClose();
          }}
        >
          ok
        </button>
      </form>
    </dialog>,
    document.getElementById("modal"),
  );
});

export default ModalSuccess;
