import React, { useState, useRef } from "react";
import {
	SafeAreaView,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	View
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { IconButton, Button } from "react-native-paper";
import addImg from "../../assets/addImg.png";
import BtnSheet from "../components/Home/BtnSheet";
///Style
import txtStyle from "../style/txtStyle";
import btnStyle from "../components/Actor/style"
///context
import { PreferencesContext } from "../context/PreferencesContext";
import { useSelector } from 'react-redux'

export default function Home({ navigation }) {
	const [img, setImg] = useState(null);
	const [visible, setVisible] = useState(false);
	const [btnSheetHeight, setBtnSheetHeight] = useState(200);
	const btnSheet = useRef();
	const { toggleTheme, isThemeDark } = React.useContext(PreferencesContext);
	const m = useSelector((state) => state.movies.value);
	console.log(m);
	
	useFocusEffect(
		React.useCallback(() => {
			console.log("use callback :)" + visible);
			if (visible){ 
				btnSheet.current?.show(); 
				setVisible(false);
			};
		}, [visible])
	);
	const chageBtnSheet = () => {
		setBtnSheetHeight(454);
		setVisible(true);
	};
	const asignVars = (res) => {
		setImg(res.uri);
		setBtnSheetHeight(385);
		setVisible(true);
	};
	const closeBtnSheet = () => {
		setBtnSheetHeight(200);
		setImg(null);
		btnSheet.current?.hide();
	}
	const goToActor = (name) =>{
		navigation.navigate("Actor",{name: name});
	}
	return (
		<SafeAreaView style={styles.constainer}>
			<View style={btnStyle.headerRightIcon2}>
				<IconButton
					icon="theme-light-dark"
					color="blue"
					animated
					accessibilityLabel="Regresar"
					size={20}
					onPress={() => toggleTheme()}
				/>
			</View>
			<BtnSheet
				btnSheetHeight={btnSheetHeight}
				btnSheet={btnSheet}
				img={img}
				asignVars={asignVars}
				chageBtnSheet={chageBtnSheet}
				closeBtnSheet={closeBtnSheet}
				goToActor={goToActor}
			/>
			<SafeAreaView style={styles.baner}>
				<Text style={txtStyle.title}>Hey, Dev</Text>
				<Text style={[txtStyle.subtitle, styles.subMargin]}>
					Keep up the good work!
				</Text>
				<Text style={txtStyle.text}>¿Quien es el famoso?</Text>
				<TouchableOpacity
					style={styles.dragZone}
					onPress={() => btnSheet.current.show()}>
					<Image source={addImg} style={styles.dragImg} />
					<Text style={styles.dragText}>Presione para elegir una foto</Text>
				</TouchableOpacity>
			</SafeAreaView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	constainer: {
		flex: 1,
		alignItems: "flex-start",
		padding: 30,
	},
	baner: {
		marginVertical: 30,
	},
	subMargin: {
		marginBottom: 20,
	},
	dragZone: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 10,
		backgroundColor: "#F1F5F9",
		borderWidth: 2,
		borderRadius: 1,
		borderStyle: "dashed",
		borderColor: "#3843D0",
	},
	dragImg: {
		width: "100%",
		height: 100,
		resizeMode: "contain",
		marginTop: 30,
		marginHorizontal: "50%",
	},
	dragText: {
		fontFamily: "Roboto",
		fontSize: 14,
		fontWeight: "700",
		color: "#3843D0",
		marginBottom: 30,
	},
});
