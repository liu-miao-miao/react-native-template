const app = {
    success: '#67C23A',
    warning: '#F7BA2A',
    danger: '#F56C6C',
    lightBlue: '#58B7FF',
    ColdGray: '#EFEFF4',
    darkGray: '#D1D1D6',
    lightGray: '#E5E5EA',
    backgroundColor: '#fff',
    themeColor: '#fc720a',
    starRateColor: '#FE8B13',
    scoreColor: '#FC9B32',
    romanceColor: '#739FFF',
};

// 字体颜色
const text = {
    textNormalColor: '#201F1D',
    textTabInitColor: '#615D58',
    textGreyColor: '#666',
    detailNormalColor: '#1B1B1B',
    detailTabInitColor: '#A1A1A1',
    detailGreyColor: '#505050',
    viceColorLine: '#B2B2B2',
    textGreyColorIcon: '#898989',
    tasteTitleColor: '#333333',
    tasteSubTitleColor: '#999999',
    mainTextColor: '#FE8B13',
};

// 分割线颜色
const dividers = {
    dividersColor: '#f7f7f7',
    dividersThemeColor: '#F2F2F2'
};

// tabBar颜色
const tabBar = {
    tabBar: {
        background: '#ffffff',
        iconDefault: '#8F8E94',
        iconSelected: '#111111',
    },
};

export default {
    ...app,
    ...text,
    ...dividers,
    ...tabBar,
};
