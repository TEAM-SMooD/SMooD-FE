import React from "react";
import headerStyle from "../styles/HeaderStyle.module.css";
import main_logo from "../assets/main_logo.png";
import { useNavigate } from "react-router";

const Mypage = () => {
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
                글쎄마이페이지엔,, 저장한거 그런거
            </div>
        </>
    );
};
export default Mypage;
