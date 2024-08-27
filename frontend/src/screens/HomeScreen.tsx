import axios from "axios";
import { useEffect, useReducer } from "react";
import { Col, Row } from "react-bootstrap";
import logger from "use-reducer-logger";
import Product from "../components/Product";
import { Helmet } from "react-helmet-async";

type ProductType = {
  name: string;
  slug: string;
  category: string;
  image: string;
  price: number;
  countInStock: number;
  brand: string;
  rating: number;
  numReviews: number;
  description: string;
};

type ActionType = {
  type: "FETCH_REQUEST" | "FETCH_SUCCESS" | "FETCH_FAILED";
  payload: ProductType[] | string;
};

const reducer = (state: any, action: ActionType) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, products: action.payload };
    case "FETCH_FAILED":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  // const [products, setProducts] = useState<ProductType[]>([]);

  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const result = await axios("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (error: any) {
        dispatch({ type: "FETCH_FAILED", payload: error.message });
      }
      //setProducts(result.data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Amazona</title>
      </Helmet>
      <h1>Feutured produtcs</h1>
      <div className="products">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <Row>
            {products.map((product: ProductType) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                <Product product={product} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
