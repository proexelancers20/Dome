//import liraries
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';

const dummyImage =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBggIBwcIBwcICAoIBwcIBxAICQcKFREiFhURHx8YKCggGBolGx8fITEhJSkrLi4uFx8zODMsNygtLisBCgoKDQ0NFQ0PFS0ZFRkrKysrNysrNzcrKzctLSsrNy0rKy0rKysrKysrKy0rKystKysrKysrKys3KysrKysrK//AABEIASsAqAMBEQACEQEDEQH/xAAYAAEBAQEBAAAAAAAAAAAAAAAAAQIDB//EABsQAQEBAAMBAQAAAAAAAAAAAAABEQIhQTED/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAGBEBAQEBAQAAAAAAAAAAAAAAAAERAiH/2gAMAwEAAhEDEQA/APcQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAS1E1VUAAAAAAAAAAAAAAAAAABPUFUAAAAAAAAAAAAKAAAACegoMxkaaAAAAAAAAAAAAAAAAAEiQVQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABKgqgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACRBVAAAAAAAAAAAAAAAAAACoCgACeoKoAAAAAAAAAAAAAAAAAAAICgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQFAAAAAAAAAAAAAAAAAAAASAoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAnqCqAAAAAAAAAAAAAAAAAAAJEFUAAAAAAREIKqgAAAAAAAAAAAAAAAACVBLclqpTh3CkaFAAAAAAAAAAAAAAAAAEGOc2YsZ6jXGZBYooAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACW4DF5zcMZ3bjcvSNJvYNKAAAAAAAAAAAAAAAAMc9s6IzXOfnd2lpzM9dcyI0zx3d8QdGgAAAAAAAAAAAAAAABMBQASRBVAAAAAAAAAAAAAAAAAAEtxBOP0GlAAAAAAAAAAAAAAAAAAEvxKEBVAAAAAH/9k=';

// create a component
const Home = () => {
  const navigate = useNavigation();
  const route = useRoute();
  return (
    <View style={styles.container}>
      {route?.params != undefined && (
        <Image
          source={{
            uri:
              route?.params?.Scancard != undefined
                ? 'file://' + route?.params?.Scancard
                : route?.params?.ProfileScancard != undefined
                ? 'file://' + route?.params?.ProfileScancard
                : dummyImage,
          }}
          style={
            route?.params?.ProfileScancard != undefined
              ? [styles.cameraView, styles.extraStyle]
              : styles.cameraView
          }
        />
      )}

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '100%',
        }}>
        <Pressable
          onPress={() => {
            navigate.navigate('CardScanner');
          }}
          style={styles.button}>
          <Text style={styles.buttonText}>Card scan</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            navigate.navigate('ProfileScanner');
          }}
          style={styles.button}>
          <Text style={styles.buttonText}>Profile scan</Text>
        </Pressable>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  cameraView: {
    marginVertical: 24,
    height: 240,
    width: 360,
    borderRadius: 12,
    overflow: 'hidden',
  },
  extraStyle: {
    height: 400,
    width: 330,
  },
  button: {
    padding: 12,
    backgroundColor: 'silver',
    borderRadius: 10,
  },
  buttonText: {fontSize: 18, color: '#fff'},
});

//make this component available to the app
export default Home;
