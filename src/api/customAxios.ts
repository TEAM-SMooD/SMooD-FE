import axios, { AxiosInstance } from "axios";

const getSessionToken = async () => {
    try {
        const value = await sessionStorage.getItem("token");
        if (value !== null) {
            return value;
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
                //   const refreshToken = await getRefreshToken();
                const originalRequest = config;
                // token refresh 요청
                const { data } = await axios.get(
                    `${process.env.REACT_APP_SERVER_URL}/auth/refresh`, // token refresh api
                    {
                        headers: { authorization: `Bearer ${token}` },
                        withCredentials: true,
                    }
                );
                // 새로운 토큰 저장
                console.log(
                    "토큰이 만료 되어 토큰 갱신한 데이터: 이게 res 비구조호할당 한것 입니다요요요요요요요요용ㅇ ",
                    data
                );
                const newToken = data.body.result.token; // JSON형식 이거 맞는지 확인 !!! 이 newToken이 refreshToken
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
