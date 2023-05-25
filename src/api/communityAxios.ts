import { useState } from "react";
import { customAxios } from "./customAxios";

export const getPosts = async () => {
    try {
        const res = await customAxios().get(`/posts`);
        console.log("getPosts res", res.data.body.result);
        return res.data.body.result; // [{…}, {…}]
    } catch (err) {
        console.log("getPostsERR", err);
    }
    return [];
};

export const getPostCategory = async (selectedCategory: number) => {
    try {
        const res = await customAxios().get(
            `/post/category/${selectedCategory}`
        );
        return res.data.body.result;
    } catch (err) {
        console.log("getcommentsErr", err);
    }
    return [];
};

export const postPost = async (
    writeCategory: number,
    writeContents: string,
    writeStore: string,
    writeTitle: string
) => {
    try {
        const res = await customAxios().post(
            `/post/${sessionStorage.getItem("userId")}`,
            {
                category: writeCategory,
                contents: writeContents,
                store: writeStore,
                title: writeTitle,
            }
        );
        window.location.replace("/community"); //새로고침
        return res;
    } catch (err) {
        console.log("postPost ERR", err);
    }
};

export const deletePost = async (postId: number) => {
    try {
        const res = await customAxios().delete(`/post/${postId}`);
        window.location.replace("/community"); //새로고침
    } catch (err) {
        console.log("handleDeletePost ERR", err);
    }
};

export const getComments = async (postId: string) => {
    try {
        const commentsRes = await customAxios().get(`/comments/${postId}`);
        console.log("getComments", commentsRes.data.body.result);
        return commentsRes.data.body.result;
    } catch (err) {
        console.log("getcommentsErr", err);
    }
    return [];
};

export const postComment = async (postId: string, newComment: string) => {
    try {
        const res = await customAxios().post(
            `/comment/${sessionStorage.getItem("userId")}/${postId}`,
            {
                contents: newComment,
            }
        );
        window.location.replace(`/community/post/${postId}`);
        return res;
    } catch (err) {
        console.log("postChatRoom ERR", err);
    }
};

export const postCommentReply = async (
    postId: string,
    commentId: number,
    newReply: string
) => {
    try {
        const res = await customAxios().post(
            `/comment/reply/${sessionStorage.getItem(
                "userId"
            )}/${postId}/${commentId}`,
            {
                contents: newReply,
            }
        );
        window.location.replace(`/community/post/${postId}`);
        console.log("대댓글", res);
        return res;
    } catch (err) {
        console.log("postChatRoom ERR", err);
    }
};

export const handleDeleteCR = async (commentId: number, postId: number) => {
    // 댓글 , 답글 수정 모두 같은 api사용
    try {
        const res = await customAxios().delete(
            `/comment/${commentId}` //댓글,대댓글 id 같이씀
        );
    } catch (err) {
        console.log("handleDeletePost ERR", err);
    }
    window.location.replace(`/community/post/${postId}`);
};
