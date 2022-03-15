import { SyncOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../context";
import AuthContext from "../context/authContext";
import useForm from "../helpers/useForms";
import Link from "next/link";

const Login = () => {
  // protect login page from logged in user
  const { state, dispatch } = useContext(AuthContext);
  const { user, login, error } = useContext(AuthContext);
  const router = useRouter();

  // If User is logged in, push to start page
  useEffect(() => {
    if (user !== null) {
      router.push("/");
    }
  }, [user]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const { inputs, handleChange } = useForm({
    email: "john@hallo.de",
    password: "aaaaaa",
  });

  // initializing loading state
  const [loading, setLoading] = useState(false);

  // Submit Function for Logging in
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // frontend form validation
    if (!inputs.email) {
      toast.error("Bitte gib eine Email an");
    }

    if (!inputs.password) {
      toast.error("Bitte gib ein Passwort an");
    }

    // request to server
    login(inputs.email, inputs.password);
    setLoading(false);
  };

  return (
    <main>
      <section className="p-0 d-flex align-items-center position-relative overflow-hidden">
        <div className="container-fluid">
          <div className="row">
            {/* <!-- left --> */}
            <div className="col-12 col-lg-6 d-md-flex align-items-center justify-content-center bg-primary bg-opacity-10 vh-lg-100">
              <div className="p-3 p-lg-5">
                {/* <!-- Title --> */}
                <div className="text-center">
                  <h2 className="fw-bold">Welcome to our largest community</h2>
                  <p className="mb-0 h6 fw-light">
                    Let's learn something new today!
                  </p>
                </div>
                {/* <!-- SVG Image --> */}
                <img src="/element/02.svg" className="mt-5" alt="" />
                {/* <!-- Info --> */}
                <div className="d-sm-flex mt-5 align-items-center justify-content-center">
                  {/* <!-- Avatar group --> */}
                  <ul className="avatar-group mb-2 mb-sm-0">
                    <li className="avatar avatar-sm">
                      <img
                        className="avatar-img rounded-circle"
                        src="avatar/01.jpg"
                        alt="avatar"
                      />
                    </li>
                    <li className="avatar avatar-sm">
                      <img
                        className="avatar-img rounded-circle"
                        src="/avatar/02.jpg"
                        alt="avatar"
                      />
                    </li>
                    <li className="avatar avatar-sm">
                      <img
                        className="avatar-img rounded-circle"
                        src="/avatar/01.jpg"
                        alt="avatar"
                      />
                    </li>
                    <li className="avatar avatar-sm">
                      <img
                        className="avatar-img rounded-circle"
                        src="/avatar/04.jpg"
                        alt="avatar"
                      />
                    </li>
                  </ul>
                  {/* <!-- Content --> */}
                  <p className="mb-0 h6 fw-light ms-0 ms-sm-3">
                    4k+ Students joined us, now it's your turn.
                  </p>
                </div>
              </div>
            </div>

            {/* <!-- Right --> */}
            <div className="col-12 col-lg-6 m-auto">
              <div className="row my-5">
                <div className="col-sm-10 col-xl-8 m-auto">
                  {/* <!-- Title --> */}
                  <span className="mb-0 fs-1">👋</span>
                  <h1 className="fs-2">Login into Eduport!</h1>
                  <p className="lead mb-4">
                    Nice to see you! Please log in with your account.
                  </p>

                  {/* <!-- Form START --> */}
                  <form onSubmit={handleSubmit}>
                    {/* <!-- Email --> */}
                    <div className="mb-4">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
                        Email address *
                      </label>
                      <div className="input-group input-group-lg">
                        <span className="input-group-text bg-light rounded-start border-0 text-secondary px-3">
                          <i className="bi bi-envelope-fill"></i>
                        </span>
                        <input
                          type="email"
                          name="email"
                          value={inputs.email}
                          onChange={handleChange}
                          className="form-control border-0 bg-light rounded-end ps-1"
                          placeholder="E-mail"
                          id="exampleInputEmail1"
                        />
                      </div>
                    </div>
                    {/* <!-- Password --> */}
                    <div className="mb-4">
                      <label htmlFor="nputPassword5" className="form-label">
                        Password *
                      </label>
                      <div className="input-group input-group-lg">
                        <span className="input-group-text bg-light rounded-start border-0 text-secondary px-3">
                          <i className="fas fa-lock"></i>
                        </span>
                        <input
                          type="password"
                          name="password"
                          value={inputs.password}
                          onChange={handleChange}
                          className="form-control border-0 bg-light rounded-end ps-1"
                          placeholder="password"
                          id="inputPassword5"
                        />
                      </div>
                      <div id="passwordHelpBlock" className="form-text">
                        Your password must be 8 characters at least
                      </div>
                    </div>
                    {/* <!-- Check box --> */}
                    <div className="mb-4 d-flex justify-content-between mb-4">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="exampleCheck1"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="exampleCheck1"
                        >
                          Remember me
                        </label>
                      </div>
                      <div className="text-primary-hover">
                        <Link href="/forgot-password">
                          <a className="text-secondary">
                            <u>Passwort vergessen?</u>
                          </a>
                        </Link>
                      </div>
                    </div>
                    {/* <!-- Button --> */}
                    <div className="align-items-center mt-0">
                      <div className="d-grid">
                        <button
                          className="btn btn-primary mb-0"
                          type="submit"
                          disabled={
                            !inputs.email || !inputs.password || loading
                          }
                        >
                          {loading && <SyncOutlined spin />} Login
                        </button>
                      </div>
                    </div>
                  </form>
                  {/* <!-- Form END --> */}

                  {/* <!-- Social buttons and divider --> */}
                  <div className="row">
                    {/* <!-- Divider with text --> */}
                    <div className="position-relative my-4">
                      <hr />
                      <p className="small position-absolute top-50 start-50 translate-middle bg-body px-5">
                        Or
                      </p>
                    </div>

                    {/* <!-- Social btn --> */}
                    <div className="col-xxl-6 d-grid">
                      <a href="#" className="btn bg-google mb-2 mb-xxl-0">
                        <i className="fab fa-fw fa-google text-white me-2"></i>
                        Login with Google
                      </a>
                    </div>
                    {/* <!-- Social btn --> */}
                    <div className="col-xxl-6 d-grid">
                      <a href="#" className="btn bg-facebook mb-0">
                        <i className="fab fa-fw fa-facebook-f me-2"></i>Login
                        with Facebook
                      </a>
                    </div>
                  </div>

                  {/* <!-- Sign up link --> */}
                  <div className="mt-4 text-center">
                    <span>
                      Don't have an account?{" "}
                      <a href="sign-up.html">Signup here</a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
