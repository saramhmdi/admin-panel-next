import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer } from "react-toastify";

import { addEditValidationForm, showToast } from "../utils/functions";
import { useEditProduct } from "../services/mutations";

function EditProductForm({ setIsShowEdit, product }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(addEditValidationForm()),
    mode: "onBlur",
    defaultValues: product,
  });

  const { mutate } = useEditProduct(product.id);

  const handleResponse = (successMessage) => {
    showToast(successMessage, "success");
    setTimeout(() => {
      setIsShowEdit(false);
    }, 1500);
  };

  const onSubmit = async (data) => {
    try {
       mutate(data);
      reset();
      handleResponse(
        "محصول با موفقیت ویرایش شد",
      );
    } catch {
      showToast("متاسفانه مشکلی پیش آمده است", "error");
    }
  };

  const closeHandler = (e) => {
    e.preventDefault();
    setIsShowEdit(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#3333337D] bg-opacity-10 z-50">
      <form
        className="bg-[#ffffff] rounded-xl w-[460px] text-center p-10 h-[510px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="text-[20px] text-[#282828] font-medium pt-8 mb-4">
          ویرایش اطلاعات
        </p>
        {["name", "quantity", "price"].map((field) => (
          <div key={field} className="flex flex-col">
            <label
              htmlFor={field}
              className="text-[14px] text-right text-[#282828] font-medium  mb-4"
            >
              {field === "name"
                ? "نام کالا"
                : field === "quantity"
                ? "تعداد موجودی"
                : "قیمت"}
            </label>
            <div>
              <input
                {...register(field)}
                id={field}
                className="w-full h-[40px] text-[16px] bg-[#F2F2F2] text-[#282828] rounded-lg text-right p-3"
              />
              {errors[field] && (
                <p className="text-[#F43F5E] text-right text-[12px]">
                  {errors[field].message}
                </p>
              )}
            </div>
          </div>
        ))}
        <div className="mt-8">
          <button
            type="submit"
            className="bg-[#55A3F0]  rounded-lg w-[160px] h-[41px] text-[#ffffff] font-semibold ml-4"
          >
            ثبت اطلاعات جدید
          </button>
          <button
            className="bg-[#DFDFDF]  rounded-lg w-[160px] h-[41px] text-[#282828CC] font-semibold"
            onClick={closeHandler}
          >
            انصراف
          </button>
        </div>
        <ToastContainer />
      </form>
    </div>
  );
}

export default EditProductForm;
