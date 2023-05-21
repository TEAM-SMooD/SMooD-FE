import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { useNavigate } from "react-router-dom";
import { STtitle, STcontentWrap } from "../styles/ReportLayoutST";
import CommunityMain from "../components/CommuityMain";
import { useParams } from "react-router-dom";
import CommunityPostEach from "../components/CommuityPostEach";
import Chat from "../components/Chat";
import axios from "axios";

const dummy = {
    posts: [
        {
            postId: 1,
            userId: 1,
            name: "이사장",
            store: "카페",
            title: "카페창업후기",
            contents:
                "ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ. 본문이 길어요 길ㄹ릴ㄹㄹㄹㄹㄹㄹ어",
            category: "자유",
            dateTime: "2023-05-18 16:53",
            reply: [
                {
                    replyUserId: 2,
                    replyName: "ss",
                    replyContents: "ㄱㅅㄱㅅ",
                    replyDateTime: "2023-05-18 16:53",
                },
            ],
        },
        {
            postId: 2,
            userId: 2,
            name: "김사장",
            store: "패스트푸드",
            title: "알바괌",
            contents:
                "ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ",
            category: "홍보",
            dateTime: "2023-05-18 16:53",
            reply: [
                {
                    replyUserId: 2,
                    replyName: "ss",
                    replyContents: "ㄱㅅㄱㅅ",
                    replyDateTime: "2023-05-18 16:53",
                },
                {
                    replyUserId: 4,
                    replyName: "sk",
                    replyContents: "?SD?D?S",
                    replyDateTime: "2023-05-18 16:53",
                },
            ],
        },
        {
            postId: 3,
            userId: 3,
            name: "박사장",
            store: "카페",
            title: "카페창업후기3",
            contents:
                "ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ",
            category: "홍보",
            dateTime: "2023-05-18 16:53",
            reply: [
                {
                    replyUserId: 2,
                    replyName: "ss",
                    replyContents: "ㄱㅅㄱㅅ",
                    replyDateTime: "2023-05-18 16:53",
                },
            ],
        },
    ],
};
const Community = () => {
    const [postall, setPostall] = useState([]);
    const useparam = useParams();

    // GET data from server
    const getPosts = async () => {
        try {
            const res = await axios.get(
                `${process.env.REACT_APP_SERVER_URL}/posts`
            );
            console.log("getPosts res", res.data.body.result);
            setPostall(res.data.body.result);
        } catch (err) {
            console.log("getPostsERR", err);
        }
    };
    useEffect(() => {
        getPosts();
    }, []);

    return (
        <>
            <Layout idx={4}>
                <STcontentWrap>
                    {useparam.postid ? (
                        postall && <CommunityPostEach posts={postall} />
                    ) : (
                        <>
                            <STtitle>커뮤니티</STtitle>
                            <Chat />
                            {postall && <CommunityMain posts={postall} />}
                        </>
                    )}
                </STcontentWrap>
            </Layout>
        </>
    );
};
export default Community;
