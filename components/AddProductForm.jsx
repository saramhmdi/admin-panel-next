import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer } from "react-toastify";

import { addEditValidationForm, showToast } from "../utils/functions";
import { useCreateProduct } from "../services/mutations";

function AddProductForm({ setIsShowAdd }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(addEditValidationForm()),
    mode: "onBlur",
  });
  const { mutate } = useCreateProduct();

  const onSubmit = (data) => {
    try {
      mutate(data);
      reset()
      showToast("محصول با موفقیت اضافه شد", "success");
      setTimeout(() => {
        setIsShowAdd(false);
      }, 1500);
    } catch {
      showToast("متاسفانه مشکلی پیش آمده است", "error");
    }
  };

  const closeHandler = (e) => {
    e.preventDefault();
    showToast("شما از ایجاد محصول انصراف داده اید.", "info");
    setIsShowAdd(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#3333337D] bg-opacity-10 z-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#ffffff] rounded-xl w-[460px] text-center p-10 h-[510px]"
      >
        <p className="text-[20px] text-[#282828] font-medium pt-8 mb-4">
          ایجاد محصول جدید
        </p>
        {["name", "quantity", "price"].map((field) => (
          <div key={field} className="flex flex-col">
            <label
              className="text-[14px] text-right text-[#282828] font-medium  mb-4"
              htmlFor={field}
            >
              {field === "name"
                ? "نام کالا"
                : field === "quantity"
                ? "تعداد موجودی"
                : "قیمت"}
            </label>
            <div className="flex flex-col gap-1 w-full">
              <input
                {...register(field)}
                className="w-full h-[40px] text-[16px] bg-[#F2F2F2] text-[#28282880] rounded-lg text-right p-3"
                id={field}
                placeholder={
                  field === "name"
                    ? "نام کالا"
                    : field === "quantity"
                    ? "تعداد موجودی"
                    : "قیمت"
                }
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
            ایجاد
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

export default AddProductForm;
