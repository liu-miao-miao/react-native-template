import React, { Component } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image } from 'react-native';

const bookshelfIcon = require('../../images/bookshelf.png');
const bookshelfOutlieIcon = require('../../images/bookshelfOutlie.png');

export default class BookRack extends Component {
	static navigationOptions = ({ navigation }) => {
		const params = navigation.state.params || { tabBarVisibleType: true };
		const tabBarVisibleType = params.tabBarVisibleType;
		return {
			tabBarLabel: '书架',
			tabBarIcon: ({ focused }) => (
				<Image source={focused ? bookshelfOutlieIcon : bookshelfIcon} />
			),
			tabBarVisible: tabBarVisibleType,
		}
	};

	constructor(props) {
		super(props);
		this.state = {};
	}

	componentWillUnmount() { }

	componentDidMount() { }

	render() {
		return (
			<SafeAreaView>
				<View>
					<Text>BookRack</Text>
				</View>
			</SafeAreaView >
		)
	}
}
const styles = StyleSheet.create({});