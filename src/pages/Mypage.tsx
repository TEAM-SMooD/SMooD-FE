import React, { useEffect, useState } from "react";
import headerStyle from "../styles/HeaderStyle.module.css";
import main_logo from "../assets/main_logo.png";
import { useNavigate } from "react-router";
import axios from "axios";

const Mypage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        let params = new URL(document.URL).searchParams;
        let token = params.get("token");
        const postCode = async () => {
            try {
                const res = await axios.get(
                    `${process.env.REACT_APP_SERVER_URL}/api/users`,
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
                sessionStorage.setItem("userId", res.data.body.user.userId);
                sessionStorage.setItem("userName", res.data.body.user.username);
                navigate("/mypage"); //주소창에 토큰보이던거 지우려고 다시 페이지이동
            } catch (err) {
                console.log("postCODEERR", err);
            }
        };
        postCode();
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
                글쎄마이페이지엔,, 저장한거 그런거
            </div>
        </>
    );
};
export default Mypage;
