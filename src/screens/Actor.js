import React, {Component, useEffect} from 'react';
/*Components*/
import {Animated, View, Text, Image, Platform, StyleSheet, Linking, TouchableOpacity} from 'react-native';
import { Button, IconButton } from 'react-native-paper';
/*utils*/
import styles from '../components/Actor/style';
import {ThemeUtils, Color} from '../style';
/*Data*/
import formStyle from '../style/formStyle';
import { getColaborationApi } from '../api/Actor';
import { URL_IMG } from '../utils/constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PreferencesContext } from "../context/PreferencesContext";
import { useDispatch } from 'react-redux'
import Movie from '../components/Actor/Movie';
import { add } from '../context/features/counter/counterSlice';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class ArtistScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollY: new Animated.Value(0),
            actor: {},
            movies: [],
        };
    } 
    componentDidMount(){
        (async () => {
            const {route} = this.props;
            const {name} = route?.params;
            this.getActor(name);
        })()
    }
    getActor = async(name) =>{
        const response = await getColaborationApi(name);  
        var obj = {};
        response.results[0].known_for.push(obj);
        this.setState({actor:response.results[0], movies:response.results[0].known_for});
    }

    //For header background color from transparent to header color
    _getHeaderBackgroundColor = () => {
        const {scrollY} = this.state;

        return scrollY.interpolate({
            inputRange: [0, 140],
            outputRange: ['rgba(0,0,0,0.0)', Color.HEADER_COLOR],
            extrapolate: 'clamp',
            useNativeDriver: true,
        });
    };

    //For header image opacity
    _getHeaderImageOpacity = () => {
        const {scrollY} = this.state;

        return scrollY.interpolate({
            inputRange: [0, 140],
            outputRange: [1, 0],
            extrapolate: 'clamp',
            useNativeDriver: true,
        });
    };

    //Song list container position from top
    _getListViewTopPosition = () => {
        const {scrollY} = this.state;

        return scrollY.interpolate({
            inputRange: [0, 250],
            outputRange: [ThemeUtils.relativeWidth(100) - ThemeUtils.APPBAR_HEIGHT - 10, 0],
            extrapolate: 'clamp',
            useNativeDriver: true,
        });
    };

    //header title opacity
    _getHeaderTitleOpacity = () => {
        const {scrollY} = this.state;

        return scrollY.interpolate({
            inputRange: [0, 20, 50],
            outputRange: [0, 0.5, 1],
            extrapolate: 'clamp',
            useNativeDriver: true,
        });
    };

    //artist name opacity
    _getNormalTitleOpacity = () => {
        const {scrollY} = this.state;

        return scrollY.interpolate({
            inputRange: [0, 20, 50],
            outputRange: [1, 0.5, 0],
            extrapolate: 'clamp',
            useNativeDriver: true,
        });
    };

    render() {
        const headerBackgroundColor = this._getHeaderBackgroundColor();

        const headerImageOpacity = this._getHeaderImageOpacity();

        const listViewTop = this._getListViewTopPosition();

        const headerTitleOpacity = this._getHeaderTitleOpacity();

        const normalTitleOpacity = this._getNormalTitleOpacity();
        
        const { navigation } = this.props;

        return (
            <SafeAreaView style={styles.container}>

                <Animated.Image
                    style={[styles.headerImageStyle, {
                        opacity: headerImageOpacity,

                    }]}
                    source={{uri:`${URL_IMG}${this.state.actor.profile_path}`}}/>
                
                <Animated.View style={[styles.headerStyle, {
                    backgroundColor: headerBackgroundColor,
                }]}>
                    <View style={styles.headerLeftIcon}>
                        <IconButton
                            icon="arrow-left"
                            color="black"
                            animated
                            style={{backgroundColor: "white"}}
                            accessibilityLabel="Regresar"
                            size={20}
                            onPress={() => {navigation.goBack()}
                        }
                        />
                    </View>
                    <Carga movies={this.state.movies} />
                    <Animated.Text
                        style={[styles.headerTitle, {
                            opacity: headerTitleOpacity,
                        }]}>
                       {this.state.actor.name}
                    </Animated.Text>

                </Animated.View>


                <Animated.ScrollView
                    overScrollMode={'never'}
                    style={{zIndex: 10}}
                    scrollEventThrottle={16}
                    onScroll={Animated.event([{
                        nativeEvent: {contentOffset: {y: this.state.scrollY}},
                    }], {
                        listener: (event) => {
                        },
                        useNativeDriver: false,
                    })}>
                    <Animated.Text style={[
                        styles.profileTitle, {
                            opacity: normalTitleOpacity,
                        },
                    ]}
                    >
                       {`${this.state.actor.name}`}
                    </Animated.Text>
                    <Animated.Text style={[
                        styles.profileTitle2, {
                            opacity: normalTitleOpacity,
                        },
                    ]}
                    >
                        Popularidad:
                    </Animated.Text>

                    <Animated.Text style={[
                        styles.songCountStyle, {
                            opacity: normalTitleOpacity,
                        },
                    ]}>
                        <Button mode='contained' disabled style={formStyle.btnWarning}>Hombre</Button>
                    </Animated.Text>
                    <Animated.Text style={[
                        styles.songCountStyle2, {
                            opacity: normalTitleOpacity,
                        },
                    ]}>
                        {this.state.actor.popularity} <Icon name="star" style={{ color:"yellow"}}/>
                    </Animated.Text>

                    <Animated.View style={{
                        transform: [{
                            translateY: listViewTop,
                        }],
                    }}>
                    <Text style={styles.titleBody}>Peliculas: </Text>
                        {this.state.movies.map((item, index) => <Movie index={index} item={item} /> )}                    
                    </Animated.View>

                </Animated.ScrollView>
            </SafeAreaView>
        );
    }
}

export function Carga(props) {
    const {movies} = props;
	const { toggleTheme, isThemeDark } = React.useContext(PreferencesContext);
    const dispatch = useDispatch();
    useEffect(() => {
        movies.pop();
        dispatch(add(movies));
    }, [movies])
    return( 
        <View style={styles.headerRightIcon}>
            <IconButton
                icon="theme-light-dark"
                color="white"
                animated
                accessibilityLabel="Regresar"
                size={20}
                onPress={() => toggleTheme()}
            />
        </View>
    );
}