import React, { Component } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image } from 'react-native';

const bookCityIcon = require('../../images/bookCity.png');
const bookCityOutlineIcon = require('../../images/bookCityOutline.png');

export default class BookMall extends Component {
	static navigationOptions = {
		tabBarLabel: '书城',
		tabBarIcon: ({ focused }) => (
			<Image source={focused ? bookCityOutlineIcon : bookCityIcon} />
		),
		// tabBarVisible: false,   // 隐藏底部导航栏
		// header: null,           //隐藏顶部导航栏
	};

	constructor(props) {
		super(props);
		this.state = {
			tabs: [
				{ text: '精选', id: 0 },
				{ text: '男生', id: 1 },
				{ text: '女生', id: 2 }
			],
			curTabIndex: 0,
		};
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	componentDidMount() {
		this._isMounted = true;
	}

	render() {
		return (
			<SafeAreaView>
				<View>
					<Text>BookMall</Text>
				</View>
			</SafeAreaView >
		)
	}
}
const styles = StyleSheet.create({});