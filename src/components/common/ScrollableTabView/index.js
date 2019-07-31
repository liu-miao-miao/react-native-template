import React, { Component } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import { AppSizes, AppColors } from '../../../themes';
import Text from '../Text';
import { setSpText, scaleSize, logConsole, screenW } from '../../../utils/ScreenUtil'

export default class ScrollTabView extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	render() {
		const { style, children, underlineStyle, defaultBarStyle, contentStyle, tabStyle, activeColor, initColor, renderTab } = this.props;
		return (
			<ScrollableTabView
				style={[style,]}
				tabBarUnderlineStyle={[{ width: 0, height: 0, }, underlineStyle]}
				renderTabBar={() => (
					<DefaultTabBar
						style={[{ borderWidth: AppSizes.hairLineWidth, borderColor: AppColors.dividersColor }, defaultBarStyle]}
						renderTab={(name, pageIndex, isTabActive, goToPage) => {
							return renderTab ? renderTab(name, pageIndex, isTabActive, goToPage) :
								(<TouchableOpacity
									key={pageIndex}
									activeOpacity={1}
									onPress={() => { goToPage(pageIndex); }}
									style={[{ flex: 1, justifyContent: 'center', alignItems: 'center', }, tabStyle]}
								>
									<Text allowFontScaling={false} style={{ color: isTabActive ? AppColors.themeColor : AppColors.textTabInitColor }}>{name}</Text>
									{isTabActive && <View style={[styles.defaultBarSeleStyle]}></View>}
								</TouchableOpacity>)
						}}
					/>
				)}
			>
				{children.map((child, index) => React.cloneElement(child, { style: contentStyle, key: index }))}
			</ScrollableTabView>
		)
	}
}
const styles = StyleSheet.create({
	defaultBarSeleStyle: {
		width: scaleSize(15),
		height: scaleSize(3),
		borderRadius: scaleSize(3),
		backgroundColor: AppColors.themeColor,
		position: 'absolute',
		bottom: 0
	}
});