import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import  FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; // Correct import for FontAwesome5
import Splash from './src/Screens/Splash';
import Signup from './src/Screens/Signup';
import Login from './src/Screens/Login';
import Profile from './src/Screens/Profile';
import Home from './src/Screens/Home';
import Books from './src/Listscreens/Books';
import Attendance from './src/Listscreens/Attendance';
import Announcements from './src/Listscreens/Announcement';
import Notices from './src/Listscreens/Notice';
import AttendanceViewerScreen from './src/Viewscreens/attendanceview';
import BooksViewScreen from './src/Viewscreens/booksview';
import Viewannouncement from './src/Viewscreens/announceview';
import Viewnotice from './src/Viewscreens/viewnotice';
import Underconstruction from './src/Screens/Underconstruction';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Tabnavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: '#5D5FEF',
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 6,
          backgroundColor: '#fff',
          borderRadius: 15,
          height: 60,
        },
      }}>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => {
            return <FontAwesome5 name="home" size={22} color={color} />; // Use FontAwesome5 instead of FontAwesome
          },
        }}
        component={Home}
        name="Home"
      />
      <Tab.Screen
         options={{
          headerShown: false,
          tabBarIcon: ({ color }) => {
            return <FontAwesome5 name="user" size={22} color={color} />; // Use FontAwesome5 instead of FontAwesome
          },
        }}
        component={Profile}
        name="Profile"
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Splash'>
        <Stack.Screen
          component={Splash}
          name="Splash"
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
        component={Signup} 
        name="Signup" 
        options={{ headerShown: false }} />
        <Stack.Screen 
        component={Login} 
        name="Login" 
        options={{ headerShown: false }} />
        <Stack.Screen
          component={Tabnavigation}
          name="Tabnavigation"
          options={{ headerShown: false }}
        />
        <Stack.Screen 
        component={Profile} 
        name="Profile" 
        options={{ headerShown: false }} />
        <Stack.Screen 
        component={Books} 
        name="Books" 
        options={{ headerShown: false }} />
        <Stack.Screen 
        component={BooksViewScreen} 
        name="BooksViewScreen" 
        options={{ headerShown: false }} />
        <Stack.Screen 
        component={Attendance} 
        name="Attendance" 
        options={{ headerShown: false }} />
        <Stack.Screen 
        component={AttendanceViewerScreen} 
        name="AttendanceViewScreen" 
        options={{ headerShown: false }} />
        <Stack.Screen 
        component={Announcements} 
        name="Announcements" 
        options={{ headerShown: false }} />
        <Stack.Screen 
        component={Viewannouncement} 
        name="Viewannouncement" 
        options={{ headerShown: false }} />
        <Stack.Screen 
        component={Notices} 
        name="Notices" 
        options={{ headerShown: false }} />
        <Stack.Screen 
        component={Viewnotice} 
        name="Viewnotice" 
        options={{ headerShown: false }} />
        <Stack.Screen 
        component={Underconstruction} 
        name="Underconstruction" 
        options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
