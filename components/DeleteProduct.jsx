import { ToastContainer } from "react-toastify";

import { useDeleteProduct } from "../services/mutations";
import { showToast } from "../utils/functions";

function DeleteProduct({ product, onClose }) {
  const { mutate } = useDeleteProduct();

  const deleteHandler = () => {
    mutate(product.id, {
      onSuccess: () => {
        showToast("محصول با موفقیت حذف شد", "success");
        setTimeout(() => {
          onClose();
        }, 1500);
      },
      onError: () => {
        showToast("متاسفانه مشکلی پیش آمده است", "error");
      },
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#3333337D] bg-opacity-10 z-50">
      <div className="bg-[#ffffff] rounded-xl w-[472px] text-center p-10 h-[338px]">
        <img src="images/Close.svg" alt="delete-product" className="mx-auto mb-4" />
        <p className="text-[#282828] font-normal pt-8">
          آیا از حذف این محصول مطمئنید؟
        </p>
        <div className="mt-8">
          <button
            className="bg-[#F43F5E]  rounded-lg w-[160px] h-[41px] text-[#ffffff] font-semibold ml-4"
            onClick={deleteHandler}
          >
            حذف
          </button>
          <button
            className="bg-[#DFDFDF]  rounded-lg w-[160px] h-[41px] text-[#282828CC] font-semibold"
            onClick={onClose}
          >
            لغو
          </button>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default DeleteProduct;
