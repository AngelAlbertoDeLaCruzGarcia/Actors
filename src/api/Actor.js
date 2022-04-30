import axios from "axios";
import {
	API_URL_NOMADA,
	API_URL_MOVIEDB,
	NOMADA_KEY,
	MOVIEDB_KEY,
} from "../utils//constants";
export async function getActorApi(actor) {
	const url = `${API_URL_NOMADA}/upload`;
	const params = {
		headers: {
			"Content-Type": "multipart/form-data",
			"Nomada": NOMADA_KEY,
		},
	};
	const response = await axios.post(url, actor , params);
	return response;
}
export async function getColaborationApi(name){
	try {
		const url = `${API_URL_MOVIEDB}/3/search/person?query=${name}&api_key=${MOVIEDB_KEY}`;
		const response = await fetch(url);
		const result = response.json();
		return result;
	} catch (error) {
		console.log(error);
		return null;
	}
}