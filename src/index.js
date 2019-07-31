import React, { Component } from 'react';
import RootStack from './navigator';
import NavigatorService from './navigator/NavigationService';
import { Provider } from 'mobx-react';
import Store from './store/indexStorage';


export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		console.disableYellowBox = false;
	}

	render() {
		return (
			<Provider rootStore={Store} >
				<RootStack
					ref={(navigatorRef) => {
						NavigatorService.setTopLevelNavigator(navigatorRef);
					}}
				/>
			</Provider>
		)
	}
}