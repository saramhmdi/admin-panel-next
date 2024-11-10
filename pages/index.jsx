import { useState } from "react";
import { RingLoader } from "react-spinners";
import ReactPaginate from "react-paginate";

import AddEditProductForm from "../components/AddProductForm";
import ProductTable from "../components/ProductTable";
import SearchBox from "../components/SearchBox";
import { useGetAllProducts } from "../services/queries";
import { convertToPersianNumbers } from "../utils/functions";

function ProductsPage() {
  const [page, setPage] = useState(0);
  const [isShowAdd, setIsShowAdd] = useState(false);
  const [search, setSearch] = useState("");
  const { isLoading, data, error } = useGetAllProducts(page + 1, search);

  const handlePageChange = ({ selected }) => {
    setPage(selected);
  };
  return (
    <div className="flex flex-col min-h-screen">
      <SearchBox setSearch={setSearch} search={search} />
      <div className="flex justify-between items-center pt-8 ">
        <div className="flex items-center gap-2 mb-4">
          <img
            src="images/setting-3.svg"
            alt="setting-icon"
            className="w-[30px] h-[30px] mr-2"
          />
          <span className=" font-normal text-[#282828]">مدیریت کالا</span>
        </div>
        <button
          className="bg-[#55A3F0] font-normal text-[#ffffff] px-4 py-2 rounded-lg hover:bg-[#4693d5] transition duration-200"
          onClick={() => setIsShowAdd(true)}
        >
          افزودن محصول
        </button>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <RingLoader color={"#55A3F0"} />
        </div>
      ) : error ? (
        error.response?.data?.message ===
        "Page 1 is out of bounds. There are only 0 pages." ? (
          <p className="text-center">متاسفانه محصولی برای نمایش نیست.</p>
        ) : (
          <img src="images/network-disconnected-svgrepo-com.svg" alt="error" />
        )
      ) : (
        data && <ProductTable isLoading={isLoading} products={data.data} />
      )}
      {isShowAdd && <AddEditProductForm setIsShowAdd={setIsShowAdd} />}
      <ReactPaginate
        pageCount={data?.totalPages}
        onPageChange={handlePageChange}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        containerClassName={"flex justify-center items-center my-4"}
        activeClassName={"bg-[#55A3F0] !text-[#ffffff] "}
        pageClassName={
          "mx-2 flex items-center justify-center w-[35px] h-[35px] text-[#8D8D8D80] border border-[#8D8D8D80] rounded-[42px] "
        }
        previousClassName={"hidden"}
        nextClassName={"hidden"}
        renderOnZeroPageCount={null}
        pageLabelBuilder={(page) => convertToPersianNumbers(page)}
      />
    </div>
  );
}

export default ProductsPage;
