import logoImg from "../assets/logo.jpg";

import { useRef, useContext } from "react";

import { CartContext } from "../store/CartContext";
import ModalCart from "./ModalCart";
import ModalForm from "./ModalForm";

export default function Header() {
  const modal = useRef();

  const formModal = useRef();

  const { items } = useContext(CartContext);

  const cartQuantity = items.length;

  function handleOpenCart() {
    modal.current.open();
  }

  function handleOpenForm() {
    formModal.current.open();
  }

  let modalActions = <button className="button">Close</button>;

  if (cartQuantity > 0) {
    modalActions = (
      <>
        <button className="button">Close</button>
        <button onClick={handleOpenForm} className="button">
          Checkout
        </button>
      </>
    );
  }

  return (
    <>
      <ModalCart ref={modal} title="Your Cart" actions={modalActions} />
      <ModalForm ref={formModal} />

      <header id="main-header">
        <div id="title">
          <img src={logoImg} alt="logo" />

          <h1>Food Shop</h1>
        </div>
        <p>
          <button onClick={handleOpenCart} className="button">
            Cart({cartQuantity})
          </button>
        </p>
      </header>
    </>
  );
}
