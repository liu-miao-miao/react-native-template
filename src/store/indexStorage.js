
import { observable, action } from 'mobx';

/**
 * 根store
 * @class Store
 * tokenAll 为全局tokenAll token 和 refresh
 */
class Store {
	constructor() {
		this.loginInfo = new loginInfo(this);
		this.userInfo = new userInfo(this);
	}
}

// 登录后获取的相关信息
class loginInfo {
	@observable
	allDatas = {}
	constructor(data, rootStore) {
		this.allDatas = data;
		this.rootStore = rootStore;
	}
	@action
	setLoginInfo(loginInfo) {
		this.allDatas.loginInfo = loginInfo;
	}

	@action
	setSessionId(sessionId) {
		this.allDatas.sessionId = sessionId;
	}
}
// 登录后获取的用户信息
class userInfo {
	@observable
	allDatas = {}
	constructor(data, rootStore) {
		this.allDatas = data;
		this.rootStore = rootStore;
	}

	@action
	setUserInfo(userInfo) {
		this.allDatas.userInfo = userInfo;
	}
}
// 返回RootStore实例 
export default new Store();