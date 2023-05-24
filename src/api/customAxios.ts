import axios, { AxiosInstance } from "axios";

export const getSessionToken = async () => {
    try {
        let params = new URL(document.URL).searchParams;
        let token = params.get("token");
        if (token == null) {
            // 로그인후 마이페이지리다이렉트 말고 바로 마이페이지로 접근했을 상황에선 URL에서 파라미터 겟을 못하니까 예외처리
            token = sessionStorage.getItem("token");
        }
        if (token !== null) {
            return token;
        }
    } catch (e) {
        console.log("getSessionTokenERROR", e);
    }
};

export const customAxios = (): AxiosInstance => {
    const axiosInstance = axios.create({
        baseURL: `${process.env.REACT_APP_SERVER_URL}`,
    });

    axiosInstance.interceptors.request.use(
        async (config: any) => {
            const token = await getSessionToken();
            config.headers.Authorization = `Bearer ${token}`;
            return config;
        },
        function (error) {
            // Do something with request error
            // 요청 시 에러 처리
            console.log("customAxiosInterceptorsRequestERR", error);
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            const {
                config,
                response: { status },
            } = error;
            if (status === 401) {
                const token = await getSessionToken();
                const originalRequest = config;

                // token refresh 요청
                const { data } = await axios.get(
                    `${process.env.REACT_APP_SERVER_URL}/auth/refresh`, // token refresh api
                    {
                        headers: { Authorization: `Bearer ${token}` },
                        withCredentials: true,
                    }
                );
                // 새로운 토큰 저장
                const newToken = data.body.result;
                sessionStorage.setItem("token", newToken); //
                axios.defaults.headers.common.Authorization = `Bearer ${newToken}`;
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                // 401로 요청 실패했던 요청 새로운 accessToken으로 재요청
                return axios(originalRequest);
            }
            return Promise.reject(error);
        }
    );
    return axiosInstance;
};
