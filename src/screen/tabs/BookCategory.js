import React from 'react';
import {
	SafeAreaView,
	View,
	StyleSheet,
	Image,
	TouchableOpacity,
	StatusBar,
	ScrollView,
	FlatList
} from 'react-native';
import { BasePage, Text } from '../../components/common';
import { AppColors } from "../../themes";
import {
	setSpText,
	scaleSize,
	screenW
} from "../../utils/ScreenUtil";
import HTTP from '../../utils/axiosUtils';
import { BOOKCATEGORY } from '../../utils/urlconfig';
import category_m from "../../data/category_m";
import category_f from "../../data/category_f";

const cardW = scaleSize(134);
const cardH = scaleSize(70);
const titleBarW = screenW - scaleSize(30);

const unstatsIcon = require('../../images/unstats.png');
const statsOutlineIcon = require('../../images/statsOutline.png');
const searchIcon = require('../../images/searchIcon.png');
const cardIcon = require('../../images/campus.png');

export default class BookCategory extends BasePage {
	static navigationOptions = {
		tabBarLabel: "分类",
		tabBarIcon: ({ focused }) => (
			<Image source={focused ? statsOutlineIcon : unstatsIcon} />
		)
	};

	constructor(props) {
		super(props);
		this._isMounted = false;
		this.state = {
			screenState: 'loading',
			firstCategoryList: [
				{
					text: "男生",
					id: 1
				},
				{
					text: "女生",
					id: 2
				}
			],
			curFirstIndex: 0,
			secondCategoryList: [],
			page: 1,
			pageSize: 10,
			isRefresh: false,
			loadState: 'load',
		};
	}

	componentDidMount() {
		this._isMounted = true;
		this.fetchBookCategory();
		setTimeout(() => {
			this.setState({
				screenState: 'success',
				secondCategoryList: category_m.data.list
			});
		}, 2000);
	}

	componentWillUnmount() {
		this._isMounted = false;
		this.setState({
			screenState: 'loading',
		});
	}

	_headerProps() {
		return {
			left: <View />,
			title: (
				<View style={styles.titleBar}>
					<TouchableOpacity
						style={styles.search}
						onPress={() => this.nav.push("Search")}
						activeOpacity={1}
					>
						<Image source={searchIcon} style={[styles.searchIcon]} />
						<Text
							style={{
								color: AppColors.detailGreyColor,
								fontSize: scaleSize(14)
							}}
						>
							搜索书名、作者、分类
            </Text>
					</TouchableOpacity>
				</View>
			),
			right: <View />,
			headType: 2
		};
	}

	fetchBookCategory(type) {
		const { pageSize, curFirstIndex } = this.state;
		let { page } = this.state;
		type == 'refresh' ? page = 1 : page++;
		const params = {
			sex: curFirstIndex === 0 ? 1 : 2,
			page,
			pageSize
		}
		HTTP.post(BOOKCATEGORY, params).then(res => {
			const { status } = res;
			var loadState = 'load';
			if (status == 1 && this._isMounted) {
				const { data: { items } } = res;
				if (type === 'loading') {
					if (items.length < pageSize) loadState = 'end';
					this.setState({
						secondCategoryList: [...this.state.secondCategoryList, ...items],
						screenState: 'success',
					});
				} else if (type === 'refresh') {
					if (items.length < pageSize) loadState = 'end';
					this.setState({
						secondCategoryList: items,
						screenState: 'success',
					});
				}
				this.setState({
					isRefresh: false,
					page,
					loadState
				});
			}
		})
			.catch(error => {
				this.setState({ screenState: 'error', });
			});
	}

	handleFirstChange(item, index) {
		this.setState({ curFirstIndex: index });
	}

	// onRefresh() {
	// 	console.log('刷新')
	// 	this.fetchBookCategory('refresh')
	// }

	onLoading() {
		console.log('加载')
		this.fetchBookCategory('loading')
	}

	handleSecond(item) {
		this.props.navigation.push('BookMall');
	}

