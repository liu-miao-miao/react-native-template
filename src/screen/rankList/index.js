import React from "react";
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import { AppStyles, AppColors } from "../../themes";
import {
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Keyboard,
  FlatList
} from "react-native";
import { BasePage, Text, CustomerBar } from '../../components/common';
import { scaleSize } from "../../utils/ScreenUtil";
import { RANKCATEGORYLIST, RankSecondCategoryList } from "../../utils/urlconfig";
import HTTP from "../../utils/axiosUtils";
import RankListItem from '../../components/RankList/RankListItem';

const backIcon = require('../../images/back.png');
const cardIcon = require('../../images/campus.png');

export default class RankList extends BasePage {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      screenState: 'loading',
      tabsList: [
        { text: "男生", id: 1 },
        { text: "女生", id: 2 }
      ],
      curSex: null,                  // 当前性别 男: 1;女: 2
      rankFirstCategoryList: [
        { name: "人气榜", id: 1 },
        { name: "飙升榜", id: 2 },
        { name: "新书榜", id: 3 },
        { name: "完结榜", id: 4 },
        { name: "连载榜", id: 5 },
        { name: "热搜榜", id: 6 },
      ],  // 一级分类列表
      curFirstIndex: 0,           // 当前选中的一级分类index
      curFirstId: null,           // 当前选中的一级分类ID
      rankSecondCategoryList: [
        {
          id: 0,
          cover: 'https://bookcover.yuewen.com/qdbimg/349573/1013926412/90',
          name: 'AAAAA',
          resume: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
          authorName: '猜猜猜'
        },
        {
          id: 1,
          cover: 'https://bookcover.yuewen.com/qdbimg/349573/1013926412/90',
          name: 'AAAAA',
          resume: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
          authorName: '猜猜猜'
        },
        {
          id: 2,
          cover: 'https://bookcover.yuewen.com/qdbimg/349573/1013926412/90',
          name: 'AAAAA',
          resume: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
          authorName: '猜猜猜'
        },
        {
          id: 3,
          cover: 'https://bookcover.yuewen.com/qdbimg/349573/1013926412/90',
          name: 'AAAAA',
          resume: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
          authorName: '猜猜猜'
        },
        {
          id: 4,
          cover: 'https://bookcover.yuewen.com/qdbimg/349573/1013926412/90',
          name: 'AAAAA',
          resume: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
          authorName: '猜猜猜'
        }
      ], // 二级分类列表
      quePages: 1,                // 当前页数
      isLoading: false,           // 是否加载中
      isRefresh: false,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    const { tabsList } = this.state;
    setTimeout(() => {
      this.setState({
        screenState: 'success',
        curSex: tabsList[0].id,
      });
    }, 2000);
    this.FetchRankCategoryList();
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.setState({
			screenState: 'loading',
		});
  }

  _headerProps() {
    return {
      headType: 0
    };
  }

  FetchRankCategoryList() {
    const { curSex } = this.state;
    const url = RANKCATEGORYLIST;
    const params = {
      sex: curSex
    };
    HTTP.post(url, params).then(res => {
      const { status } = res;
      if (status == 1 && this._isMounted) {
        const { data: { items } } = res;
        this.setState({
          screenState: 'success',
          rankFirstCategoryList: items,
          curFirstId: items[0].id
        },() => this.FetchRankSecondCategoryList());  
      }
    })
    .catch(error => {

    });
  }

  FetchRankSecondCategoryList(categoryId) {
    const { curFirstId, curSex } = this.state;
    const url = RankSecondCategoryList;
    const params = {
      classId: categoryId,
      quePages: 1
    };
    HTTP.post(url, params).then(res => {
      const { data: { items }} = res;
      this.setState({ rankSecondCategoryList: items });
    });
  }

  handleFirstSelect(item, index) {
    this.setState({
      curFirstIndex: index,
      curFirstId: item.id
    }, () => this.FetchRankSecondCategoryList());
  }

  handleTabChange(obj) {
    const { tabsList } = this.state;
    this.setState({
      curSex: tabsList[obj.i].id,
    }, () => this.FetchRankCategoryList());
  }

  renderSecondItem(_item) {
    const { item } = _item;
    return (
      <View style={[styles.ListWarp]}>
        <RankListItem
          data={item}
          index={_item.index}
          key={item.id}
          onPress={() => this.goDetail(item.id)}
        />
      </View>
    );
  }

  goDetail(id) {
    alert(id);
  }

  onRefresh() {
		console.log('刷新');
		this.FetchRankSecondCategoryList();
  }
  
  onLoading() {
    console.log('下拉');
    this.FetchRankSecondCategoryList();
	}

  _render() {
    const {
      tabsList,
      rankFirstCategoryList,
      curFirstIndex,
      rankSecondCategoryList,
      isRefresh
    } = this.state;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollableTabView
          style={{overflow: 'hidden'}}
          tabBarPosition="top"
          renderTabBar={() => (
            <CustomerBar
              left={
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => alert('back')}
                >
                  <Image source={backIcon} />
                </TouchableOpacity>
              }
              right={<View/>}
              backgroundColor={'#fff'}
              tabUnderlineDefaultWidth={30}
              tabUnderlineScaleX={3}
              activeColor={'#FE8B13'}
              inactiveColor={'#505050'}
            />)
          }
          onChangeTab={(obj) => this.handleTabChange(obj)}
        >
          {
            tabsList.map((item, index) => {
              return (
                <View tabLabel={item.text} key={index} style={[styles.wrap]}>
                  <View style={[styles.firstWrap]}>
                    <ScrollView>
                      {rankFirstCategoryList.map((item, index) => {
                        return (
                          <Text
                            key={index}
                            style={[
                              styles.typeSelection,
                              curFirstIndex == index && styles.typeSelectionOver
                            ]}
                            onPress={() => {
                              this.handleFirstSelect(item, index);
                            }}
                          >
                            {item.name}
                          </Text>
                        );
                      })}
                    </ScrollView>
                  </View>
                  <View style={[styles.secondWrap]}>
                    <FlatList
                      refreshing={isRefresh}
                      onRefresh={() => this.onRefresh()}
                      data={rankSecondCategoryList}
                      showsVerticalScrollIndicator={false}
                      renderItem={(item) => this.renderSecondItem(item)}
                      keyExtractor={(item, index) => (index).toString()}
                      onEndReached={() => this.onLoading()}
                    />
                  </View>
                </View>
              );
            })
          }
        </ScrollableTabView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    height: '100%',
  },
  firstWrap:{
    width: scaleSize(80),
    height: '100%',
    backgroundColor: "#F7F7F7"
  },
  secondWrap: {
    flex: 1,
    paddingHorizontal: scaleSize(17),
  },
  typeSelection: {
    paddingHorizontal: scaleSize(15),
    color: AppColors.textGreyColorIcon,
    fontSize: scaleSize(14),
    fontWeight: "bold",
    paddingVertical: scaleSize(20)
  },
  typeSelectionOver: {
    color: AppColors.starRateColor,
    backgroundColor: "#fff"
  },
  ListWarp: {
    paddingTop: scaleSize(20),
  }
});