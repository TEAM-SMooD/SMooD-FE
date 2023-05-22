import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { useNavigate } from "react-router-dom";
import { STtitle, STcontentWrap } from "../styles/ReportLayoutST";
import CommunityMain from "../components/CommuityMain";
import { useParams } from "react-router-dom";
import CommunityPostEach from "../components/CommuityPostEach";
import Chat from "../components/Chat";
import axios from "axios";
import useTitle from "../hooks/useTitle";

const Community = () => {
    const changeTitle = useTitle("");
    useEffect(() => {
        changeTitle("SMooD - 커뮤니티");
    });
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
