import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity ,TextInput} from 'react-native';
import firestore from '@react-native-firebase/firestore';


const Attendance = ({ navigation }) => {
    const [items, setItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        getdata();
    }, []);

    const getdata = () => {
        firestore()
            .collection('attendance')
            .get()
            .then(querySnapshot => {
                console.log('Total users: ', querySnapshot.size);
                let tempData = [];
                querySnapshot.forEach(documentSnapshot => {
                    console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
                    tempData.push({ id: documentSnapshot.id, data: documentSnapshot.data() });
                });
                setItems(tempData);
            });
    };
    
    const filterBooks = (query) => {
        setSearchQuery(query);
        if (query === '') {
            getdata();
        } else {
            const filteredItems = items.filter(item => {
                const { year,department,month } = item.data;
                const lowerCaseQuery = query.toLowerCase();
                return  year.toLowerCase().includes(lowerCaseQuery) || department.toLowerCase().includes(lowerCaseQuery)|| month.toLowerCase().includes(lowerCaseQuery);
            });
            setItems(filteredItems);
        }
    };
    

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Attendance</Text>
            <TextInput
                style={styles.searchInput}
                placeholder="Find attendance from year, month, department"
                placeholderTextColor={'black'}
                onChangeText={filterBooks}
                value={searchQuery}
            />
            <FlatList
                data={items}
                renderItem={({ item, index }) => (
                    <View style={styles.itemview}>

                        <View style={styles.editview}>
                            <View style={styles.textContainer}>
                                <Text style={styles.title}>Year:</Text>
                                <Text style={styles.title1}>{item.data.year}</Text>
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.title}>Department:</Text>
                                <Text style={styles.title1}>{item.data.department}</Text>
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.title}>Month:</Text>
                                <Text style={styles.title1}>{item.data.month}</Text>
                            </View>
                            
                            
                           
                        </View>
                        
                        <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('AttendanceViewScreen',{
                            data:item.data,
                            id:item.id
                        })}><Text>View</Text></TouchableOpacity>
                    </View>
                )}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    text: {
        marginTop: 10,
        alignSelf: "center",
        fontSize: 25,
        fontWeight: "800",
        color: "black"
    },
    searchInput: {
        marginTop: 15,
        marginBottom:-5,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        height: 50,
        borderWidth: 2,
        borderColor: '#ddd',
        borderRadius: 10,
    },
    itemview: {
        flexDirection: 'row',
        backgroundColor: '#daf4f7',
        width: '90%',
        alignSelf: 'center',
        elevation: 4,
        marginTop: 20,
        borderRadius: 10,
        padding: 5,
        marginBottom:10
    },
    imgitem: {
        height: 100,
        width: 100,
    },
    textContainer: {
        marginLeft: 10,
        flex: 1,
        flexDirection: 'row'
    },
    title: {
        fontSize: 16,
        fontWeight: "bold"
    },
    title1: {
        fontSize: 16,
        left:10
    },
    description: {
        fontSize: 14,
        marginTop: 5,
    },
    editview: {
        flex: 1,
        flexDirection: "column",
        margin:10

    },
    viewimg: {
        height: 25,
        width: 25,
        marginLeft: 10,
        left:90
       
    },
    timestamp: {
        fontSize: 14,
        marginTop: 5,
        left:10,
        color: 'gray' // or any color you prefer
    },
    btn: {
        
        height: 30,
        
        marginTop: 30,
        width: 90,
        borderWidth: 0.5,
        borderRadius: 10,
        backgroundColor: "white",
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default Attendance;
