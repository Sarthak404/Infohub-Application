import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ScrollView, Image, ToastAndroid } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import Login from './Login'; // Import the Login screen component

const { width, height } = Dimensions.get('window');

const Profile = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth().currentUser;
        if (user) {
          const userDoc = await firestore().collection('users').doc(user.email).get();
          if (userDoc.exists) {
            setUserData(userDoc.data());
          } else {
            console.log("User data not found in Firestore");
          }
        } else {
          console.log("No user is signed in");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
      setInitializing(false); // Set initializing to false once user data is fetched
    };

    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        setUserEmail(user.email);
      } else {
        // No user is signed in.
        setUserEmail(null);
      }
      // Set initializing to false once authentication state is determined
      setInitializing(false);
    });

    fetchUserData();
    // Unsubscribe from the listener when component unmounts
    return unsubscribe;
  }, []);

  const handleSignOut = () => {
    auth().signOut().then(() => {
      // Sign-out successful.
      ToastAndroid.show('Successfully Signed Out', ToastAndroid.SHORT);
      navigation.navigate("Login"); // Navigate to the Login screen after sign-out
    }).catch((error) => {
      // An error happened.
      console.error(error);
    });
  };

  if (initializing) {
    // Return null while initializing to avoid splash screen blink
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <Image source={require('../Images/profile.png')} style={styles.imgss} />
        <Text style={styles.userInfo}>{userData && userData.name}</Text>
      </View>
      <ScrollView>
        <View style={styles.lowercontainer}>
          <Text style={styles.label}>Name: <Text style={styles.dark}>{userData && userData.name}</Text></Text>
          <View style={styles.line}/>
          <Text style={styles.label}>Department: <Text style={styles.dark}>{userData && userData.dept}</Text></Text>
          <View style={styles.line}/>
          <Text style={styles.label}>Year: <Text style={styles.dark}>{userData && userData.year}</Text></Text>
          <View style={styles.line}/>
          <Text style={styles.label}>Phone: <Text style={styles.dark}>{userData && userData.phone}</Text></Text>
          <View style={styles.line}/>
          <Text style={styles.label}>Gr.no: <Text style={styles.dark}>{userData && userData.grno}</Text></Text>
          <View style={styles.line}/>
          <TouchableOpacity style={styles.btn} onPress={handleSignOut} activeOpacity={0.9}><Text style={{color:"#000",fontSize:15,fontWeight:"bold"}}>Log Out</Text></TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: 'black',
    marginTop: 5,
    marginBottom: 3,
  },
  upperContainer: {
    padding: 20,
    flexDirection: "column",
    width: "100%",
    backgroundColor: "#daf4f7",
    paddingBottom: 45,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30, // Apply bottom radius of 10
  },
  imgss: {
    height: 150,
    width: 150,
    alignSelf: "center",
    marginTop: -10,
    marginBottom: -18
  },
  userInfo: {
    alignSelf: "center",
    top: 30,
    fontSize: 20,
    fontWeight: "bold",
    color: "black"
  },
  label: {
    fontSize: 20,
    color: "black",
    marginBottom: 5,
    marginTop: 10
  },
  dark: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 10
  },
  lowercontainer: {
    height: "100%",
    width: '100%',
    padding: 20,
    paddingTop: 20
  },
  btn:{
    paddingLeft: 10,
    height: 50,
    alignSelf: "center",
    marginTop: 20,
    marginBottom:50,
    width: "100%",
    borderWidth: 0.5,
    borderRadius: 10,
    backgroundColor: "#daf4f7",
    justifyContent: 'center',
    alignItems: 'center',
  }
});
