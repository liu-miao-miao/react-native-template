import {
  createStackNavigator,
  TabBarBottom,
  createBottomTabNavigator,
  createAppContainer
} from "react-navigation";
import { BookRack, BookMall, BookCategory, Mine } from "../screen/tabs";
import RankList from "../screen/rankList";

const tabScreens = {
  BookMall: {
    screen: BookMall,
    navigationOptions: {
      headerTitle: "书城",
      gesturesEnabled: false
    }
  },
  BookCategory: {
    screen: BookCategory,
    navigationOptions: {
      headerTitle: "分类",
      gesturesEnabled: false
    }
  },
  BookRack: {
    screen: BookRack,
    navigationOptions: {
      headerTitle: "书架",
      gesturesEnabled: false
    }
  },
  Mine: {
    screen: Mine,
    navigationOptions: {
      headerTitle: "我的",
      gesturesEnabled: false
    }
  }
  // RankList: {
  //     screen: RankList,
  //     navigationOptions: {
  //         headerTitle: '榜单',
  //         gesturesEnabled: false,
  //     }
  // },
};

const tabConfig = {
  tabBarComponent: TabBarBottom,
  tabBarPosition: "bottom",
  animationEnabled: false,
  swipeEnabled: false,
  lazy: true,
  tabBarOptions: {
    inactiveTintColor: "#999", //未选中
    activeTintColor: "#ff8500", // 选中
    style: {
      backgroundColor: "white",
      height: 49
    },
    labelStyle: {
      fontSize: 10,
      marginBottom: 5,
      marginTop: -5
    }
  }
};

const Tab = createBottomTabNavigator(tabScreens, tabConfig);

const MainStack = createStackNavigator(
  {
    Tab: { screen: Tab }
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#fff"
      },
      headerTintColor: "#000",
      headerTitleStyle: {
        flex: 1,
        alignSelf: "center",
        textAlign: "center",
        fontWeight: "bold"
      }
    }
  }
);

const RootStack = createStackNavigator(
  {
    MainStack: { screen: MainStack }
  },
  {
    initialRouteName: "MainStack",
    mode: "modal",
    headerMode: "none"
  }
);

export default createAppContainer(RootStack);
