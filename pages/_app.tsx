import "../styles/globals.css";
import type { AppProps } from "next/app";
import store from "../src/redux/store";
import { CloudinaryContext } from "cloudinary-react";
import { Provider } from "react-redux";

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
