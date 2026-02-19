export async function getItems() {
  const response = await fetch("http://localhost:3000/meals");
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch items");
  }

  return resData;
}

export async function createOrder(orderData) {
  const response = await fetch("http://localhost:3000/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      order: orderData,
    }),
  });

  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to add order");
  }

  return resData;
}
