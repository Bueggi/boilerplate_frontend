import { SyncOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import AuthContext from "../context/authContext";

const forgotPassword = () => {
  const { user } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const router = useRouter();

  useEffect(() => {
    user !== null && router.push("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APIURL}/forgotPassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      const { data, error } = await res.json();
      data && setSuccess(true);
      data && toast.info(data);
      error && toast.error(error);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast(error.error);
    }
  };

  const handlePasswordReset = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APIURL}/resetPassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            code,
            newPassword,
          }),
        }
      );

      const { data, error } = await res.json();

      error && toast.error(error);
      data && toast.success(data);
      setEmail("");
      setCode("");
      setNewPassword("");
      setLoading("");
    } catch (error) {
      setLoading(false);
      toast.error(error);
    }
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
                  <h2 className="fw-bold">Willkommen in unserer Community!</h2>
                  <p className="mb-0 h6 fw-light">
                    Lerne jeden Tag etwas Neues!
                  </p>
                </div>
                {/* <!-- SVG Image --> */}
                <img
                  src="assets/images/element/02.svg"
                  className="mt-5"
                  alt=""
                />
                {/* <!-- Info --> */}
                <div className="d-sm-flex mt-5 align-items-center justify-content-center">
                  <ul className="avatar-group mb-2 mb-sm-0">
                    <li className="avatar avatar-sm">
                      <img
                        className="avatar-img rounded-circle"
                        src="assets/images/avatar/01.jpg"
                        alt="avatar/"
                      />
                    </li>
                    <li className="avatar avatar-sm">
                      <img
                        className="avatar-img rounded-circle"
                        src="assets/images/avatar/02.jpg"
                        alt="avatar"
                      />
                    </li>
                    <li className="avatar avatar-sm">
                      <img
                        className="avatar-img rounded-circle"
                        src="assets/images/avatar/03.jpg"
                        alt="avatar"
                      />
                    </li>
                    <li className="avatar avatar-sm">
                      <img
                        className="avatar-img rounded-circle"
                        src="assets/images/avatar/04.jpg"
                        alt="avatar"
                      />
                    </li>
                  </ul>
                  {/* <!-- Content --> */}
                  <p className="mb-0 h6 fw-light ms-0 ms-sm-3">
                    4k+ Wissbegierige sind uns schon beigetreten
                  </p>
                </div>
              </div>
            </div>
            {/* <!-- Right --> */}
            <div className="col-12 col-lg-6 d-flex justify-content-center">
              <div className="row my-5">
                <div className="col-sm-10 col-xl-12 m-auto">
                  {/* <!-- Title --> */}
                  <span className="mb-0 fs-1">🤔</span>
                  <h1 className="fs-2">Passwort vergessen?</h1>
                  <h5 className="fw-light mb-4">
                    Mit welcher Email-Adresse hast du dich angemeldet?
                  </h5>

                  {/* <!-- Form START --> */}
                  <form onSubmit={success ? handlePasswordReset : handleSubmit}>
                    {/* <!-- Email --> */}
                    <div className="mb-4">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
                        Email *
                      </label>
                      <div className="input-group input-group-lg">
                        <span className="input-group-text bg-light rounded-start border-0 text-secondary px-3">
                          <i className="bi bi-envelope-fill"></i>
                        </span>
                        <input
                          type="email"
                          className="form-control border-0 bg-light rounded-end ps-1"
                          placeholder="E-mail"
                          id="exampleInputEmail1"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Show those fields only if the user has a valid password reset token */}
                    {success && (
                      <>
                        <div className="mb-4">
                          <label htmlFor="code" className="form-label">
                            Bestätigungscode *
                          </label>
                          <div className="input-group input-group-lg">
                            <span className="input-group-text bg-light rounded-start border-0 text-secondary px-3">
                              <i className="bi bi-envelope-fill"></i>
                            </span>
                            <input
                              type="text"
                              className="form-control border-0 bg-light rounded-end ps-1"
                              placeholder="Bestätigungscode"
                              id="code"
                              value={code}
                              onChange={(e) => setCode(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="mb-4">
                          <label htmlFor="newPassword" className="form-label">
                            Neues Passwort *
                          </label>
                          <div className="input-group input-group-lg">
                            <span className="input-group-text bg-light rounded-start border-0 text-secondary px-3">
                              <i className="bi bi-envelope-fill"></i>
                            </span>
                            <input
                              type="password"
                              className="form-control border-0 bg-light rounded-end ps-1"
                              placeholder="Neues Passwort"
                              id="newPassword"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                            />
                          </div>
                        </div>
                      </>
                    )}
                    {/* <!-- Button --> */}
                    <div className="align-items-center">
                      <div className="d-grid">
                        <button
                          className="btn btn-primary mb-0"
                          type="submit"
                          disabled={loading || !email}
                        >
                          {loading ? <SyncOutlined spin /> : " Reset password"}
                        </button>
                      </div>

                      <div className="mt-4 text-center">
                        <span>
                          <a
                            onClick={() => setSuccess(true)}
                            style={{ cursor: "pointer" }}
                          >
                            Ich habe schon einen Bestätigungscode
                          </a>
                        </span>
                      </div>
                    </div>
                  </form>
                  {/* <!-- Form END --> */}
                </div>
              </div>
              {/* <!-- Row END --> */}
            </div>
          </div>
          {/* //  <!-- Row END --> */}
        </div>
      </section>
    </main>
  );
};

export default forgotPassword;
