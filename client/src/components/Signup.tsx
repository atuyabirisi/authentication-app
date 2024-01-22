import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { backToLogin } from "../slices/signup";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "../../store";
import { z } from "zod";
import axios from "axios";

const schema = z
  .object({
    email: z.string().email({ message: "please provide a valid email" }),
    username: z.string().min(3),
    password: z
      .string()
      .min(6, { message: "password must have at least 6 characters" }),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password == data.confirmPassword, {
    message: "passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const {
    register,
    getValues,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const signUp = handleSubmit(() => {
    const values = getValues();
    console.log({ ...values });
    axios
      .post("http://localhost:3000/api/signup/", { ...values })
      .then((res) => {
        if (res.status === 200) window.location.href = "/verification";
        reset();
      })
      .catch((errors) => console.log(errors));
  });

  return (
    <>
      <div className="d-flex align-items-center vh-100 bg-warning">
        <div
          className="mw-25 mx-auto p-3 bg-light border border-1 rounded"
          style={{
            maxWidth: "425px",
          }}
        >
          <div className="d-flex flex-column align-items-center mb-4">
            <h5>Create a Logrl Account</h5>
          </div>
          <form className="row" onSubmit={signUp}>
            <div className="mb-4">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                {...register("email")}
                type="text"
                id="email"
                className="form-control"
              />
              {errors.email && (
                <p className="text-danger">{errors.email.message}</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                {...register("username")}
                type="text"
                id="username"
                className="form-control"
              />
              {errors.username && (
                <p className="text-danger">{errors.username.message}</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                id="password"
                className="form-control"
              />
              {errors.password && (
                <p className="text-danger">{errors.password.message}</p>
              )}
            </div>
            <div className="">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                {...register("confirmPassword")}
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                className="form-control"
              />
              {errors.confirmPassword && (
                <p className="text-danger">{errors.confirmPassword.message}</p>
              )}
            </div>
            <div className="mb-4">
              <input
                className="form-check-input"
                type="checkbox"
                onChange={() => setShowPassword(!showPassword)}
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Create Account
              </button>
            </div>
          </form>
          <div className="my-1 d-flex justify-content-center">
            <p>
              Don't have an Account?{" "}
              <span>
                <a
                  href="#"
                  className="link-primary"
                  onClick={() => dispatch(backToLogin())}
                >
                  Login
                </a>
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
