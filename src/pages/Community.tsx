import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { useNavigate } from "react-router-dom";
import { STtitle, STcontentWrap } from "../styles/ReportLayoutST";
import CommunityStyle from "../styles/CommunityStyle.module.css";
import CommunityMain from "../components/CommuityMain";
import { useParams } from "react-router-dom";
import CommunityPostEach from "../components/CommuityPostEach";

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
            reply: [
                {
                    replyUserId: 2,
                    replyName: "ss",
                    replyContents: "ㄱㅅㄱㅅ",
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
            reply: [
                {
                    replyUserId: 2,
                    replyName: "ss",
                    replyContents: "ㄱㅅㄱㅅ",
                },
                {
                    replyUserId: 4,
                    replyName: "sk",
                    replyContents: "?SD?D?S",
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
            reply: [
                {
                    replyUserId: 2,
                    replyName: "ss",
                    replyContents: "ㄱㅅㄱㅅ",
                },
            ],
        },
    ],
};
const Community = () => {
    // GET data from server
    const useparam = useParams();
    const [postid, setPostid] = useState(0);
    // useEffect(() => {
    //     setPostid(useparam.postid);
    //     console.log(useparam.postid, typeof useparam);
    // },[useparam.postid]);
    return (
        <>
            <Layout idx={4}>
                <STcontentWrap>
                    {useparam.postid ? (
                        <CommunityPostEach dummy={dummy.posts} />
                    ) : (
                        <>
                            <STtitle>커뮤니티</STtitle>
                            <div
                                style={{
                                    width: "fit-content",
                                    position: "absolute",
                                    right: "20%",
                                    top: "110px",
                                }}
                            >
                                채팅
                            </div>
                            <CommunityMain dummy={dummy.posts} />
                        </>
                    )}
                </STcontentWrap>
            </Layout>
        </>
    );
};
export default Community;
