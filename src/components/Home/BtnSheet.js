import React, {useState} from "react";
import {
	SafeAreaView,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
} from "react-native";
import { Button, Card, Avatar, IconButton } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { BottomSheet } from "react-native-sheet";
import { getActorApi } from "../../api/Actor";
import formStyle from "../../style/formStyle";
import txtStyle from "../../style/txtStyle";

export default function BtnSheet(props) {
	const { btnSheetHeight, btnSheet, img, asignVars, chageBtnSheet, closeBtnSheet, goToActor } = props;
	const [resRequest, setResRequest] = useState("Buscando...");
	const [statusRequest, setStatusRequest] = useState(0);
	const [titleBtnS, setTitleBtnS] = useState("Subiendo...");
	var status = 0;

	var options = {
		mediaTypes: ImagePicker.MediaTypeOptions.Images,
		allowsEditing: true,
		aspect: [4, 3],
		quality: 1,
	};
	const pickImg = async () => {
		btnSheet.current.hide();
		var response = await ImagePicker.launchImageLibraryAsync(options);
		aprovation(response);
	};
	const takePhoto = async () => {
		btnSheet.current.hide();
		var response = await ImagePicker.launchCameraAsync(options);
		aprovation(response);
	};
	function aprovation(response) {
		console.log(response);
		if (!response.cancelled) {
			asignVars(response);
			getActor(response.uri);
		}
	}
	function clearVars(){
		setStatusRequest(0);
		setResRequest("Buscando...");
		setTitleBtnS("Subiendo...");
		closeBtnSheet();
	}
	const getActor = async (img) => {
		let filename = img.split("/").pop();
		let match = /\.(\w+)$/.exec(filename);
		let type = match ? `image/${match[1]}` : `image`;
		let formData = new FormData();
		formData.append('file',{ uri: img, name: filename, type: type });
		try {
			const response = await getActorApi(formData);
			if(response.status == 200)
			{
				if(response.data.error.length > 0)
				{
					setResRequest("No se encontró");
					status = 2;
					setTitleBtnS("¿Es un famoso?");
					btnSheet.current.hide();
					chageBtnSheet();
				}else{
					setResRequest(response.data.actorName);
					status = 1;
					setTitleBtnS("Listo");
					setTimeout(() => {
						clearVars();
						goToActor(response.data.actorName)
					}, 3000);
					
				}
			}
		} catch (error) {
			console.log(error.toJSON());
			setResRequest("Error de red o de servidor");
			status = 3;
			setTitleBtnS("Hubo un error");
			btnSheet.current.hide();
			chageBtnSheet();
		}
		setStatusRequest(status);
	};

	return (
		<SafeAreaView>
			<BottomSheet
				///hasDraggableIcon
				ref={btnSheet}
				height={btnSheetHeight}
				borderRadius={20}>
				{img ? (
					<SafeAreaView style={styles.containerActor}>
						<Text style={[txtStyle.subtitle, styles.titleSheet]}>
							{titleBtnS}
						</Text>
						<Image source={{ uri: img }} style={styles.actor} />
						<>
						{ statusRequest < 2 ? (
								<Button  mode='contained' 
									style={[statusRequest == 0 ? 
										formStyle.btnPrimary : 
										formStyle.btnSuccess, styles.mTop
									]}>
									{resRequest}
								</Button>
							):(
								<>
								<Button  mode='contained' disabled={statusRequest == 2 ? true : false}
									style={[ statusRequest == 2 ?
										formStyle.btnWarning : 
										formStyle.btnDanger, styles.mTop
									]}>
									{resRequest}
								</Button>
								<Button mode='contained' 
									onPress={clearVars} 
									style={[styles.btnClose, styles.mTop]}>
									Cerrar
								</Button>
								</>
							)
						}
						</>
					</SafeAreaView>
				) : (
					<>
					<Text style={[txtStyle.subtitle, styles.titleSheet]}>
						Seleccione una foto
					</Text>
					<TouchableOpacity onPress={pickImg}>
						<Card.Title
							title='Galeria de fotos'
							left={(props) => (
								<Avatar.Icon
									{...props}
									icon='image-outline'
									color='black'
									backgroundColor='#F3F3F3'
								/>
							)}
						/>
					</TouchableOpacity>
					<TouchableOpacity onPress={takePhoto}>
						<Card.Title
							title='Camara'
							left={(props) => (
								<Avatar.Icon
									{...props}
									icon='camera'
									color='black'
									backgroundColor='#F3F3F3'
								/>
							)}
						/>
					</TouchableOpacity>
					</>
				)}
			</BottomSheet>
		</SafeAreaView>
	);
}
const styles = StyleSheet.create({
	titleSheet: {
		textAlign: "center",
		marginTop: 15,
	},
	containerActor: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 0,
	},
	actor: {
		width: "100%",
		height: 200,
		resizeMode: "contain",
		marginTop: 30,
		borderRadius: 36,
	},
	mTop:{
		marginTop: 20,
	},
	btnClose: {
		width: "80%", 
		padding: 5,
		backgroundColor:"#3843D0",	
		borderRadius: 12,	
	}
});
