// 内网测试
const BASE_URL = 'http://192.168.0.91:6078/app/';//接口地址
const ShareLinkURL = 'http://www.baidu.com'; // 分享链接

export const CHANNEL = "cs_1000";
export const APP_ID = 13;

// 接口地址

// 书籍分类接口
export const BOOKCATEGORY = BASE_URL + 'bookCategory/v1/config';
export const STORED_LIST = BASE_URL + 'books/v1/storedList'
/* 书城 */
export const COLUMN = BASE_URL + 'bookStore/v1/column'
export const GET_BY_PAGE = BASE_URL + 'bookStore/v1/getByPage'
export const EXTENSION = BASE_URL + 'promote/v1/list'
/** 详情 */
export const DETAIL = BASE_URL + 'books/v1/detail'
export const RECOMMEND = BASE_URL + 'books/v1/recommend'
export const COMMENN = BASE_URL + 'books/v1/comment'

/** 登录 */
export const GETPHONECODE = BASE_URL + 'phone/v1/sendValidateCode'

/* 搜索 */
export const REC_BOOKS = BASE_URL + 'books/search/v1/recBooks'

/** 共接口  */
export const LONGIN = BASE_URL + 'member/v1/login';
export const ADD_STORE = BASE_URL + 'books/v1/addStore'
export const DEL_STORE = BASE_URL + 'books/v1/delStore'
// 榜单排行分类
export const RANKCATEGORYLIST = BASE_URL + 'rankingList/v1/get';
export const RankSecondCategoryList = BASE_URL + 'rankingList/v1/list';
// 阅读品味
export const READTASTELIST = BASE_URL + 'readtaste/v1/queryList';
export const SELECTEDREADTASTELIST = BASE_URL + 'readtaste/v1/update';
// 阅读记录
export const READRECORDLIST = BASE_URL + 'books/v1/latestReadList';
export const DELETEREADRECORDLIST = BASE_URL + 'books/v1/delAllLatestRead';