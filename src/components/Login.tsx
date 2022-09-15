import { ReactElement } from "react";
import { signInWithGoogle } from "../firebase/client";

interface Props {}

export default function Login({}: Props): ReactElement {
  return (
    <div>
      <button onClick={() => signInWithGoogle()}>Sign in with Google</button>
    </div>
  );
}
