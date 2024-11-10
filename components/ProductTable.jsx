import { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { RingLoader } from "react-spinners";
import { TbEdit } from "react-icons/tb";
import EditProductForm from "./EditProductForm";
import DeleteProduct from "./DeleteProduct";

function ProductTable({ products, isLoading }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isShowDelete, setIsShowDelete] = useState(false);

  const handleOpenModal = (product, isDelete) => {
    setSelectedProduct(product);
    setIsShowDelete(isDelete);
  };

  const handleCloseModal = () => {
    setIsShowDelete(false);
    setSelectedProduct(null);
  };

  return (
    <div className="flex flex-col flex-grow ">
      <table className="min-w-full border border-[#e4e4e4] rounded-2xl overflow-hidden m-3 table-auto">
        <thead className="bg-[#F2F2F2] h-[70px]">
          <tr>
            <th className="font-medium text-[#282828] px-8 py-2 text-right">
              نام کالا
            </th>
            <th className="font-medium text-[#282828] px-4 py-2 text-right">
              موجودی
            </th>
            <th className="font-medium text-[#282828] px-4 py-2 text-right">
              قیمت
            </th>
            <th className="font-medium text-[#282828] px-4 py-2 text-right">
              شناسه کالا
            </th>
            <th className="font-medium text-[#282828] px-4 py-2 text-right"></th>
          </tr>
        </thead>
        <tbody className="bg-[#fffff]">
          {isLoading ? (
            <tr>
              <td colSpan="5" className="text-center">
                <RingLoader color={"#55A3F0"} />
              </td>
            </tr>
          ) : (
            products?.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-[#f9fafb] border border-[#F2F2F2]"
              >
                <td className="px-8 py-2">{product.name}</td>
                <td className="px-4 py-2">{product.quantity}</td>
                <td className="px-4 py-2">{product.price} هزار تومان</td>
                <td className="px-4 py-2">{product.id}</td>
                <td className="flex items-center justify-center space-x-4 py-4">
                  <TbEdit
                    onClick={() => handleOpenModal(product, false)}
                    className="text-3xl text-[#4ADE80] cursor-pointer hover:text-[#38B000] transition duration-200"
                  />
                  <RiDeleteBin5Line
                    onClick={() => handleOpenModal(product, true)}
                    className="text-3xl text-[#F43F5E] cursor-pointer hover:text-[#D80000] transition duration-200"
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {selectedProduct && !isShowDelete && (
        <EditProductForm
          setIsShowEdit={handleCloseModal}
          product={selectedProduct}
        />
      )}

      {isShowDelete && (
        <DeleteProduct product={selectedProduct} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default ProductTable;
