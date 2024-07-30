import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, TextInput } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const Books = ({ navigation }) => {
    const [items, setItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        getdata();
    }, []);

    const getdata = () => {
        firestore()
            .collection('library')
            .get()
            .then(querySnapshot => {
                let tempData = [];
                querySnapshot.forEach(documentSnapshot => {
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
                const { title, author, department } = item.data;
                const lowerCaseQuery = query.toLowerCase();
                return title.toLowerCase().includes(lowerCaseQuery) || author.toLowerCase().includes(lowerCaseQuery) || department.toLowerCase().includes(lowerCaseQuery);
            });
            setItems(filteredItems);
        }
    };
    

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Books</Text>
            <TextInput
                style={styles.searchInput}
                placeholder="Search book by its title, author, or department"
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
                                <Text style={styles.title}>Title:</Text>
                                <Text style={styles.title1}>{item.data.title}</Text>
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.title}>Author:</Text>
                                <Text style={styles.title1}>{item.data.author}</Text>
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.title}>Department:</Text>
                                <Text style={styles.title1}>{item.data.department}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('BooksViewScreen', {
                            data: item.data,
                            id: item.id
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
        marginBottom: 10
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
        left: 10
    },
    editview: {
        flex: 1,
        flexDirection: "column",
        margin: 10

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

export default Books;
