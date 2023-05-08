import "./App.css";
import { Product } from "./components/Product";
import { ProductList } from "./components/ProductList";

function App() {
  return (
    <div className="App">
      <Product />
      <ProductList />
    </div>
  );
}

export default App;
