import "../styles/globals.css";
import "../styles/style.css";
import { Navigation } from "../components/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "../context";
import { AuthProvider } from "../context/authContext";

function MyApp({ Component, pageProps, children }) {
  return (
    <AuthProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
