import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CommunityStyle from "../styles/CommunityStyle.module.css";

const CommunityPostEach = (posts: any) => {
    const path = useLocation();
    const spliturl = path.pathname.split("/");
    const pathid = spliturl[spliturl.length - 1];
    const data = posts.posts.filter((e: any) => e.postId == pathid)[0];
    const navigate = useNavigate();
    const [newreply, setNewreply] = useState("");
    const [newrereply, setNewrereply] = useState("");
    const [comments, setComments] = useState([]);
    const [newrereplyN, setNewrereplyN] = useState(-1);
    const getComments = async () => {
        try {
            const commentsRes = await axios.get(
                `${process.env.REACT_APP_SERVER_URL}/comments/${pathid}`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            console.log("OCMMMENTS", commentsRes);
            setComments(commentsRes.data.body.result);
        } catch (err) {
            console.log("getcommentsErr", err);
        }
    };
    function onchangeNewreply(e: React.FormEvent<HTMLInputElement>) {
        setNewreply(e.currentTarget.value);
    }
    function onsubmitNewreply(e: React.FormEvent<HTMLInputElement>) {
        e.preventDefault();
        const postNewComment = async () => {
            try {
                const res = await axios.post(
                    `${
                        process.env.REACT_APP_SERVER_URL
                    }/comment/${sessionStorage.getItem("userId")}/${pathid}`,
                    {
                        contents: newreply,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                );
                window.location.replace(`/community/post/${pathid}`);
                return res;
            } catch (err) {
                console.log("postChatRoom ERR", err);
            }
        };
        postNewComment();
        setNewreply("");
    }
    function onchangeNewrereply(e: React.FormEvent<HTMLInputElement>) {
        setNewrereply(e.currentTarget.value);
    }
    function onsubmitNewrereply(
        e: React.FormEvent<HTMLInputElement>,
        newrereplyN: number
    ) {
        e.preventDefault();
        const postNewrereply = async () => {
            try {
                const res = await axios.post(
                    `${
                        process.env.REACT_APP_SERVER_URL
                    }/comment/reply/${sessionStorage.getItem(
                        "userId"
                    )}/${pathid}/${newrereplyN}`,
                    {
                        contents: newrereply,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                );
                window.location.replace(`/community/post/${pathid}`);
                console.log("대댓글", res);
                return res;
            } catch (err) {
                console.log("postChatRoom ERR", err);
            }
        };
        postNewrereply();
        setNewreply("");
    }
    const handleDeleteRereply = async (commentId: number) => {
        try {
            const res = await axios.delete(
                `${process.env.REACT_APP_SERVER_URL}/comment/${commentId}`, //댓글,대댓글 id 같이씀
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            window.location.replace("/community"); //새로고침
        } catch (err) {
            console.log("handleDeletePost ERR", err);
        }
        // 목록페이지로 navigate .. !?!
    };
    useEffect(() => {
        getComments();
    }, []);
    return (
        <>
            {data && comments && (
                <>
                    <div style={{ marginTop: "1rem" }}>
                        <div className={CommunityStyle.eachTopWrap}>
                            <div className={CommunityStyle.eachTitle}>
                                {data.title}
                            </div>
                            <div
                                className={CommunityStyle.eachWriter}
                                style={{
                                    position: "relative",
                                }}
                            >
                                <div style={{ width: "1.3rem" }}>👤</div>
                                <div className={CommunityStyle.eachWriterInfo}>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <div>{data.nickname}</div>
                                        <div
                                            className={CommunityStyle.storeTag}
                                        >
                                            {data.store}
                                        </div>
                                    </div>

                                    <div
                                        style={{
                                            fontSize: "0.7rem",
                                            color: "var(--grey)",
                                        }}
                                    >
                                        {data.date} {data.time}
                                    </div>
                                </div>
                                {sessionStorage.getItem("token") &&
                                    sessionStorage.getItem("nickname") ==
                                        data.nickname && (
                                        <div
                                            className={
                                                CommunityStyle.editDelete
                                            }
                                        >
                                            {/* <div onClick={() => {}}>
                                                        수정
                                                    </div> */}
                                            <div
                                                onClick={() =>
                                                    handleDeleteRereply(data.id)
                                                }
                                            >
                                                {" "}
                                                삭제
                                            </div>
                                        </div>
                                    )}
                            </div>
                        </div>
                        <div className={CommunityStyle.eachContentsWrap}>
                            <div className={CommunityStyle.eachContents}>
                                {data.contents}
                            </div>
                        </div>
                        <div className={CommunityStyle.eachReplyWrap}>
                            {comments.map((e: any, i: number) => (
                                <div
                                    key={i}
                                    className={CommunityStyle.eachReplyBox}
                                >
                                    <div
                                        className={CommunityStyle.eachWriter}
                                        style={{ position: "relative" }}
                                    >
                                        <div style={{ width: "1.3rem" }}>
                                            🗣️{" "}
                                        </div>
                                        <div
                                            className={
                                                CommunityStyle.eachWriterInfo
                                            }
                                        >
                                            <div>{e.nickname}</div>
                                            <div
                                                style={{
                                                    fontSize: "0.7rem",
                                                    color: "var(--grey)",
                                                }}
                                            >
                                                {e.date} {e.time}
                                            </div>
                                        </div>
                                        {sessionStorage.getItem("token") &&
                                            sessionStorage.getItem(
                                                "nickname"
                                            ) == e.nickname && (
                                                <div
                                                    className={
                                                        CommunityStyle.editDelete
                                                    }
                                                >
                                                    {/* <div onClick={() => {}}>
                                                        수정
                                                    </div> */}
                                                    <div
                                                        onClick={() =>
                                                            handleDeleteRereply(
                                                                e.id
                                                            )
                                                        }
                                                    >
                                                        {" "}
                                                        삭제
                                                    </div>
                                                </div>
                                            )}
                                    </div>

                                    <div
                                        className={
                                            CommunityStyle.eachReplyContents
                                        }
                                    >
                                        {e.contents}
                                    </div>
                                    <button
                                        className={CommunityStyle.rereplyBtn}
                                        onClick={() => {
                                            if (newrereplyN == e.id) {
                                                setNewrereplyN(-1);
                                            } else {
                                                setNewrereplyN(e.id);
                                            }
                                        }}
                                    >
                                        답글
                                    </button>
                                    {newrereplyN == e.id && (
                                        <div
                                            style={{
                                                padding: "10px 10px",
                                                borderTop:
                                                    "1px solid var(--linegrey)",
                                                background: "#f5f5f57a",
                                            }}
                                        >
                                            <div>
                                                {" "}
                                                ↳ 🫥{" "}
                                                {sessionStorage.getItem(
                                                    "nickname"
                                                )}
                                            </div>
                                            <div>
                                                <form
                                                    style={{
                                                        position: "relative",
                                                        marginLeft: "1rem",
                                                        paddingTop: "5px",
                                                    }}
                                                    onClick={() => {
                                                        if (
                                                            !sessionStorage.getItem(
                                                                "userId"
                                                            )
                                                        ) {
                                                            alert(
                                                                "로그인 페이지로 이동합니다"
                                                            );
                                                            navigate(
                                                                "/mylogin"
                                                            );
                                                        }
                                                    }}
                                                >
                                                    <input
                                                        className={
                                                            CommunityStyle.eachInputBox
                                                        }
                                                        type="text"
                                                        onChange={
                                                            onchangeNewrereply
                                                        }
                                                        value={newrereply}
                                                        placeholder={
                                                            sessionStorage.getItem(
                                                                "userId"
                                                            )
                                                                ? "댓글을 남겨주세요"
                                                                : "로그인 후 댓글을 남겨주세요"
                                                        }
                                                        disabled={
                                                            sessionStorage.getItem(
                                                                "userId"
                                                            ) == null
                                                        }
                                                    />
                                                    <button
                                                        onClick={(e: any) => {
                                                            onsubmitNewrereply(
                                                                e,
                                                                newrereplyN
                                                            );
                                                        }}
                                                        className={
                                                            CommunityStyle.eachButton
                                                        }
                                                        type="submit"
                                                    >
                                                        작성
                                                    </button>
                                                </form>
                                            </div>
                                            <div
                                                style={{
                                                    marginLeft: "1rem",
                                                    paddingTop: "5px",
                                                }}
                                            >
                                                {/* {ec.contents} */}
                                            </div>
                                        </div>
                                    )}
                                    {e.children &&
                                        e.children.map(
                                            (ec: any, ic: number) => (
                                                <div
                                                    key={ic}
                                                    style={{
                                                        padding: "10px 10px",
                                                        fontSize: "0.9rem",
                                                        borderTop:
                                                            "1px solid var(--linegrey)",
                                                        background: "#f5f5f57a",
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            justifyContent:
                                                                "space-between",
                                                        }}
                                                    >
                                                        {" "}
                                                        ↳ 🫥 {ec.nickname}
                                                        {sessionStorage.getItem(
                                                            "token"
                                                        ) &&
                                                            sessionStorage.getItem(
                                                                "nickname"
                                                            ) ==
                                                                ec.nickname && (
                                                                <div
                                                                    className={
                                                                        CommunityStyle.editDelete
                                                                    }
                                                                    style={{
                                                                        position:
                                                                            "relative",
                                                                    }}
                                                                >
                                                                    {/* <div
                                                                        onClick={() => {}}
                                                                    >
                                                                        수정
                                                                    </div> */}
                                                                    <div
                                                                        onClick={() =>
                                                                            handleDeleteRereply(
                                                                                ec.id
                                                                            )
                                                                        }
                                                                    >
                                                                        {" "}
                                                                        삭제
                                                                    </div>
                                                                </div>
                                                            )}
                                                    </div>
                                                    <div
                                                        style={{
                                                            marginLeft: "1rem",
                                                            paddingTop: "5px",
                                                        }}
                                                    >
                                                        {ec.contents}
                                                    </div>
                                                </div>
                                            )
                                        )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <form
                            className={CommunityStyle.eachForm}
                            onClick={() => {
                                if (!sessionStorage.getItem("userId")) {
                                    alert("로그인 페이지로 이동합니다");
                                    navigate("/mylogin");
                                }
                            }}
                        >
                            <input
                                className={CommunityStyle.eachInputBox}
                                type="text"
                                onChange={onchangeNewreply}
                                value={newreply}
                                placeholder={
                                    sessionStorage.getItem("userId")
                                        ? "댓글을 남겨주세요"
                                        : "로그인 후 댓글을 남겨주세요"
                                }
                                disabled={
                                    sessionStorage.getItem("userId") == null
                                }
                            />
                            <button
                                onClick={(e: any) => {
                                    onsubmitNewreply(e);
                                }}
                                className={CommunityStyle.eachButton}
                                type="submit"
                                disabled={
                                    sessionStorage.getItem("userId") == null ||
                                    newreply == ""
                                }
                            >
                                작성
                            </button>
                        </form>
                    </div>
                    <div
                        className={CommunityStyle.eachGoback}
                        onClick={() => navigate(-1)}
                    >
                        &lt; 목록으로
                    </div>
                </>
            )}
        </>
    );
};

export default CommunityPostEach;
