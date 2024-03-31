"use client";
import { useState, useEffect } from "react";
import Spinner from "../Spinner";
import { useInView } from "react-intersection-observer";
import Comment from "./Comment";
import React from "react";
import getComments from "@/ServerActions/getComments";

export default function LoadMoreComments(props) {
  const { ref, inView } = useInView();
  const [renderSpinner, setRenderSpinner] = useState(true);

  const commentsFun = async () => {
    const nextPage = props.commentPageLoaded + 1;
    
    if (props.renderCommentSec) {
      const newCommentsData = await getComments(
        props.token,
        props.postId,
        props.userId,
        nextPage,
        props.newComments
      );
      props.setCommentPageLoaded((prevPage) => prevPage + 1);
      props.setCommentsData((prevComments) => [
        ...prevComments,
        ...newCommentsData,
      ]);
      if(!newCommentsData.length>0){
        setRenderSpinner(false);
      }
    }
  };

  useEffect(() => {
    if (inView) {
      commentsFun();
    }
  }, [inView, commentsFun]);

  return (
    <>
      {renderSpinner ? (
        <div ref={ref} className = "flex justify-center">
          <Spinner />
        </div>
      ) : (
        <h2>No More Comments</h2>
      )}
    </>
  );
}
