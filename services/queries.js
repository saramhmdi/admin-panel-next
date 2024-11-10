import { useQuery } from "@tanstack/react-query";

import api from "../configs/api";

const useGetAllProducts = (page, search) => {
  const queryFn = () =>
    api.get(`products?page=${page}&limit=10&name=${search}`);
  const queryKey = ["all-products", page, search];
  return useQuery({ queryFn, queryKey });
};

export { useGetAllProducts };
