import React, { useEffect, useState } from "react";
import headerStyle from "../styles/HeaderStyle.module.css";
import main_logo from "../assets/main_logo.png";
import { useNavigate } from "react-router";
import axios from "axios";

const Mypage = () => {
    const navigate = useNavigate();
    const [nickname, setNickname] = useState("");
    console.log(nickname);
    const putNickname = async () => {
        try {
            const resnickname = await axios.put(
                `${process.env.REACT_APP_SERVER_URL}/user`,
                {
                    nickname: nickname,
                },
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            sessionStorage.setItem("nickname", nickname);
        } catch (err) {
            console.log("PUTERR", err);
        }
    };
    function handleSubmitInput(e: React.FormEvent<HTMLInputElement>) {
        e.preventDefault();
        putNickname();
        navigate("/concept");
    }
    useEffect(() => {
        let params = new URL(document.URL).searchParams;
        let token = params.get("token");
        const postLogin = async () => {
            try {
                const res = await axios.get(
                    `${process.env.REACT_APP_SERVER_URL}/users`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log(res);
                if (token) {
                    sessionStorage.setItem("token", token);
                }
                sessionStorage.setItem("userId", res.data.body.result.userSeq);
                sessionStorage.setItem(
                    "userName",
                    res.data.body.result.username
                );
                sessionStorage.setItem(
                    "nickname",
                    res.data.body.result.nickname
                );
                setNickname(res.data.body.result.nickname);
                navigate("/mypage"); //주소창에 토큰보이던거 지우려고 다시 페이지이동
            } catch (err) {
                console.log("postLogin_ERR", err);
            }
        };
        postLogin();
    }, []);
    return (
        <>
            <header className={headerStyle.myHeader}>
                <div className={headerStyle.pointer}>
                    <img
                        src={main_logo}
                        className={headerStyle.logo}
                        onClick={() => navigate("/")}
                    />
                </div>
            </header>
            <div className={headerStyle.myWrap}>
                <div className={headerStyle.myTitle}>닉네임 설정</div>
                <div className={headerStyle.mySubTitle}>
                    커뮤니티 이용을 위해 닉네임을 만들어주세요!
                </div>
                <div>
                    <div>
                        <form className={headerStyle.nickname}>
                            <input
                                className={headerStyle.nicknameInput}
                                type="text"
                                value={nickname}
                                placeholder={nickname}
                                onChange={(e: any) =>
                                    setNickname(e.currentTarget.value)
                                }
                            />
                            <button
                                className={headerStyle.nicknameBtn}
                                type="submit"
                                onClick={(e: any) => handleSubmitInput(e)}
                                disabled={nickname == ""}
                            >
                                저장
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Mypage;
