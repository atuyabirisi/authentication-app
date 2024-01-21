import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "../../store";
import { openSignUp } from "../slices/signup";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";

const schema = z.object({
  email: z.string().email({ message: "please provide a valid email" }),
  password: z
    .string()
    .min(3, { message: "password must have at least 3 characters" }),
});

type FormData = z.infer<typeof schema>;

function Login() {
  const dispatch: AppDispatch = useDispatch();
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const signIn = handleSubmit(() => {
    const values = getValues();
    axios
      .post("http://localhost:5000/api/auth/", { ...values })
      .then((token) => {
        localStorage.setItem("token", token.data);
        if (token.data) window.location.href = "/landingpage";
        reset();
      })
      .catch((error) => console.log(error));
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
            <h4>Welcome Back!</h4>
            <h5>Login</h5>
          </div>
          <form className="row" onSubmit={signIn}>
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
            <div className="mb-1">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                {...register("password")}
                type="password"
                id="password"
                className="form-control"
              />
              {errors.password && (
                <p className="text-danger">{errors.password.message}</p>
              )}
            </div>
            <div className="mb-4">
              <input className="form-check-input" type="checkbox" />
            </div>
            <div className="d-grid">
              <button className="btn btn-primary" type="submit">
                Login
              </button>
            </div>
          </form>
          <div className="my-3 d-flex justify-content-center">
            <p>
              Don't have an Account?{" "}
              <span>
                <a
                  href="#"
                  className="link-primary"
                  onClick={() => dispatch(openSignUp())}
                >
                  Create Account
                </a>
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
