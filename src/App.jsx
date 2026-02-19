import Header from "./components/Header";
import Items from "./components/Items";
import { getItems } from "./http";
import { useFetch } from "./hooks/useFetch";
import { CartContextProvider } from "./store/CartContext";

function App() {
  const { fetchedData, error, isFetching } = useFetch(getItems, []);

  return (
    <CartContextProvider>
      <Header />

      {!error && (
        <Items
          items={fetchedData}
          loadingText="Fetch your data"
          isLoading={isFetching}
        />
      )}
    </CartContextProvider>
  );
}

export default App;