	_render() {
		const {
			curFirstIndex,
			firstCategoryList,
			secondCategoryList,
			isRefresh
		} = this.state;
		return (
			<SafeAreaView>
				<View style={{ flexDirection: "row", height: '100%' }}>
					<View style={[styles.firstWrap]}>
						{firstCategoryList.map((item, index) => {
							return (
								<Text
									key={index}
									style={[
										styles.typeSelection,
										curFirstIndex === index && styles.typeSelectionOver
									]}
									onPress={() => {
										this.handleFirstChange(item, index);
									}}
								>
									{item.text}
								</Text>
							);
						})}
					</View>
					<ScrollView
						ref="secondCategory"
						style={[styles.secondWrap]}
						showsVerticalScrollIndicator={false}
						onScroll={() => this.onLoading()}
					>
					{
						firstCategoryList.map((item, index) => {
							return (
								<View key={index}>
									<View style={[styles.themeType]}>
										<View style={[styles.themeTypeLine]} />
										<Text style={[styles.typeSelectionLine]}>{item.text}</Text>
										<View style={[styles.themeTypeLine]} />
									</View>
									<View style={[styles.secondList]}>
									{
										secondCategoryList.map((secItem, sIndex) => {
											return (
												<TouchableOpacity
                          activeOpacity={1}
                          style={[styles.secondListCard]}
													key={sIndex}
													onPress={() => this.handleSecond(secItem)}
                        >
													<Image
														source={cardIcon}
														style={[styles.cardIcon]}
													/>
													<Text style={[styles.secondListItemName]}>
														{secItem.name}
													</Text>
												</TouchableOpacity>
											);
										})
									}
									</View>
								</View>
							);
						})
					}
					</ScrollView>
				</View>
			</SafeAreaView>
		)
	}
}

const styles = StyleSheet.create({
	titleBar: {
		width: titleBarW,
		marginHorizontal: scaleSize(16),
		alignItems: "center",
		flexDirection: "row",
		height: scaleSize(35),
		marginTop: StatusBar.currentHeight || 0
	},
	search: {
		width: screenW - scaleSize(32),
		backgroundColor: AppColors.dividersColor,
		height: scaleSize(32),
		flexDirection: "row",
		alignItems: "center",
		borderRadius: scaleSize(32),
		marginRight: scaleSize(12)
	},
	searchIcon: {
		marginLeft: scaleSize(13),
		marginRight: scaleSize(8)
	},
	firstWrap: {
		width: scaleSize(60),
		height: '100%',
		backgroundColor: "#F7F7F7",
	},
	typeSelection: {
		paddingVertical: scaleSize(22),
		textAlign: 'center',
		color: AppColors.textGreyColorIcon,
		fontSize: setSpText(14),
		fontWeight: "bold",
	},
	typeSelectionOver: {
		color: AppColors.starRateColor,
		backgroundColor: "#fff"
	},
	secondWrap: {
		paddingHorizontal: scaleSize(17),
		marginBottom: scaleSize(70)
	},
	themeType: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: scaleSize(40),
    marginTop: scaleSize(10)
  },
  themeTypeLine: {
    backgroundColor: AppColors.viceColorLine,
    height: scaleSize(0.5),
    width: scaleSize(110)
	},
	typeSelectionLine: {
    paddingHorizontal: scaleSize(15),
    color: AppColors.viceColorLine,
    fontSize: setSpText(14)
	},
	secondList: {
		flexDirection: "row",
		justifyContent: "space-between",
		flexWrap: "wrap"
	},
	secondListCard: {
    width: cardW,
    height: cardH,
    borderRadius: scaleSize(5),
    marginVertical: scaleSize(10),
    paddingHorizontal: scaleSize(11),
    paddingVertical: scaleSize(22)
	},
	cardIcon: {
    width: cardW,
    height: cardH,
    position: "absolute"
	},
	secondListItemName: {
    paddingVertical: scaleSize(0),
    color: "#fff",
    fontSize: setSpText(15)
  },
});