export async function getItems() {
  const response = await fetch("http://localhost:3000/meals");
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch items");
  }

  return resData.items;
}
