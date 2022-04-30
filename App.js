import React from "react";
import { StatusBar } from "expo-status-bar";
import {
	DarkTheme as NavigationDarkTheme,
	DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { 
	Provider as PaperProvider, 
	DarkTheme as PaperDarkTheme,
	DefaultTheme as PaperDefaultTheme
}from "react-native-paper";
import AppNavigation from "./src/Navigation/AppNavigation";
///context
import merge from 'deepmerge';
import {PreferencesContext} from "./src/context/PreferencesContext"
///redux
import store from './src/context/store';
import { Provider } from 'react-redux';


const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

export default function App() {

	const [isThemeDark, setIsThemeDark] = React.useState(false);

	let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

	const toggleTheme = React.useCallback(() => {
	return setIsThemeDark(!isThemeDark);
	}, [isThemeDark]);

	const preferences = React.useMemo(
		() => ({
			toggleTheme,
			isThemeDark,
		}),
		[toggleTheme, isThemeDark]
	);
	return (
		<Provider store={ store }>
			<PreferencesContext.Provider value={preferences}>
				<PaperProvider theme={theme}>
					<AppNavigation theme={theme}/>
					<StatusBar style='auto' />
				</PaperProvider>
			</PreferencesContext.Provider>
		</Provider>
	);
}
