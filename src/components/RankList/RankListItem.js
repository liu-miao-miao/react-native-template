import React, { Component } from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Platform
} from "react-native";
import { Text } from "../common";
import { AppColors, AppStyles } from "../../themes";
import { scaleSize, } from "../../utils/ScreenUtil";

const rank_1 = require('../../images/rank_1.png');
const rank_2 = require('../../images/rank_2.png');
const rank_3 = require('../../images/rank_3.png');
const rank   = require('../../images/rank_4.png');

export default class RankListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  goDetail(id) {
    this.props.onPress(id);
  }

  _renderRank(index) {
    switch (index) {
      case 0:
        return <Image style={[styles.rankIcon]} source={rank_1}></Image>
      case 1:
        return <Image style={[styles.rankIcon]} source={rank_2}></Image>
      case 2:
        return <Image style={[styles.rankIcon]} source={rank_3}></Image>
      default:
        return <Image style={[styles.rankIcon]} source={rank}></Image>
    }
  }

  render() {
    const { data, index } = this.props;
    return (
      <View
        style={[
          AppStyles.appContainer,
          AppStyles.commPage,
        ]}
      >
        <TouchableOpacity
          style={[styles.itemWrap]}
          onPress={() => this.goDetail(data.id)}
          activeOpacity={1}
        >
          <View style={{position: 'relative'}}>
            <Image style={[styles.cover]} source={{ uri: data.cover }} />
            <View style={[styles.rank]}>
              {this._renderRank(index)}
              <Text style={[styles.rankNum]}>{index + 1}</Text>
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: "column" }}>
            <Text style={[styles.booknameText]} numberOfLines={1}>
              {data.name}
            </Text>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text numberOfLines={2} style={styles.intro}>
                {data.resume}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={[AppStyles.authorText]}>{data.authorName}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cover: {
    width: scaleSize(56),
    height: scaleSize(75),
    marginRight: scaleSize(15)
  },
  rank: {
    position: 'absolute',
    top: scaleSize(-5),
    left: scaleSize(-6),
  },
  rankIcon: {
    width: scaleSize(18),
    height: scaleSize(18),
  },
  rankNum: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    right: 0,
    width: scaleSize(18),
    height: scaleSize(18),
    fontSize: scaleSize(9),
    color: '#fff',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center',
    ...Platform.select({
      ios:{
          lineHeight: scaleSize(18),
      },
      android:{
      }
    }),
  },
  itemWrap: {
    flexDirection: "row",
    justifyContent: "center"
  },
  booknameText: {
    fontSize: scaleSize(15),
    fontWeight: "500",
    color: "#1C1C1C"
  },
  itemWrapSec: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: scaleSize(27)
  },
  recommendSec: {
    width: scaleSize(60),
    height: scaleSize(80),
    borderRadius: scaleSize(2),
    marginRight: scaleSize(12)
  },
  booknameTextSec: {
    flex: 1,
    fontSize: scaleSize(16),
    fontWeight: "500",
    color: AppColors.textNormalColor
  },
  authorTextSec: {},
  intro: {
    lineHeight: scaleSize(18),
    fontSize: scaleSize(13),
    fontWeight: "500",
    color: "#666666"
  }
});
