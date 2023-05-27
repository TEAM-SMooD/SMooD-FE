import { customAxios } from "./customAxios";

export const getKeywordStore = async () => {
    try {
        const res = await customAxios().get(`/posts`); // / /// / // /  // /
        console.log("getKeywordStore  res", res.data.body.result);
        return res.data.body.result; // [{…}, {…}]
    } catch (err) {
        console.log("getKeywordStore ERR", err);
    }
    return [];
};
export const getCategoryStores = async () => {
    try {
        const res = await customAxios().get(`/posts`); // / /// / // /  // /
        console.log("getCategoryStores  res", res.data.body.result);
        return res.data.body.result; // [{…}, {…}]
    } catch (err) {
        console.log("getCategoryStores ERR", err);
    }
    return [];
};
export const getModalStore = async () => {
    try {
        const res = await customAxios().get(`/posts`); // / /// / // /  // /
        console.log("getModalStore  res", res.data.body.result);
        return res.data.body.result; // [{…}, {…}]
    } catch (err) {
        console.log("getModalStore ERR", err);
    }
    return [];
};

// 지역 추천 탑3 get
export const getSiteTop3 = async () => {
    try {
        const res = await customAxios().get(`/posts`); // / /// / // /  // /
        console.log("getSiteTop3  res", res.data.body.result);
        return res.data.body.result; // [{…}, {…}]
    } catch (err) {
        console.log("getSiteTop3 ERR", err);
    }
    return [];
};
// 지역 추천 대표 가게들
export const getSiteStores = async () => {
    try {
        const res = await customAxios().get(`/posts`); // / /// / // /  // /
        console.log("getSiteStores  res", res.data.body.result);
        return res.data.body.result; // [{…}, {…}]
    } catch (err) {
        console.log("getSiteStores ERR", err);
    }
    return [];
};
