import { customAxios } from "./customAxios";

export const getReportUrls = async (dong: string, category: string) => {
    try {
        const res = await customAxios().get(`/report`, {
            params: {
                dong: dong,
                category: category,
            },
        }); // / /// / // /  // /
        console.log("getReportUrls  res", res.data.body.result);
        return res.data.body.result; // [{…}, {…}]
    } catch (err) {
        console.log("getReportUrls ERR", err);
    }
    return [];
};
export const getKeyword20 = async (dong: string, category: string) => {
    try {
        const res = await customAxios().get(`/store/keyword`, {
            params: {
                dong: dong,
                category: category,
            },
        }); // / /// / // /  // /
        console.log("getKeyword20  res", res.data.body.result);
        return res.data.body.result; // [{…}, {…}]
    } catch (err) {
        console.log("getKeyword20 ERR", err);
    }
    return [];
};
export const getKeywordStore = async (
    dong: string,
    category: string,
    keyword: string
) => {
    try {
        const res = await customAxios().get(`/store/representation`, {
            params: {
                dong: dong,
                category: category,
                keyword: keyword,
            },
        }); // / /// / // /  // /
        console.log("getKeywordStore  res", res.data.body.result);
        return res.data.body.result; // [{…}, {…}]
    } catch (err) {
        console.log("getKeywordStore ERR", err);
    }
    return [];
};
export const getCategoryStores = async (
    sort: string,
    dong: string,
    category: string
) => {
    try {
        const res = await customAxios().get(`/store`, {
            params: {
                sort: sort,
                dong: dong,
                category: category,
            },
        }); // / /// / // /  // /
        console.log("getCategoryStores  res", res.data.body.result);
        return res.data.body.result; // [{…}, {…}]
    } catch (err) {
        console.log("getCategoryStores ERR", err);
    }
    return [];
};
export const getModalStore = async (storeId: number) => {
    try {
        const res = await customAxios().get(`/store/${storeId}`); // / /// / // /  // /
        console.log("getModalStore  res", res.data.body.result);
        return res.data.body.result; // [{…}, {…}]
    } catch (err) {
        console.log("getModalStore ERR", err);
    }
    return [];
};

// 지역 추천 탑3 get
export const getSiteTop3 = async (
    category: string,
    keyword1: string,
    keyword2?: string,
    keyword3?: string
) => {
    try {
        const res = await customAxios().get(`/keyword`, {
            params: {
                category: category,
                keyword1: keyword1,
                keyword2: keyword2,
                keyword3: keyword3,
            },
        });
        console.log("getSiteTop3  res", res.data.body.result);
        return res.data.body.result; // [{…}, {…}]
    } catch (err) {
        console.log("getSiteTop3 ERR", err);
    }
    return [];
};
// 지역 추천 대표 가게들
export const getSiteStores = async (
    region: string, //지역기준
    sort: string, //정렬기준
    category: string,
    keyword1: string,
    keyword2?: string,
    keyword3?: string
) => {
    try {
        const res = await customAxios().get(`/keyword/store`, {
            params: {
                region: region, //지역기준
                sort: sort,
                category: category,
                keyword1: keyword1,
                keyword2: keyword2,
                keyword3: keyword3,
            },
        });
        console.log("getSiteStores  res", res.data.body.result);
        return res.data.body.result; // [{…}, {…}]
    } catch (err) {
        console.log("getSiteStores ERR", err);
    }
    return [];
};
