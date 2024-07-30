import React, { useEffect } from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';






const Splash = ({navigation}) => {
    useEffect(()=>{
       setTimeout(() => {
          navigation.navigate('Login')
       }, 3000);
    },[])
    return (
        <View style={Styles.container}>
            <Image source={require('../Images/InfoHub.png')} style={Styles.imgss}/>
        </View>
    )
}


export default Splash;
const Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor:"#daf4f7"

    },
    imgss:{
        height:280,
        width:280
    }
})
