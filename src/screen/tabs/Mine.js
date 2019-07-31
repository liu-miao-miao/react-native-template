import React, { Component } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image } from 'react-native';

const personNorIcon = require('../../images/personNor.png');
const personOutlineIcon = require('../../images/personOutline.png');

export default class Mine extends Component {
	static navigationOptions = {
		tabBarLabel: "我的",
		tabBarIcon: ({ focused }) => (
			<Image
				source={focused ? personOutlineIcon : personNorIcon}
			/>
		)
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
					<Text>Mine</Text>
				</View>
			</SafeAreaView >
		)
	}
}
const styles = StyleSheet.create({});