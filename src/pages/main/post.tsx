import React, { useEffect, useState } from "react";
import { Post as IPost } from "./main";
import { db, auth } from "../../config/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

interface Props {
  post: IPost;
}

interface Like {
  userId: string;
  likeId: string;
}

export const Post = (props: Props) => {
  const { post } = props;

  const [likesAmount, setLikesAmount] = useState<Like[] | null>(null);

  const [user] = useAuthState(auth);

  const likesRef = collection(db, "likes");

  const likesDoc = query(likesRef, where("postId", "==", post.id));

  const getLikes = async () => {
    const data = await getDocs(likesDoc);

    setLikesAmount(
      data.docs.map((doc) => ({
        userId: doc.data().userId,
        likeId: doc.id,
      }))
    );
  };

  const addLike = async () => {
    try {
      const newDoc = await addDoc(likesRef, {
        userId: user?.uid,
        postId: post.id,
      });
      if (user) {
        setLikesAmount((prev) =>
          prev
            ? [...prev, { userId: user.uid, likeId: newDoc.id }]
            : [{ userId: user.uid, likeId: newDoc.id }]
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeLike = async () => {
    try {
      const likeToDeleteQuery = query(
        likesRef,
        where("postId", "==", post.id),
        where("userId", "==", user?.uid)
      );

      const likeToDeleteData = await getDocs(likeToDeleteQuery);

      const likeID = likeToDeleteData.docs[0].id;

      const likeToDelete = doc(db, "likes", likeID);
      await deleteDoc(likeToDelete);

      if (user) {
        setLikesAmount(
          (prev) => prev && prev.filter((like) => like.likeId !== likeID)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const hasUserLiked = likesAmount?.find((like) => like.userId === user?.uid);

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <div>
      <div>@{post.username.split(" ")[0]}</div>
      <div className="text-2xl font-bold">{post.title}</div>
      <div className="mb-8">
        <div>{post.description}</div>
        <button
          onClick={hasUserLiked ? removeLike : addLike}
          className="border-2 w-10 bg-blue-100 hover:bg-white"
        >
          {hasUserLiked ? <>&#128078;</> : <>&#128077;</>}
        </button>
        {likesAmount && <div>Likes: {likesAmount.length}</div>}
      </div>
    </div>
  );
};
