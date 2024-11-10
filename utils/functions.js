import * as yup from "yup";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { messages } from "../configs/constants";
const adminValidationForm = (includeConfirmPassword = false) => {
  const schema = {
    username: yup
      .string()
      .matches(/^[A-Za-z]+$/, "نام کاربری باید به انگلیسی وارد شود")
      .min(3, "نام کاربری باید حداقل ۳ کاراکتر باشد")
      .required("نام کاربری الزامی است"),
    password: yup
      .string()
      .min(4, "رمز عبور باید حداقل ۴ کاراکتر باشد")
      .required("رمز عبور الزامی است"),
  };

  if (includeConfirmPassword) {
    schema.confirmPassword = yup
      .string()
      .oneOf([yup.ref("password"), null], "رمز عبور و تأیید آن مطابقت ندارند")
      .required("تأیید رمز عبور الزامی است");
  }

  return yup.object().shape(schema);
};

const addEditValidationForm = () => {
  const schema = {
    name: yup
      .string()
      .min(3, "نام کالا باید حداقل ۳ کاراکتر باشد")
      .required("نام کالا الزامی است"),
    price: yup
      .string()
      .matches(/^[0-9]+$/, "قیمت کالا باید به عدد وارد شود")
      .required("قیمت کالا الزامی است"),
    quantity: yup
      .string()
      .matches(/^[0-9]+$/, "تعداد موجودی کالا باید به عدد وارد شود")
      .matches(/^[0-9]+$/, "نام کاربری باید به انگلیسی وارد شود")
      .required("تعداد موجودی کالا الزامی است"),
  };
  return yup.object().shape(schema);
};

const showToast = (message, type) => {
  const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Slide,
  };
  const translatedMessage = messages[message] || message;
  if (type === "success") {
    toast.success(translatedMessage, toastOptions);
  } else if (type === "erroe") {
    toast.error(translatedMessage, toastOptions);
  } else {
    toast.info(translatedMessage, toastOptions);
  }
};
const convertToPersianNumbers = (num) => {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return String(num)
    .split("")
    .map((digit) => persianDigits[digit] || digit)
    .join("");
};
export {
  adminValidationForm,
  addEditValidationForm,
  showToast,
  convertToPersianNumbers,
};
