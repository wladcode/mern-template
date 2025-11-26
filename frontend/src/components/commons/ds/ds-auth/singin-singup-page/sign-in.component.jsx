import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useDispatch } from "react-redux";

//import { actions as authActions } from "../../../../../redux/auth/auth-reducer";

import DSButtonComponent from "../../ds-button/ds-button.component";
import DSFormInputComponent from "../../ds-input/ds-input.component";
import { useNavigate } from "react-router";
import { signInWithEmailPassword } from "../../../../../redux/authSlice";

const SignInComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email sin formato correcto")
        .required("Campo requerido"),
      password: Yup.string()
        .min(4, "Password must be at least 4 characters")
        .required("Campo requerido"),
    }),
    onSubmit: (values) => {
      dispatch(
        signInWithEmailPassword({
          email: values.email,
          password: values.password,
          navigate,
        })
      );
    },
  });

  return (
    <div className="sign-in-up-page">
      <div className="title">
        <span>Ingresa con tu email y clave</span>
      </div>

      <form className="content" onSubmit={formik.handleSubmit}>
        <DSFormInputComponent
          formik={formik}
          name="email"
          label="Email"
          autoFocus
        />

        <DSFormInputComponent
          formik={formik}
          name="password"
          label="Password"
        />

        <div className="buttons">
          <DSButtonComponent type="submit">Ingresar</DSButtonComponent>
        </div>
        {false && (
          <>
            <div className="text-divider">o </div>
            <div className="buttons"></div>

            <div className="text-divider">o Firebase</div>

            <div className="buttons-sn"></div>
          </>
        )}
      </form>
    </div>
  );
};

export default SignInComponent;
