import React, { useEffect } from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Textarea } from '@nextui-org/react';
import setCookie from '../Utils/setCookie'; // Import setCookie function

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  address: Yup.string().required('Address is required'),
});

const Orderform = () => {
  const initialValues = {
    name: '',
    email: '',
    address: '',
  };

  useEffect(() => {
    const handleChange = (values) => {
      setCookie('orderFormData', JSON.stringify(values), 1);
    };

    handleChange(initialValues);

    return () => {
      document.cookie = 'orderFormData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    };
  }, []);

  const handleFieldChange = (e, setFieldValue) => {
    const { name, value } = e.target;
    setFieldValue(name, value);
    setCookie(name, value, 1);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnChange={true}
      validateOnBlur={true}
    >
      {({ handleSubmit, isSubmitting, setFieldValue, values }) => (
        <form className="w-full">
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <Field
              type="text"
              name="name"
              placeholder="Name"
              className="w-full p-2 border rounded-md focus:outline-none focus:border-primary"
              onChange={(e) => handleFieldChange(e, setFieldValue, values)}
            />
            <ErrorMessage name="name" component="div" className="text-red-500" />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <Field
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-2 border rounded-md focus:outline-none focus:border-primary"
              onChange={(e) => handleFieldChange(e, setFieldValue, values)}
            />
            <ErrorMessage name="email" component="div" className="text-red-500" />
          </div>

          <div className="mb-6">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <Field
              as={Textarea}
              id="address"
              name="address"
              placeholder="Address"
              className="w-full p-2 border rounded-md focus:outline-none focus:border-primary"
              rows={4}
              onChange={(e) => handleFieldChange(e, setFieldValue, values)}
            />
            <ErrorMessage name="address" component="div" className="text-red-500" />
          </div>
        </form>
      )}
    </Formik>
  );
};

export default Orderform;
