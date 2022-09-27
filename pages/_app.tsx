import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import type { AppProps } from "next/app";
import store from "../src/redux/store";
import { CloudinaryContext } from "cloudinary-react";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { rrfProps } from "../src/firebase/config";
import store from "../src/redux/store";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <CloudinaryContext cloudName="mockx">
        <Component {...pageProps} />
      </CloudinaryContext>
    </Provider>
  );
}

export default MyApp;
