import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import UserForm from "./UserForm";

const ModalForm = forwardRef(function Modal({}, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog className="modal" ref={dialog}>
      <h2>Enter your Data</h2>
      <UserForm />
    </dialog>,
    document.getElementById("modal"),
  );
});

export default ModalForm;
