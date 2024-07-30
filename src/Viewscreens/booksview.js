import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Pdf from 'react-native-pdf';


const BooksViewScreen = ({ navigation }) => {
    const route = useRoute();
    const { title, department, author, url } = route.params.data;


    return (

        <View style={styles.container}>

            <View style={styles.box}>
                <Text style={styles.title}>Title:<Text style={{ fontWeight: '100' }}>{title}</Text></Text>
                <Text style={styles.title}>Author:<Text style={{ fontWeight: '100' }}>{author}</Text></Text>
                <Text style={styles.title}>Department:<Text style={{ fontWeight: '100' }}>{department}</Text></Text>
            </View>
            <Pdf
                trustAllCerts={false}
                source={{ uri: url }}
                onLoadComplete={(numberOfPages, filePath) => {
                    console.log(`Number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page, numberOfPages) => {
                    console.log(`Current page: ${page}`);
                }}
                onError={(error) => {
                    console.log(error);
                }}
                onPressLink={(uri) => {
                    console.log(`Link pressed: ${uri}`);
                }}
                style={{ flex: 1,marginTop:10,borderColor:"black",borderRadius:5,borderWidth:1,margin:10 }} />
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:"white"
    },
    box:{
      backgroundColor:"#daf4f7",
      margin:5,
      marginTop:20,
      padding:15,
      borderRadius:10,
      shadowColor: 'yellow',
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.5,
      elevation: 5,
    }
  
  });
export default BooksViewScreen;
