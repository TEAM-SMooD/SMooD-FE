import React, { useEffect } from "react";
import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { Container, Grid, Text } from "../Elements";
// import { actionCreators as userActions} from "../Redux/Modules/User";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
    // const dispatch = useDispatch();
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
                    // `${process.env.REACT_APP_SERVER_URL}/login/oauth/kakao`,
                    "http://3.39.182.90:8080/login/oauth/kakao",
                    // "/api/login/oauth/kakao",
                    {
                        params: {
                            code: code,
                        },
                    }
                );
                console.log(res);
                // navigate("/");
            } catch (err) {
                setError(err);
            }
        };
        postCode();
    }, []);

    return (
        <>{loading ? <p>{code}</p> : <p>대기중</p>}</>
        // <Container>
        //     <Grid>
        //         <Text>잠시만 기다려 주세요! 로그인 중입니다.</Text>
        //     </Grid>
        // </Container>
    );
};

export default Login;
