import { useFormik } from "formik";
import * as Yup from "yup";
import { Input, Button } from "@nextui-org/react";

const ContactForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(50, "Must be 50 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      message: Yup.string()
        .max(500, "Must be 500 characters or less")
        .required("Required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="container mx-auto p-4 mt-[5rem] mb-[8.5rem] max-w-[70%]">
      <h2 className="text-2xl font-bold mb-4 text-primary">Contact Us</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <Input
            fullWidth
            label="Name"
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            status={
              formik.touched.name && formik.errors.name ? "error" : "default"
            }
            helperText={
              formik.touched.name && formik.errors.name
                ? formik.errors.name
                : ""
            }
            className="mt-1"
          />
        </div>
        <div>
          <Input
            fullWidth
            label="Email"
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            status={
              formik.touched.email && formik.errors.email ? "error" : "default"
            }
            helperText={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : ""
            }
            className="mt-1"
          />
        </div>
        <div className="">
          <textarea
            id="message"
            name="message"
            rows="4"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
            placeholder="Enter your message"
            className="w-full border border-gray-300 rounded-md p-2"
          ></textarea>
          {formik.touched.message && formik.errors.message ? (
            <div className="text-red-500">{formik.errors.message}</div>
          ) : null}
        </div>
        <Button type="submit" className="bg-primary text-white">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
