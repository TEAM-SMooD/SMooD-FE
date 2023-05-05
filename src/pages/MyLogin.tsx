import React from "react";
import headerStyle from "../styles/HeaderStyle.module.css";
import main_logo from "../assets/main_logo.png";
import { useNavigate } from "react-router";
import kakao_login from "../assets/kakao_login.png";
import naver_login from "../assets/naver_login.png";
import google_login from "../assets/google_login.png";
const MyLogin = () => {
    const navigate = useNavigate();

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
                <div className={headerStyle.myTitle}>로그인</div>
                <div className={headerStyle.mySubTitle}>
                    로그인하고 스무디에서 유용한 창업 정보를 찾아보세요!
                </div>
                <div className={headerStyle.logoWrap}>
                    <a href={process.env.REACT_APP_KAKAO_AUTH_URL}>
                        <img
                            src={kakao_login}
                            style={{ width: "183px", height: "45px" }}
                        />
                    </a>
                    <a href={process.env.REACT_APP_KAKAO_AUTH_URL}>
                        <img
                            src={naver_login}
                            style={{ width: "183px", height: "45px" }}
                        />
                    </a>
                    <a href={process.env.REACT_APP_KAKAO_AUTH_URL}>
                        <img
                            src={google_login}
                            style={{ width: "183px", height: "45px" }}
                        />
                    </a>
                </div>
                {/* {!sessionStorage.getItem("userId") ? (
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <a href={process.env.REACT_APP_KAKAO_AUTH_URL}>
                            <img src={kakao_login} />
                        </a>
                    </div>
                ) : (
                    <div>
                        로그인 아이디 : {sessionStorage.getItem("userId")}
                    </div>
                )} */}
            </div>
        </>
    );
};
export default MyLogin;
