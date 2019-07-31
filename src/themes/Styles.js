import { StatusBar } from 'react-native';
import Colors from './Colors';
import Fonts from './Fonts';
import Sizes from './Sizes';
import { setSpText, scaleSize, logConsole, screenW } from '../utils/ScreenUtil'
const movieW = (screenW - scaleSize(70)) / 3
const movieH = Number(movieW / 0.72);
export default {
    appPage: {
        flex: 1,
        marginTop: (StatusBar.currentHeight || 0),
        backgroundColor: Colors.backgroundColor,
    },
    appContainer: {
        backgroundColor: Colors.backgroundColor,
        flex: 1,
    },
    commPage: {
        paddingHorizontal: scaleSize(16),
        backgroundColor: Colors.backgroundColor,
    },
    smallText: {
        color: Colors.textTabInitColor,
        fontSize: setSpText(14),
        lineHeight: setSpText(25),
    },
    authorText: {
        color: Colors.textGreyColorIcon,
        fontSize: setSpText(12),
    },
    countText: {
        color: Colors.textGreyColorIcon,
        fontSize: setSpText(11),

    },
    recommend: {
        // width: movieW,
        // height: movieH,
        width: scaleSize(76),
        height: scaleSize(103),
        borderRadius: scaleSize(2),
    },
    avatar: {
        width: scaleSize(26),
        height: scaleSize(26),
        borderRadius: scaleSize(13),
    },

    // Default
    container: {
        position: 'relative',
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.white,
    },
    containerCentered: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    windowSize: {
        height: Sizes.screenHeight,
        width: Sizes.screenWidth,
    },

    // Aligning items
    leftAligned: {
        alignItems: 'flex-start',
    },
    centerAligned: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightAligned: {
        alignItems: 'flex-end',
    },

    // Text Styles
    baseText: {
        fontFamily: Fonts.base.family,
        fontSize: Fonts.base.size,
        lineHeight: Fonts.base.lineHeight,
        color: Colors.textNormalColor,
        fontWeight: '500',
    },
    p: {
        fontFamily: Fonts.base.family,
        fontSize: Fonts.base.size,
        lineHeight: Fonts.base.lineHeight,
        color: Colors.textNormalColor,
        fontWeight: '500',
    },

    strong: {
        fontWeight: '900',
    },
    link: {
        textDecorationLine: 'underline',
        color: Colors.red,
    },
    subtext: {
        fontFamily: Fonts.base.family,
        fontSize: 11,
        lineHeight: parseInt(Fonts.base.lineHeight * 0.8, 10),
        color: Colors.textSubColor,
        fontWeight: '500',
    },

    // Helper Text Styles
    textCenterAligned: {
        textAlign: 'center',
    },
    textRightAligned: {
        textAlign: 'right',
    },

    // Give me padding
    padding: {
        paddingVertical: Sizes.padding,
        paddingHorizontal: Sizes.padding,
    },
    paddingHorizontal: {
        paddingHorizontal: Sizes.padding,
    },
    paddingLeft: {
        paddingLeft: Sizes.padding,
    },
    paddingRight: {
        paddingRight: Sizes.padding,
    },
    paddingVertical: {
        paddingVertical: Sizes.padding,
    },
    paddingTop: {
        paddingTop: Sizes.padding,
    },
    paddingBottom: {
        paddingBottom: Sizes.padding,
    },
    paddingSml: {
        paddingVertical: Sizes.paddingSml,
        paddingHorizontal: Sizes.paddingSml,
    },
    paddingHorizontalSml: {
        paddingHorizontal: Sizes.paddingSml,
    },
    paddingLeftSml: {
        paddingLeft: Sizes.paddingSml,
    },
    paddingRightSml: {
        paddingRight: Sizes.paddingSml,
    },
    paddingVerticalSml: {
        paddingVertical: Sizes.paddingSml,
    },
    paddingTopSml: {
        paddingTop: Sizes.paddingSml,
    },
    paddingBottomSml: {
        paddingBottom: Sizes.paddingSml,
    },
    wrapperShadow: {//阴影部分
        shadowColor: '#000',
        shadowOffset: { width: scaleSize(2), height: scaleSize(2) },
        shadowOpacity: 0.1,
        shadowRadius: scaleSize(2),
        elevation: scaleSize(5),
    },
};
