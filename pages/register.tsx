import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../src/components/Buttons/Button";
import LinkButton from "../src/components/Buttons/LinkButton";
import Layout from "../src/components/layouts/Layout";
import { auth } from "../src/firebase/client";

enum FormNames {
  USERNAME = "username",
  EMAIL = "email",
  PASSWORD = "password",
  CONFIRM_PASSWORD = "confirmPassword",
}

interface FormValues {
  [FormNames.USERNAME]: string;
  [FormNames.EMAIL]: string;
  [FormNames.PASSWORD]: string;
  [FormNames.CONFIRM_PASSWORD]: string;
}

interface UserError {
  key?: string | null | undefined;
  message?: string;
}

const defaultValues: FormValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
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
      createUserWithEmailAndPassword(auth, data.email, data.password).then(
        (userCredential) => {
          const user = userCredential.user;
          console.log("user", user);
        }
      );
    } catch (error) {
      console.log("⛔  error registering");
    }
  };

  return (
    <Layout alignItems="items-center">
      <div className="w-3/4">
        <p>Create Account</p>
        <div className="mt-2">
          <p>Username</p>
          <div>
            <input
              {...register("username", { required: true })}
              placeholder="Type title"
            />
          </div>

          {errors.username ? <p>This is required.</p> : null}
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

        <div className="mt-2">
          <p className="text-white">Confirm Password</p>

          <div className="items-end">
            <div>
              <input
                {...register("confirmPassword", { required: true })}
                placeholder="Type title"
              />
            </div>
          </div>

          {errors.confirmPassword && <p>Password does not match.</p>}
        </div>

        <div className="mt-6">
          <Button label="Create account" onClick={handleSubmit(onSubmit)} />
        </div>

        <div className="flex-row justify-center mt-2">
          <p>Already have an account? </p>
          <LinkButton label="Log in" href="/login" />
        </div>
      </div>
    </Layout>
  );
};

export default Register;
