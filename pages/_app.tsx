import { CloudinaryContext } from "cloudinary-react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../src/redux/store";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  console.log(process.env);
  console.log("test");
  return (
    <Provider store={store}>
      <CloudinaryContext cloudName="mockx">
        <Component {...pageProps} />
      </CloudinaryContext>
    </Provider>
  );
}

export default MyApp;
