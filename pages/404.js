import Link from "next/link";
import React from "react";

const ErrorPage = () => {
  return (
    <main>
      <section className="pt-5">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              {/* <!-- Image --> */}
              <img
                src="assets/images/element/error404-01.svg"
                className="h-200px h-md-400px mb-4"
                alt=""
              />
              {/* <!-- Title --> */}
              <h1 className="display-1 text-danger mb-0">404</h1>
              {/* <!-- Subtitle --> */}
              <h2>Oh nein, etwas ist schief gelaufen!!</h2>
              {/* <!-- info --> */}
              <p className="mb-4">Es scheint, als hättest du dich verirrt</p>
              {/* <!-- Button --> */}
              <Link href="/">
                <a className="btn btn-primary mb-0">
                  Hier geht es zurück zur Startseite
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ErrorPage;
