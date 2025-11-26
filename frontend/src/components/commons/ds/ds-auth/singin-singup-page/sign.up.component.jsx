import React from "react";
import DSButtonComponent from "../../ds-button/ds-button.component";
import DSFormInputComponent from "../../ds-input/ds-input.component";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../../../redux/authSlice";

const SignUpComponent = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Campo requerido"),
      email: Yup.string()
        .email("Email sin formato correcto")
        .required("Campo requerido"),
      password: Yup.string()
        .min(4, "Password must be at least 4 characters")
        .required("Campo requerido"),
      confirmPassword: Yup.string()
        .min(4, "Password must be at least 4 characters")
        .required("Campo requerido"),
    }),
    onSubmit: (values) => {
      dispatch(
        registerUser({
          name: values.name,
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
        })
      );
    },
  });

  return (
    <div className="sign-in-up-page">
      <div className="title">
        <span>Registrate con tu email y clave</span>
      </div>

      <form className="content" onSubmit={formik.handleSubmit}>
        <DSFormInputComponent
          formik={formik}
          name="name"
          label="Nombre"
          autoFocus
        />

        <DSFormInputComponent formik={formik} name="email" label="Email" />

        <DSFormInputComponent
          formik={formik}
          name="password"
          label="Password"
        />

        <DSFormInputComponent
          formik={formik}
          name="confirmPassword"
          label="Confirme la password"
        />

        <div className="buttons">
          <DSButtonComponent type="submit">Registrarse</DSButtonComponent>
        </div>
      </form>
    </div>
  );
};

export default SignUpComponent;
