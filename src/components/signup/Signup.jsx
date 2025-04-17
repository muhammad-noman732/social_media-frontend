import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../store/features/authSlice';
const Signup = () => {
   
     const dispatch = useDispatch();

    const validationSchema =  Yup.object({
        userName: Yup.string()
          .min(5, 'Must be at least 5 characters')
          .required('Required'),
        email: Yup.string()
          .email('Invalid email address')
          .required('Required'),
        password: Yup.string()
          .min(8, 'Must be at least 8 characters')
          .required('Required'),
        location: Yup.string().required('Required'),
      })

  const formik = useFormik({
    initialValues: {
      userName: '',
      email: '',
      password: '',
      location: '',
    },
    validationSchema, 
    onSubmit: async (values, { resetForm }) => {
      try {
        // Wait for the async signup action to complete.
        const action = await dispatch(registerUser(values));

        // Check if the action was fulfilled using the matcher
        if (registerUser.fulfilled.match(action)) {
                resetForm(); // Reset the form fields on success.
        }
      } catch (error) {
        console.error('Signup error:', error);
      }
    }
  });

  return (
    <div className="flex items-center justify-center h-screen bg-gray-400">
      <form 
        onSubmit={formik.handleSubmit} 
        className="w-[450px] bg-white shadow-lg rounded-xl p-10 space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-blue-600">Create Account</h2>

        <div className="flex flex-col">
          <label htmlFor="userName" className="text-gray-700 font-medium">Username</label>
          <input
            id="userName"
            name="userName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.userName}
            className="border border-gray-300 rounded-md px-4 py-2 mt-1 focus:ring-2 focus:ring-blue-400 outline-none"
          />
          {formik.touched.userName && formik.errors.userName ? (
            <div className="text-red-500 text-sm">{formik.errors.userName}</div>
          ) : null}
        </div>

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
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          ) : null}
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
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          ) : null}
        </div>

        <div className="flex flex-col">
          <label htmlFor="location" className="text-gray-700 font-medium">Location</label>
          <input
            id="location"
            name="location"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.location}
            className="border border-gray-300 rounded-md px-4 py-2 mt-1 focus:ring-2 focus:ring-blue-400 outline-none"
          />
          {formik.touched.location && formik.errors.location ? (
            <div className="text-red-500 text-sm">{formik.errors.location}</div>
          ) : null}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
