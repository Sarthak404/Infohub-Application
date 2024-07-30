import React, { useEffect } from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';






const Underconstruction = ({navigation}) => {
    
    return (
        <View style={Styles.container}>
            <Image source={require('../Images/construct.png')} style={Styles.imgss}/>
            <Text style={{top:10,fontSize:25,fontWeight:'bold',color:"black"}}> Under Development</Text>
        </View>
    )
}


export default Underconstruction;
const Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor:"white"

    },
    imgss:{
        height:280,
        width:280
    }
})
