import { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "./baseUrl";

const useAllProducts = () => {
  const [allProductsLoading, setAllProductsLoading] = useState(true);
  const [allProducts, setAllProducts] = useState(null);
  const [allProductsError, setAllProductsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await axios.get(`${baseUrl}/products`);
        setAllProducts(res);
      } catch (err) {
        setAllProductsError(true);
      } finally {
        setAllProductsLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    allProductsLoading,
    allProducts,
    allProductsError,
  };
};

export default useAllProducts;
