import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform
} from 'react-native';

export default class CustomTabBar extends Component {
  constructor(props: TabBarProps) {
    super(props);
    this.state = {
      activeDefaultColor: '#08086b',
      inactiveDefaultColor: '#666666'
    };
  }

  _renderTab(name, page, isTabActive, onPressHandler) {
    const { textStyle } = this.props;
    const textColor = isTabActive ? this.props.activeColor : this.props.inactiveColor;
    const fontWeight = isTabActive ? 'bold' : 'normal';
    const fontSize = isTabActive ? 18 : 16;
    const Button = Platform.OS == 'ios' ? ButtonIos : ButtonAndroid;

    return (
      // <Button
      //   style={{ flex: 1 }}
      //   key={name}
      //   accessible={true}
      //   accessibilityLabel={name}
      //   accessibilityTraits='button'
      //   onPress={() => onPressHandler(page)}
      // >
      //   <View style={styles.tab}>
      //     <Text style={[{ color: textColor, fontWeight }]}>
      //       {name}
      //     </Text>
      //   </View>
      // </Button>
      <TouchableOpacity
        style={{ flex: 1 }}
        key={name}
        activeOpacity={1}
        onPress={() => onPressHandler(page)}
      >
        <View style={styles.tab}>
          <Text allowFontScaling={false} style={[{ color: textColor, fontSize, fontWeight, }]}>
            {name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  _renderUnderline() {
    // tab容器宽
    const containerWidth = this.props.containerWidth - 160;
    // tabs数量
    const numberOfTabs = this.props.tabs.length;
    // 下划线宽度
    const underlineWidth = this.props.tabUnderlineDefaultWidth ? this.props.tabUnderlineDefaultWidth : containerWidth / (numberOfTabs * 2);
    // 下划线缩放倍数
    const scale = this.props.tabUnderlineScaleX ? this.props.tabUnderlineScaleX : 3;
    // 下划线距离左边长度
    const deLen = (containerWidth / numberOfTabs - underlineWidth) / 2;
    // tab下划线样式
    const tabUnderlineStyle = {
      position: 'absolute',
      width: underlineWidth,
      height: 2,
      borderRadius: 2,
      backgroundColor: this.props.activeColor,
      bottom: 0,
      left: deLen
    };
    // 下划线每次横向移动的偏移量（一个tab的宽度）
    const translateX = this.props.scrollValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, containerWidth / numberOfTabs],
    });
    // 动画
    const scaleValue = (defaultScale) => {
      let arr = new Array(numberOfTabs * 2);
      return arr.fill(0).reduce(function (pre, cur, idx) {
        idx == 0 ? pre.inputRange.push(cur) : pre.inputRange.push(pre.inputRange[idx - 1] + 0.5);
        idx % 2 ? pre.outputRange.push(defaultScale) : pre.outputRange.push(1)
        return pre
      }, { inputRange: [], outputRange: [] })
    };
    // 切换下划线动态缩放差值
    const scaleX = this.props.scrollValue.interpolate(scaleValue(scale));

    return (
      <Animated.View
        style={[
          tabUnderlineStyle,
          {
            transform: [
              { translateX },
              { scaleX }
            ],
          },
          this.props.underlineStyle,
        ]}
      />
    );
  }

  render() {
    const { backgroundColor, style, left, right } = this.props;
    return (
      <View style={[styles.tabs, { backgroundColor }, style]}>
        <View style={[styles.tabSide]}>
          {left}
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          {this.props.tabs.map((name, page) => {
            const isTabActive = this.props.activeTab === page;
            return this._renderTab(name, page, isTabActive, this.props.goToPage)
          })}
          {
            this._renderUnderline()
          }
        </View>
        <View style={[styles.tabSide]}>
          {right}
        </View>
      </View>
    );
  };
}



const ButtonAndroid = (props) => (
  <TouchableNativeFeedback
    delayPressIn={0}
    background={TouchableNativeFeedback.SelectableBackground()}
    {...props}
  >
    {props.children}
  </TouchableNativeFeedback>
);

const ButtonIos = (props) => (
  <TouchableOpacity {...props}>
    {props.children}
  </TouchableOpacity>
);


const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabs: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#f4f4f4',
  },
  tabSide: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80
  }
});