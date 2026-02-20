import { useActionState, useContext, useRef, useEffect } from "react";
import { CartContext } from "../store/CartContext";
import { isEmail, isNotEmpty } from "../util/validation";
import ModalSuccess from "./ModalSuccess";
import { createOrder } from "../http";

async function submitAction(prevFormState, formData, items) {
  const name = formData.get("name");
  const email = formData.get("email");
  const street = formData.get("street");
  const postalCode = formData.get("postalCode");
  const city = formData.get("city");

  let errors = [];

  if (!isNotEmpty(name)) {
    errors.push("please enter name");
  }

  if (!isEmail(email)) {
    errors.push("Invalid email");
  }

  if (!isNotEmpty(street)) {
    errors.push("please enter street");
  }

  if (!isNotEmpty(postalCode)) {
    errors.push("please enter postalCode");
  }

  if (!isNotEmpty(city)) {
    errors.push("please enter city");
  }

  if (errors.length > 0) {
    return {
      errors,
      enterValue: {
        name,
        email,
        street,
        postalCode,
        city,
      },
    };
  }

  const orderData = {
    items,
    customer: {
      name,
      email,
      street,
      "postal-code": postalCode,
      city,
    },
  };

  try {
    await createOrder(orderData);
    return { errors: null, success: true };
  } catch (error) {
    return {
      errors: [error.message],
    };
  }
}

export default function UserForm({ onClose }) {
  const { items } = useContext(CartContext);

  const [formState, formAction, isSending] = useActionState(
    (prevState, formData) => submitAction(prevState, formData, items),
    { errors: null },
  );

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const successModal = useRef();

  useEffect(() => {
    if (formState.success) {
      onClose();
      successModal.current.open();
    }
  }, [formState.success]);

  // function handleSuccessModal() {
  //   successModal.current.open();
  // }

  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  return (
    <>
      <ModalSuccess ref={successModal} onClose={onClose} />
      <div>
        <p>Total Price : - {formattedTotalPrice}</p>
      </div>

      <form action={formAction}>
        <div className="control">
          <label>First Name</label>
          <input
            type="text"
            name="name"
            id="name"
            defaultValue={formState.enterValue?.name}
          />
          <label>Email </label>
          <input
            type="text"
            name="email"
            id="email"
            defaultValue={formState.enterValue?.email}
          />
          <label>Street</label>
          <input
            type="text"
            name="street"
            id="street"
            defaultValue={formState.enterValue?.street}
          />
          <label>Postal code </label>
          <input
            type="text"
            name="postalCode"
            id="postalCode"
            defaultValue={formState.enterValue?.postalCode}
          />
          <label>city </label>
          <input
            type="text"
            name="city"
            id="city"
            defaultValue={formState.enterValue?.city}
          />

          <div className="control-row">
            <button
              type="button"
              className="button"
              onClick={() => {
                onClose();
              }}
            >
              close
            </button>
            <button type="submit" className="button">
              {isSending ? "Data is submitting" : "submit"}
            </button>
          </div>

          {formState.errors && (
            <ul className="error">
              {formState.errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          )}
        </div>
      </form>
    </>
  );
}
