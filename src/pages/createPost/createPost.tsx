import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

interface CreateFormData {
  title: string;
  description: string;
}

export const CreatePost = () => {
  const [user] = useAuthState(auth);

  const navigate = useNavigate();

  const schema = yup.object().shape({
    title: yup.string().required("Title is required."),
    description: yup.string().required("Description is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormData>({
    resolver: yupResolver(schema),
  });

  const postsRef = collection(db, "posts");

  const onCreatePost = async (data: CreateFormData) => {
    await addDoc(postsRef, {
      title: data.title,
      description: data.description,
      username: user?.displayName,
      userId: user?.uid,
    });
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit(onCreatePost)}>
      <input
        placeholder="Title..."
        {...register("title")}
        className="border-solid border-2 border-black-500"
      />
      <p className="text-rose-600">{errors.title?.message}</p>
      <textarea
        placeholder="Description..."
        {...register("description")}
        className="border-solid border-2 border-black-500"
      />
      <p className="text-rose-600">{errors.description?.message}</p>
      <input type="submit" className="border-solid border-2 border-black-500" />
    </form>
  );
};
