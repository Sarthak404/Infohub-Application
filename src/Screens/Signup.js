import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Signup = ({ navigation }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [pass, setPass] = useState('');
  const [dept, setdep] = useState('');
  const [year, setYear] = useState('');
  const [email, setEmail] = useState('');
  const [grno, setGrno] = useState('');

  const signupfun = async () => {
    if (
      name === '' ||
      phone === '' ||
      dept === '' ||
      year === '' ||
      email === '' ||
      grno === '' ||
      pass === ''
    ) {
      ToastAndroid.show(
        'Enter all required fields',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    } else {
      await auth()
        .createUserWithEmailAndPassword(email, pass)
        .then(() => {
          firestore()
            .collection('users').doc(email)
            .set({
              name: name,
              phone: phone,
              dept: dept,
              year: year,
              email: email,
              grno: grno,
            })
            .then(() => {
              console.log('User added successfully!');
            });
          ToastAndroid.show(
            'Registered Successfully',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          navigation.navigate('Login');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            // console.log('That email address is already in use!');
            ToastAndroid.show(ToastAndroid.SHORT, ToastAndroid.CENTER);
          }

          if (error.code === 'auth/invalid-email') {
            // console.log('That email address is invalid!');
            ToastAndroid.show(
              'The email address is invalid!',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          }
          if (error.code === 'auth/weak-password') {
            'That email address is already in use!',
              // console.log('Password should be more than 6 digits!');
              ToastAndroid.show(
                'Password should be more than 6 digits!',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
              );
          }

          console.error(error);
        });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.uppercontainer}>
          <Text style={styles.titletext}>InfoHub Connect</Text>
          <Text style={styles.titlesmllttext}>
            In a world of connectivity, we're the generation streamlining tomorrow's
            path.
          </Text>
          <View style={styles.line} />
          <Text style={styles.regtitle}>Create an account</Text>
        </View>
        <View style={styles.middlecontainer}>
          <TextInput
            style={styles.TextInputArea}
            value={name}
            onChangeText={text => setName(text)}
            placeholder="Enter Name"
            placeholderTextColor="#3d5c5c"
          />
          <TextInput
            style={styles.TextInputArea}
            value={phone}
            onChangeText={text => setPhone(text)}
            keyboardType="numeric"
            placeholder="Phone"
            placeholderTextColor="#3d5c5c"
          />
          <TextInput
            style={styles.TextInputArea}
            value={dept}
            onChangeText={text => setdep(text)}
            placeholder="Enter Department"
            placeholderTextColor="#3d5c5c"
          />
          <TextInput
            style={styles.TextInputArea}
            value={year}
            onChangeText={text => setYear(text)}
            placeholder="Enter Year"
            placeholderTextColor="#3d5c5c"
          />
          <TextInput
            style={styles.TextInputArea}
            value={grno}
            onChangeText={text => setGrno(text)}
            keyboardType="numeric"
            placeholder="Gr.no"
            placeholderTextColor="#3d5c5c"
          />
          <TextInput
            style={styles.TextInputArea}
            value={email}
            onChangeText={text => setEmail(text)}
            placeholder="Enter Email"
            placeholderTextColor="#3d5c5c"
          />
          <TextInput
            style={styles.TextInputArea}
            value={pass}
            onChangeText={text => setPass(text)}
            placeholder="Password"
            placeholderTextColor="#3d5c5c"
            secureTextEntry={true}
          />
          <TouchableOpacity style={styles.registerbtn} onPress={()=>signupfun()} activeOpacity={0.9}>
            <Text style={{ color: '#000' }}>Register</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.AskLoginContainer}>
          <Text style={styles.txt}>Already have an account?{' '}</Text>
          <TouchableOpacity style={styles.login} onPress={() => navigation.navigate('Login')} >
            <Text style={{ color: 'blue' }}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  line: {
    width: '90%',
    height: 1,
    backgroundColor: 'black',
    marginTop: 5,
    marginBottom: 3,
  },
  uppercontainer: {
    width: '100%',
    margin: 20,
  },
  titletext: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
  },
  titlesmllttext: {
    color: '#000',
    fontSize: 15,
  },
  regtitle: {
    fontSize: 20,
    color: "#000",
    fontWeight: "bold",
  },
  middlecontainer: {
    marginTop: -15,
    margin: 20,
  },
  TextInputArea: {
    marginTop: 10,
    marginBottom: 6,
    width: "100%",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
  },
  registerbtn: {
    marginTop: 10,
    marginBottom: 20,
    width: "100%",
    padding: 0,
    height: 50,
    backgroundColor: "#daf4f7",
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: "center",
  },
  AskLoginContainer: {
    marginTop: -25,
    alignItems: 'center',
    paddingBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  login: {
    marginLeft: 5,
  },
  txt: {
    color: '#000',
  },
});
