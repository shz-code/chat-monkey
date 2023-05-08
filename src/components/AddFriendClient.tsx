"use client";

import { addFriendValidator } from "@/lib/validations";
import axios, { AxiosError } from "axios";
import { useFormik } from "formik";
import { FC } from "react";
import { toast } from "react-hot-toast";
import { z } from "zod";
import Button from "./ui/Button";

interface AddFriendClientProps {}

const AddFriendClient: FC<AddFriendClientProps> = ({}) => {
  type Form = z.infer<typeof addFriendValidator>;

  //   add friend function
  const addFriend = async (email: string) => {
    try {
      // validate email provided by user
      const validatedEmail = addFriendValidator.parse({ email });

      const res = await axios.post("/api/friends/add", {
        email: validatedEmail?.email,
      });
      //   const data = await res.json();
      console.log(res);

      toast.success("Done");
    } catch (error) {
      console.log(error);

      // catch zod error
      if (error instanceof z.ZodError) {
        toast.error(error.format().email?._errors);
      }
      //   catch axios error
      if (error instanceof AxiosError) {
        toast.error(error.response?.statusText);
      }
    }
  };

  //   initialize formik
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    // formik validations
    validate: (values: Form) => {
      const errors = {};
      if (!values.email) errors.email = "Invalid email address";
      return errors;
    },
    // formik onSubmit function
    onSubmit: (values: Form) => {
      addFriend(values.email);
    },
  });

  return (
    <form
      className="flex flex-col justify-center items-center"
      onSubmit={formik.handleSubmit}
    >
      <label
        htmlFor="email"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Add friend by E-Mail
      </label>
      <div className="mt-2 flex gap-4">
        <input
          type="text"
          id="email"
          className={`block w-full rounded-md border-0 text-gray-900 shadow-sm  placeholder:text-gray-400  sm:text-sm sm:leading-6 ${
            formik.errors?.email && formik.touched?.email
              ? "ring-1 ring-inset ring-red-600 focus:ring-red-600"
              : "ring-1 ring-inset ring-gray-300 focus:ring-slate-600"
          }`}
          placeholder="you@example.com"
          {...formik.getFieldProps("email")}
        />
        <Button type="submit" disabled={formik.errors.email}>
          Add
        </Button>
      </div>
    </form>
  );
};

export default AddFriendClient;
