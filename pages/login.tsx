import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../src/components/Buttons/Button";
import Layout from "../src/components/layouts/Layout";
import { signInWithEmailAndPassword } from "firebase/auth";
import LinkButton from "../src/components/Buttons/LinkButton";

enum FormNames {
  EMAIL = "email",
  PASSWORD = "password",
}

interface FormValues {
  email: string;
  password: string;
}
interface UserError {
  key?: string | null | undefined;
  message?: string;
}

const defaultValues: FormValues = {
  email: "",
  password: "",
};

const Register = () => {
  console.log("register screen");
  const [passwordIsShown, setPasswordIsShown] = useState(false);

  const [genericErrorMessage, setGenericErrorMessage] = useState("");
  const {
    control,
    handleSubmit,
    setError,
    watch,
    register,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const togglepasswordIsShown = () => {
    setPasswordIsShown(!passwordIsShown);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
    } catch (error) {
      console.log("⛔  error registering");
    }
  };

  return (
    <Layout alignItems="items-center">
      <div className="w-3/4">
        <p>Create Account</p>
        <div className="mt-2">
          <p>Email</p>
          <div>
            <input
              {...register("email", { required: true })}
              placeholder="Type title"
            />
          </div>

          {errors.email ? <p>This is required.</p> : null}
        </div>

        <div className="mt-2">
          <p>Email</p>
          <div>
            <input
              {...register("email", { required: true })}
              placeholder="Type title"
            />
          </div>
          {errors.email ? (
            <p className="p-grey-0">{errors.email?.message}</p>
          ) : null}
        </div>

        <div className="mt-2">
          <p className="p-white">Password</p>

          <div>
            <input
              {...register("password", { required: true })}
              placeholder="Type title"
            />
          </div>

          {errors.password && <p>This is required.</p>}
        </div>

        <div className="mt-6">
          <Button label="Create account" onClick={handleSubmit(onSubmit)} />
        </div>

        <div className="flex-row justify-center mt-2">
          <p>Don&apos;t have an account?</p>
          <LinkButton label="Sign up" href="/register" />
        </div>
      </div>
    </Layout>
  );
};

export default Register;
