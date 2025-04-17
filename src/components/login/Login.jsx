import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/features/authSlice';

const Login = () => {

  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Must be a valid email")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Must contain at least 8 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: async(values, {resetForm}) => {
      try {
         console.log("Login form submitted:", values);
         const action =await dispatch(loginUser(values));

          if (loginUser.fulfilled.match(action)) {
                   resetForm(); // Reset the form fields on success.
                 }
                 
      } catch (error) {
           console.log("Error", error)        
      }
      

      // Add API call here
    }
  });

  return (
    <div className="flex items-center justify-center bg-gray-100 h-screen">
      <form
        onSubmit={formik.handleSubmit}
        className="w-[400px] bg-white rounded-xl shadow-lg p-10 space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-blue-600">Login to Your Account</h2>

        <div className="flex flex-col">
          <label htmlFor="email" className="text-gray-700 font-medium">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="border border-gray-300 rounded-md px-4 py-2 mt-1 focus:ring-2 focus:ring-blue-400 outline-none"
          />
          {formik.touched.email && formik.errors.email && (
            <span className="text-red-500 text-sm">{formik.errors.email}</span>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="text-gray-700 font-medium">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="border border-gray-300 rounded-md px-4 py-2 mt-1 focus:ring-2 focus:ring-blue-400 outline-none"
          />
          {formik.touched.password && formik.errors.password && (
            <span className="text-red-500 text-sm">{formik.errors.password}</span>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Login
        </button>

        <div className="text-center text-sm text-gray-500 mt-4">
          Don't have an account? <a href="/signup" className="text-blue-600 hover:underline">Sign up</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
