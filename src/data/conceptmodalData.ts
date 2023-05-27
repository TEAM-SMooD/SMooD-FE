export const districtArr = ["성수", "북촌", "신촌"];
export const sungsuArr = [
    "성수1가 제1동",
    "성수1가 제2동",
    "성수2가 제1동",
    "성수2가 제3동",
];
export const bukchonArr = ["가회동", "삼청동"];
export const shinchonArr = ["신촌동"];
export const storeArr = ["카페", "음식점"];
export const restaurantArr = [
    "한식",
    "중식",
    "일식",
    "서양식",
    "분식",
    "패스트푸드",
    "동남아시아",
    "주점",
];
//prettier-ignore
export const conceptArr = [
    "가성비 좋은", "푸짐한", "분위기좋은", "힙한", "격식있는", '시끌벅적한', "조용한", "깔끔한", "감성", "인스타", "포토존", "예쁜", "맛있는", "넓은", "고급스러운", "이색적인", "뷰가좋은", "기념일", "데이트", "건강식"
]

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
    "성수1가 제1동": number[];
    "성수1가 제2동": number[];
    "성수2가 제1동": number[];
    "성수2가 제3동": number[];
    북촌: number[];
    가회동: number[];
    삼청동: number[];
    신촌: number[];
    신촌동: number[];
}
export const crdntList: IselectedDistrictCrdnt = {
    성수: [37.544641605, 127.055896738],
    "성수1가 제1동": [37.541086434976975, 127.0412324598765],
    "성수1가 제2동": [37.54944594988232, 127.04598996390193],
    "성수2가 제1동": [37.53736829605906, 127.05587150747924],
    "성수2가 제3동": [37.545611330766796, 127.0581747758845],
    북촌: [37.580036130257916, 126.98591660548797],
    가회동: [37.58198910676539, 126.98653891198857],
    삼청동: [37.58327711215216, 126.98328939597975],
    신촌: [37.56546165007183, 126.94001009398275],
    신촌동: [37.580036130257916, 126.98591660548797],
};
