import { useEffect, useState } from "react";
import API from "./api";

function App() {
  const [products, setProducts] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const [category, setCategory] = useState("");

  const fetchProducts = async (reset = false) => {
    try {
      const params = {};

      if (cursor && !reset) {
        params.cursor = cursor;
      }

      if (category) {
        params.category = category;
      }

      const res = await API.get("/products", {
        params,
      });

      if (reset) {
        setProducts(res.data.data);
      } else {
        setProducts((prev) => [
          ...prev,
          ...res.data.data,
        ]);
      }

      setCursor(res.data.next_cursor);
      setHasMore(res.data.has_more);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setProducts([]);
    setCursor(null);

    fetchProducts(true);
  }, [category]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Products</h1>

      <select
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)
        }
      >
        <option value="">
          All Categories
        </option>

        <option value="Electronics">
          Electronics
        </option>

        <option value="Books">
          Books
        </option>

        <option value="Beauty">
          Beauty
        </option>

        <option value="Home Appliances">
          Home Appliances
        </option>

        <option value="Toys">
          Toys
        </option>

        <option value="Clothing">
          Clothing
        </option>
      </select>

      <h3>
        Loaded Products: {products.length}
      </h3>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Updated At</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>

              <td>
                {product.product_name}
              </td>

              <td>{product.category}</td>

              <td>
                ₹{product.price}
              </td>

              <td>
                {new Date(
                  product.updated_at
                ).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      {hasMore && (
        <button
          onClick={() =>
            fetchProducts()
          }
        >
          Load More
        </button>
      )}

      {!hasMore && (
        <p>No More Products</p>
      )}
    </div>
  );
}

export default App;