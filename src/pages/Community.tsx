import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { STtitle, STcontentWrap } from "../styles/ReportLayoutST";
import CommunityMain from "../components/CommuityMain";
import { useParams } from "react-router-dom";
import CommunityPostEach from "../components/CommuityPostEach";
import Chat from "../components/Chat";
import useTitle from "../hooks/useTitle";
import { getPosts } from "../api/communityAxios";

const Community = () => {
    const changeTitle = useTitle("");
    useEffect(() => {
        changeTitle("SMooD - 커뮤니티");
    });

    const [postall, setPostall] = useState([]);
    const useparam = useParams();

    useEffect(() => {
        getPosts().then((e) => {
            setPostall(e);
        });
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
