import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	StyleSheet,
	View,
	StatusBar,
	Keyboard,
	TouchableOpacity,
	Image
} from 'react-native';
import { ifIphoneX, ifAndroid } from '../../../utils/utils';
import Text from '../Text';
import Sizes from '../../../themes/Sizes';
import NavigatorService from '../../../navigator/NavigationService';
import { AppStyles } from '../../../themes';

const backIcon = require('../../../images/back.png');

export default class Header extends Component {
	static propTypes = {
		statusBar: PropTypes.string,
	};

	static defaultProps = {
		statusBar: 'dark-content',
	};

	constructor(props) {
		super(props);
		this.state = {
			title: props.title,
			color: props.fontColor || '#111',
		};
	}

	componentDidMount() {
		StatusBar.setBarStyle(this.props.statusBar);
	}
	goBackFun() {
		Keyboard.dismiss();
		NavigatorService.goBack();
	}
	render() {
		const { color } = this.state;
		const { navigation, isFocused, statusBar, left, leftPress, title, right, style, leftStyle, rightStyle, centerStyle, headType } = this.props;
		const leftComponent = <TouchableOpacity activeOpacity={1} onPress={() => { headType == 1 ? leftPress() : this.goBackFun() }} style={{ paddingVertical: 15, paddingRight: 15 }}>
			<Image source={backIcon} />
		</TouchableOpacity>;
		const centerComponent = typeof this.props.title == 'string' ? <Text numberOfLines={1} style={[{ color }, styles.title]}>{title}</Text> : title;
		const rightComponent = right || null;
		return (
			<View style={[styles.container, AppStyles.commPage, style, headType == 0 && { display: 'none' }]}>
				<View style={[styles.left, leftStyle]}>
					{headType !== 2 && leftComponent}
				</View>
				<View style={[styles.center, centerStyle]}>
					{centerComponent}
				</View>
				<View style={[styles.right, rightStyle]}>
					{rightComponent}
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: Sizes.screenWidth,
		height: ifIphoneX(88, 64),
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingTop: ifAndroid(0, ifIphoneX(44, 20)),
		backgroundColor: 'white',
		zIndex: 1,
	},
	left: {
		flex: 1,
		alignItems: 'flex-start',
		justifyContent: 'center',
	},
	center: {
		flex: 2,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontSize: 16,
	},
	right: {
		flex: 1,
		alignItems: 'flex-end',
		justifyContent: 'center',
	},
});