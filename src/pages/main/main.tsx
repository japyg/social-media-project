import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import { Post } from "./post";

export interface Post {
  id: string;
  title: string;
  description: string;
  username: string;
}

export const Main = () => {
  const postsRef = collection(db, "posts");
  const [postList, setPostList] = useState<Post[] | null>(null);

  const getPosts = async () => {
    const data = await getDocs(postsRef);

    setPostList(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Post[]
    );
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      {postList?.map((post) => (
        <Post post={post} />
      ))}
    </div>
  );
};
