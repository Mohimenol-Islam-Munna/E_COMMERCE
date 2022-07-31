import { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "./baseUrl";

const useAllCategory = () => {
  const [allCategoryLoading, setAllCategoryLoading] = useState(true);
  const [allCategory, setAllCategory] = useState(null);
  const [allCategoryError, setAllCategoryError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await axios.get(`${baseUrl}/products/categories`);
        setAllCategory(res);
      } catch (err) {
        setAllCategoryError(true);
      } finally {
        setAllCategoryLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    allCategoryLoading,
    allCategory,
    allCategoryError,
  };
};

export default useAllCategory;
