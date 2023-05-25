import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CommunityStyle from "../styles/CommunityStyle.module.css";
import {
    getComments,
    postComment,
    postCommentReply,
    handleDeleteCR,
} from "../api/communityAxios";
import ic_user from "../assets/ic_user.png";
import ic_user2 from "../assets/ic_user2.png";

const CommunityPostEach = (posts: any) => {
    const spliturl = useLocation().pathname.split("/");
    const postId = spliturl[spliturl.length - 1];
    const data = posts.posts.filter((e: any) => e.postId == postId)[0];
    const navigate = useNavigate();
    const [newComment, setNewComment] = useState("");
    const [newReply, setNewReply] = useState("");
    const [comments, setComments] = useState([]);
    const [selectedCommentId, setSelectedCommentId] = useState(-1);

    function onchangeNewComment(e: React.FormEvent<HTMLInputElement>) {
        setNewComment(e.currentTarget.value);
    }
    function onsubmitNewComment(e: React.FormEvent<HTMLInputElement>) {
        e.preventDefault();
        postComment(postId, newComment); // 댓글작성
        setNewComment("");
    }
    function onchangeNewReply(e: React.FormEvent<HTMLInputElement>) {
        setNewReply(e.currentTarget.value);
    }
    function onsubmitNewReply(
        e: React.FormEvent<HTMLInputElement>,
        selectedCommentId: number
    ) {
        e.preventDefault();
        postCommentReply(postId, selectedCommentId, newReply); // 대댓글작성
        setNewReply("");
    }

    useEffect(() => {
        getComments(postId).then((e) => {
            setComments(e);
        });
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
                                <div style={{ width: "30px" }}>
                                    <img src={ic_user} />
                                </div>
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
                                                    console.log(
                                                        "each에서 게시글삭제아직안해쪙"
                                                    )
                                                }
                                            >
                                                {" "}
                                                글삭제
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
                                        <div style={{ width: "30px" }}>
                                            {sessionStorage.getItem(
                                                "nickname"
                                            ) == e.nickname ? (
                                                <img src={ic_user} />
                                            ) : (
                                                <img src={ic_user2} />
                                            )}{" "}
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
                                                        onClick={() => {
                                                            handleDeleteCR(
                                                                e.id,
                                                                e.postId
                                                            );
                                                        }}
                                                    >
                                                        {" "}
                                                        댓글삭제
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
                                            if (selectedCommentId == e.id) {
                                                setSelectedCommentId(-1);
                                            } else {
                                                setSelectedCommentId(e.id);
                                            }
                                        }}
                                    >
                                        답글
                                    </button>
                                    {selectedCommentId == e.id && (
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
                                                ↳{" "}
                                                <img
                                                    src={ic_user}
                                                    style={{ width: "1rem" }}
                                                />{" "}
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
                                                            onchangeNewReply
                                                        }
                                                        value={newReply}
                                                        placeholder={
                                                            sessionStorage.getItem(
                                                                "userId"
                                                            )
                                                                ? "답글을 남겨주세요"
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
                                                            onsubmitNewReply(
                                                                e,
                                                                selectedCommentId
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
                                        </div>
                                    )}
                                    {e.children &&
                                        e.children.map(
                                            (ec: any, ic: number) => (
                                                <div
                                                    key={ic}
                                                    className={
                                                        CommunityStyle.replyWrap
                                                    }
                                                >
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            justifyContent:
                                                                "space-between",
                                                        }}
                                                    >
                                                        <div>
                                                            {" "}
                                                            ↳{" "}
                                                            {sessionStorage.getItem(
                                                                "nickname"
                                                            ) == ec.nickname ? (
                                                                <img
                                                                    src={
                                                                        ic_user
                                                                    }
                                                                    style={{
                                                                        width: "1rem",
                                                                    }}
                                                                />
                                                            ) : (
                                                                <img
                                                                    src={
                                                                        ic_user2
                                                                    }
                                                                    style={{
                                                                        width: "1rem",
                                                                    }}
                                                                />
                                                            )}{" "}
                                                            {ec.nickname}
                                                            <div
                                                                className={
                                                                    CommunityStyle.replyDatetime
                                                                }
                                                            >
                                                                {ec.date}{" "}
                                                                {ec.time}
                                                            </div>
                                                        </div>

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
                                                                        onClick={() => {
                                                                            handleDeleteCR(
                                                                                ec.id,
                                                                                ec.postId
                                                                            );
                                                                        }}
                                                                    >
                                                                        {" "}
                                                                        답글삭제
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
                                onChange={onchangeNewComment}
                                value={newComment}
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
                                    onsubmitNewComment(e);
                                }}
                                className={CommunityStyle.eachButton}
                                type="submit"
                                disabled={
                                    sessionStorage.getItem("userId") == null ||
                                    newComment == ""
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
