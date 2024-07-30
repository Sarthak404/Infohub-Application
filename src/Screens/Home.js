import React from 'react';
import { StyleSheet, View, Dimensions, Image, Text, ScrollView, TouchableOpacity, } from 'react-native';
import Carousel from 'react-native-snap-carousel';


const { width, height } = Dimensions.get('window');

const Home = ({ navigation }) => {
  const carouselItems = [
    { image: require('../Images/l1.jpg') },
    { image: require('../Images/l2.jpg') },
    { image: require('../Images/l3.jpg') },
  ];

  const renderCarouselItem = ({ item }) => {
    return (
      <View style={styles.carouselItem}>
        <Image source={item.image} style={styles.image} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.uppercon}>
          <View style={styles.HeadingContainer}>
            <Text style={styles.HeadingText}>Hey, hope you'r doing well !!</Text>
          </View>
          <View style={styles.carouselItemlcontainer}>
            <Carousel
              layout="default"
              data={carouselItems}
              renderItem={renderCarouselItem}
              autoplay={true}
              autoplayInterval={3000}
              loop={true}
              sliderWidth={width * 0.9}
              itemWidth={width * 0.9}
            />
          </View>
        </View>
        <View style={styles.CategoryContainer}>
          <View style={styles.categorytitleContainer}>
            <View>
              <Text style={styles.categorytitleText}>Get Information</Text>
            </View>
          </View>
          <View style={styles.categorycard}>
            <TouchableOpacity style={styles.cards} activeOpacity={0.9} onPress={() => navigation.navigate('Books')}>
              <Image source={require('../Images/online-library.png')} style={{ width: '90%', height: '80%' }} />
              <Text style={styles.cardtext}>Digital books</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cards} activeOpacity={0.9} onPress={() => navigation.navigate('Attendance')}>
              <Image source={require('../Images/to-do-list.png')} style={{ width: '90%', height: '80%' }} />
              <Text style={styles.cardtext}>Attendance</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cards} activeOpacity={0.9} onPress={() => navigation.navigate('Announcements')}>
              <Image source={require('../Images/promote.png')} style={{ width: '90%', height: '80%' }} />
              <Text style={styles.cardtext}>Placement News</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cards} activeOpacity={0.9} onPress={() => navigation.navigate('Notices')}>
              <Image source={require('../Images/notice.png')} style={{ width: '90%', height: '80%' }} />
              <Text style={styles.cardtext}>Notices</Text>
            </TouchableOpacity>


          </View>
          <View style={{top:-70}}>
            <View style={styles.categorytitleContainer}>
              <View>
                <Text style={styles.categorytitleText}>Teachers</Text>
              </View>
            </View>
            <TouchableOpacity
              activeOpacity={1}
             onPress={()=>navigation.navigate('Underconstruction')}>
              <View style={styles.therapysection}>
                <View style={styles.therapycard}>
                  <Image
                    style={styles.therapyimg}
                    source={require('../Images/teacher.png')}
                  />
                  <Text style={styles.therapytxt}>
                    Meet our {'\n'}Professors {'\n'}Here
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
  },
  uppercon: {
    padding: 20,
    paddingBottom: -290,
    marginBottom: 10,
    backgroundColor: '#daf4f7',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  HeadingContainer: {},
  HeadingText: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
  carouselItem: {
    marginRight: 100,
    width: width,
    height: height / 4,
    borderRadius: 20,
    backgroundColor: '#daf4f7',
    display: 'flex',
    marginBottom: -10,
  },
  image: {
    width: width - 40,
    height: height / 5,
    borderRadius: 10,
  },
  carouselItemlcontainer: {
    marginTop: 20,

  },
  CategoryContainer: {
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  categorytitleContainer: {
    marginBottom: 10,
  },

  categorytitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    fontFamily: 'Cochin',
  },
  categorycard: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 80
  },
  cards: {
    width: (width - 60) / 2,
    marginBottom: 15,
    height: 160,
    padding: 5,
    flexDirection: "column",
    alignItems: 'center',
    borderRadius: 10,
    elevation: 2,
    backgroundColor: '#daf4f7',

  },
  cardtext: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 10,
    color: "black"
  },
  therapysection: {
    
    marginBottom: 40,

  },
  therapycard: {
    backgroundColor: '#daf4f7',
    height: 150,

    display: 'flex',
    flexDirection: 'row',
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 4,
    padding:20
  },
  therapyimg: {
    width: 120,
    height: 120,
    padding:10
  },
  therapytxt: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
    marginLeft: 25,
    top:10
  },
});

export default Home;
