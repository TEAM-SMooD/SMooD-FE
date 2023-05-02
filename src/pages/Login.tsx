import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);
    const href = window.location.href;
    let params = new URL(document.URL).searchParams;
    let code = params.get("code");
    const navigate = useNavigate();
    useEffect(() => {
        const postCode = async () => {
            try {
                setError(null);
                setLoading(true);
                const res = await axios.get(
                    `${process.env.REACT_APP_SERVER_URL}/login/oauth/kakao`,
                    {
                        params: {
                            code: code,
                        },
                    }
                );
                console.log(res);
                sessionStorage.setItem("kakaoToken", res.data.accessToken);
                sessionStorage.setItem("userId", res.data.id);
                navigate(-1);
            } catch (err) {
                setError(err);
            }
        };
        postCode();
    }, []);

    return <>{loading ? <p>{code}</p> : <p>대기중</p>}</>;
};

export default Login;
