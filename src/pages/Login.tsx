import React, { useEffect } from "react";
import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { Container, Grid, Text } from "../Elements";
// import { actionCreators as userActions} from "../Redux/Modules/User";
import axios from "axios";
const Login = () => {
    // const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);
    const href = window.location.href;
    let params = new URL(document.URL).searchParams;
    let code = params.get("code");
    useEffect(() => {
        const postCode = async () => {
            try {
                setError(null);
                setLoading(true);
                const res = await axios.get("api/login/oauth/kakao", {
                    params: {
                        code: code,
                    },
                });
                console.log("RES", res);
            } catch (err) {
                setError(err);
                console.log(err);
            }
            setLoading(false);
        };
        postCode();
    }, []);

    // React.useEffect(async () => {
    //     await dispatch(userActions.kakaoLogin(code));
    // }, []);

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
