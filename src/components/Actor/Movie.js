import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import MaterialAnimatedView from './MaterialAnimatedView';
import styles from './style';
import { URL_IMG } from '../../utils/constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Movie(props) {
    const {index, item} = props;
    return (
        <MaterialAnimatedView key={index.toString()} index={index}>
            <TouchableOpacity activeOpacity={0.8} style={styles.artistCardContainerStyle}
                                onPress={() => {}}>
                <View style={styles.cardTextContainer}>
                    <Text numberOfLines={1} style={styles.songTitleStyle}>{item?.title}</Text>
                    <Text numberOfLines={5} style={styles.sinopsis}>{item?.overview}</Text>
                </View>
                <View style={styles.imgVal}>
                    <Image source={{uri:`${URL_IMG}${item?.poster_path}`}} style={[styles.artistImage, {marginBottom: 5}]}/>
                        <Text numberOfLines={1} style={[styles.valMovie,{textAlign:"center"}]}>
                            {item?.vote_average} <Icon name="star" style={{ color:"yellow"}}/>
                        </Text>
                </View>
            </TouchableOpacity>
        </MaterialAnimatedView>
    );
}