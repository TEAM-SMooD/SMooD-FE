export const districtArr = ["성수", "북촌", "신촌"];
export const sungsuArr = ["1가 1동", "1가 2동", "2가 1동", "2가 3동"];
export const bukchonArr = ["가회동", "삼청동"];
export const shinchonArr = ["신촌동"];
export const storeArr = ["카페", "음식점"];
export const restaurantArr = [
    "한식",
    "유흥주점",
    "분식",
    "일식/수산물",
    "양식",
    "패스트푸드",
    "닭/오리요리",
    "제과제빵/떡/케익",
    "중식",
    "별식/퓨전요리",
    "음식배달 서비스",
];

export const crdntSungsu = [37.544641605, 127.055896738];
export const crdntSungsu11 = [37.541086434976975, 127.0412324598765];
export const crdntSungsu12 = [37.54944594988232, 127.04598996390193];
export const crdntSungsu21 = [37.53736829605906, 127.05587150747924];
export const crdntSungsu23 = [37.545611330766796, 127.0581747758845];
export const crdntBukchon = [37.580036130257916, 126.98591660548797];
export const crdntBukchonGH = [37.58198910676539, 126.98653891198857];
export const crdntBukchonSC = [37.58327711215216, 126.98328939597975];
export const crdntShinchon = [37.56546165007183, 126.94001009398275];
export const crdntShinchonSC = [37.580036130257916, 126.98591660548797];
interface IselectedDistrictCrdnt {
    [index: string]: number[]; // 이렇게 한 줄만 써주면 된다
    성수: number[];
    "1가 1동": number[];
    "1가 2동": number[];
    "2가 1동": number[];
    "2가 3동": number[];
    북촌: number[];
    가회동: number[];
    삼청동: number[];
    신촌: number[];
    신촌동: number[];
}
export const crdntList: IselectedDistrictCrdnt = {
    성수: [37.544641605, 127.055896738],
    "1가 1동": [37.541086434976975, 127.0412324598765],
    "1가 2동": [37.54944594988232, 127.04598996390193],
    "2가 1동": [37.53736829605906, 127.05587150747924],
    "2가 3동": [37.545611330766796, 127.0581747758845],
    북촌: [37.580036130257916, 126.98591660548797],
    가회동: [37.58198910676539, 126.98653891198857],
    삼청동: [37.58327711215216, 126.98328939597975],
    신촌: [37.56546165007183, 126.94001009398275],
    신촌동: [37.580036130257916, 126.98591660548797],
};
