import {StyleSheet} from 'react-native'
import {ThemeUtils, Color} from "../../style";

const HEADER_IMAGE_HEIGHT = ThemeUtils.relativeHeight(50);
export default StyleSheet.create({
    container: {
        flex: 1,
    },
    /*header style*/
    headerLeftIcon: {
        position: 'absolute',
        left: 24,
        top: 6
    },
    headerRightIcon: {
        position: 'absolute',
        right: 24,
        top: 3
    },
    headerRightIcon2: {
        position: 'absolute',
        right: 24,
        top: 25
    },
    headerStyle: {
        height: ThemeUtils.APPBAR_HEIGHT,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 200,
    },
    headerTitle: {
        textAlign: 'center',
        justifyContent: 'center',
        color: Color.HEADER_TEXT_COLOR,
        fontSize: ThemeUtils.fontNormal,
        fontFamily: "Roboto",
    },
    /*Top Image Style*/
    headerImageStyle: {
        height: HEADER_IMAGE_HEIGHT,
        width: '100%',
        top: 0,
        alignSelf: 'center',
        position: 'absolute'
    },
    /*profile image style*/
    profileImage: {
        position: 'absolute',
        zIndex: 100,
    },
    /*profile title style*/
    profileTitle: {
        position: 'absolute',
        zIndex: 100,
        textAlign: 'left',
        color: Color.CARD_BG_COLOR,
        top: ThemeUtils.relativeHeight(25),
        left: 16,
        right: 0,
        fontFamily: "Roboto",
        fontSize: 32
    },
    profileTitle2: {
        position: 'absolute',
        zIndex: 100,
        textAlign: 'right',
        color: Color.CARD_BG_COLOR,
        top: ThemeUtils.relativeHeight(31),
        left: 0,
        right: 16,
    },
    /*song count text style*/
    songCountStyle: {
        position: 'absolute',
        textAlign: 'left',
        fontWeight: '400',
        top: ThemeUtils.relativeHeight(31),
        left: 16,
        right: 0,
        fontFamily: "Roboto",
        fontSize: 16,
        color: Color.CARD_BG_COLOR
    },
    songCountStyle2: {
        position: 'absolute',
        textAlign: 'right',
        fontWeight: '400',
        top: ThemeUtils.relativeHeight(33),
        left: 0,
        right: 16,
        fontFamily: "Roboto",
        fontSize: ThemeUtils.fontNormal,
        color: Color.CARD_BG_COLOR
    },
    artistCardContainerStyle: {
        backgroundColor: Color.CARD_BG_COLOR,
        elevation: 5,
        shadowRadius: 3,
        shadowOffset: {
            width: 3,
            height: 3
        },
        padding: 15,
        marginVertical: ThemeUtils.relativeWidth(1),
        marginHorizontal: ThemeUtils.relativeWidth(2),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#F1F5F9",
        borderRadius:16

    },
    artistImage: {
        height: 129,
        width: 77,
        borderRadius: 16
    },
    songTitleStyle: {
        fontFamily: "Roboto",
		fontSize: 24,
		fontWeight: "700",
        color: Color.BLACK,
    },
    sinopsis: {
        fontFamily: "Roboto",
		fontSize: 16,
		fontWeight: "700",
        color: Color.BLACK,
        marginTop:5,
    },
    cardTextContainer: {
        flex: 1,
        marginTop: 15,
        marginBottom: 25,
        marginLeft: 10,
        marginRight:10,
    },
    titleBody:{
        fontFamily: "Roboto",
		fontSize: 32,
		fontWeight: "700",
        marginLeft: 16,
        ///marginVertical: 5
    },
    imgVal:{
        flexDirection: "column",
    },
    valMovie: {
        fontWeight: "700",
        fontSize: 16,
        marginLeft:2
    }
})