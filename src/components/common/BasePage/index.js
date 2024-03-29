import React, { Component } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { Header, ErrorPage } from '../';
import LoadingStatus from '../LoadingStatus';

class BasePage extends Component {
	constructor(props) {
		StatusBar.setHidden(false);
		StatusBar.setBarStyle('dark-content');
		super(props);
		// this.nav = this.props.navigation;
		this.state = {};
	}

	_renderHeader() {
		return <Header {...this._headerProps()} />;
	}

	_headerProps() {
		return {};
	}

	_renderError() {
		return <ErrorPage />
	}

	_renderLoading() {
		return <LoadingStatus />
	}

	_render() {
		return null;
	}

	render() {
    const headerType = this._headerProps().headType;
		return (
			<View style={[styles.container]}>
				{headerType != 0 && this._renderHeader()}
				{this.state.screenState === 'error' ? this._renderError() : null}
				{this.state.screenState === 'loading' ? this._renderLoading() : null}
				{this.state.screenState === 'success' || !this.state.screenState ? this._render() : null}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
});

export default BasePage;