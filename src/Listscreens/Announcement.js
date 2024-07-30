import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TextInput, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';


const Announcelist = ({ navigation }) => {
    const [items, setItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        getdata();
    }, []);

    const getdata = () => {
        firestore()
            .collection('announcements')
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
                const {title} = item.data;
                const lowerCaseQuery = query.toLowerCase();
                return  title.toLowerCase().includes(lowerCaseQuery) ;
            });
            setItems(filteredItems);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Announcements</Text>
            <TextInput
                style={styles.searchInput}
                placeholder="Search announcements from title"
                placeholderTextColor={'black'}
                onChangeText={filterBooks}
                value={searchQuery}
            />
            <FlatList
                data={items}
                renderItem={({ item, index }) => (
                    <View style={styles.itemview}>
                        <Image source={{ uri: item.data.imageUrl }} style={styles.imgitem} />

                        <View style={styles.editview}>
                            <View style={styles.textContainer}>
                                <Text style={styles.title}>Title:</Text>
                                <Text style={styles.title1}>{item.data.title}</Text>


                            </View>
                            <Text style={{ color: 'black', fontSize: 15, top: 8, left: 11, fontWeight: 'bold' }}>
                                    Date: <Text style={{ fontWeight: '100', color: 'grey' }}>{item.data.timestamp}</Text>
                                </Text>
                            <View style={{ flex: 1, flexDirection: "row", marginTop: 40, }}>
                               
                                
                                <TouchableOpacity onPress={() => navigation.navigate('Viewannouncement', {
                                    data: item.data,
                                    id: item.id
                                })} style={styles.btn}><Text>View</Text></TouchableOpacity>
                            </View>

                        </View>
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
    },
    imgitem: {
        height: 120,
        width: 100,
    },
    textContainer: {
        marginLeft: 10,
        flex: 1,
        flexDirection: 'row'
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color:'black'
    },
    title1: {
        fontSize: 16,
    },
    description: {
        fontSize: 14,
        marginTop: 5,
    },
    editview: {
        flex: 1,
        flexDirection: "column",

    },
    viewimg: {
        height: 30,
        width: 30,
        marginLeft: 10
    },
    timestamp: {
        fontSize: 14,
        marginTop: 5,
        left: 10,
        color: 'gray' // or any color you prefer
    },
    btn: {
        bottom:15,
        left:20,
        height: 30, 
        width: '90%',
        borderWidth: 0.5,
        borderRadius: 10,
        backgroundColor: "white",
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default Announcelist;
