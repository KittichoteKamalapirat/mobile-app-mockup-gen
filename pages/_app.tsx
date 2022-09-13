import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { rrfProps } from "../src/firebase/config";
import store from "../src/redux/store";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Component {...pageProps} />
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default MyApp;
