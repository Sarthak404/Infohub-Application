import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ActivityIndicator, ToastAndroid, ScrollView } from 'react-native';
import auth from '@react-native-firebase/auth';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      if (user) {
        // If the user is already logged in, navigate to the home screen
        navigation.replace('Tabnavigation');
      } else {
        // If no user is logged in, set initializing to false
        setInitializing(false);
      }
    });

    return subscriber; // Unsubscribe on unmount
  }, []);

  const loginuser = () => {
    auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        // Successfully logged in
        ToastAndroid.show('Successfully Logged In', ToastAndroid.SHORT);
        navigation.replace('Tabnavigation');
      })
      .catch((error) => {
        // Handle login errors
        ToastAndroid.show('Invalid Credentials', ToastAndroid.SHORT);
      });
  };

  if (initializing) {
    // Render loading indicator while initializing authentication state
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#FFDB4F" />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ScrollView>
        <Text style={styles.text}>InfoHub Connect</Text>
        <Image source={require('../Images/user.png')} style={styles.imgss} />

        <View style={{ flexDirection: 'column' }}>
          <Text style={styles.textin}>Email</Text>
          <TextInput
            placeholder='Enter Email'
            placeholderTextColor={"#1C2120"}
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.inputtext}
          />
        </View>
        <View style={{ flexDirection: 'column' }}>
          <Text style={styles.textin}>Password</Text>
          <TextInput
            placeholder='Enter Password'
            placeholderTextColor={"#1C2120"}
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.inputtext}
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            if (email !== '' && password !== '') {
              loginuser();
            } else {
              ToastAndroid.show('Please Enter Data', ToastAndroid.SHORT);
            }
          }}
          activeOpacity={0.9}
        >
          <Text style={styles.btntext}>Log In</Text>
        </TouchableOpacity>
        <View style={styles.LowerContainerContent}>
          <View style={styles.AskLoginContainer}>
            <Text style={styles.txt}>Don't have an account? <TouchableOpacity onPress={() => navigation.replace('Signup')}><Text style={styles.login}> Sign Up</Text></TouchableOpacity></Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff"
  },
  text: {
    marginTop: 50,
    alignSelf: "center",
    fontSize: 25,
    fontWeight: "800",
    color: "blue"
  },
  textin: {
    paddingLeft: 38,
    fontSize: 20,
    marginTop: 20,
    fontWeight: 'bold',
    color: '#000'
  },
  inputtext: {
    paddingLeft: 25,
    height: 50,
    alignSelf: "center",
    backgroundColor: "white",
    color: "#1C2120",
    marginTop: 10,
    width: "80%",
    borderWidth: 0.5,
    borderRadius: 10,
  },
  imgss: {
    height: 200,
    width: 200,
    alignSelf: "center",
    marginTop: -10,
    marginBottom: -18
  },
  btn: {
    paddingLeft: 10,
    height: 50,
    alignSelf: "center",
    marginTop: 30,
    width: "80%",
    borderWidth: 0.5,
    borderRadius: 10,
    backgroundColor: "#daf4f7",
    justifyContent: 'center',
    alignItems: 'center',
  },
  btntext: {
    fontSize: 20,
    fontWeight: "800",
    color: "#000"
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  AskLoginContainer: {
    marginTop: 20,
    alignItems: "center",
    paddingBottom: 20,

  },
  txt: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
    color: "#000"
  },
  login: {
    color: "blue",
  },
});
