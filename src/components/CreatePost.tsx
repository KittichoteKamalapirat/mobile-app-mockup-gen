import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createPost } from "../redux/slices/postsReducer";

interface Props {}

enum FormNames {
  TITLE = "title",
  BODY = "body",
}

interface FormValues {
  [FormNames.TITLE]: string;
  [FormNames.BODY]: string;
}

const defaultValues = {
  id: "",
  title: "",
  body: "",
};

FormNames;
const CreatePost = ({}: Props) => {
  const dispatch = useDispatch();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    dispatch(createPost(data));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            {...register("title", { required: true })}
            placeholder="Type title"
          />
        </div>

        <div>
          <input placeholder="Type body" {...register("body")} />
        </div>

        {errors.title && <span>This field is required</span>}

        <input type="submit" />
      </form>
    </div>
  );
};
export default CreatePost;
