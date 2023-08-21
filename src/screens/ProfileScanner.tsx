//import liraries
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  SafeAreaView,
  Dimensions,
  Alert,
  Linking,
} from 'react-native';
import {
  Camera,
  CameraPermissionRequestResult,
  useCameraDevices,
} from 'react-native-vision-camera';
import {Capture} from '../../assets/icons';
import { useNavigation } from '@react-navigation/native';

// create a component
const ProfileScanner = () => {
  const camera = useRef<Camera>(null);
  const devices = useCameraDevices();
  let device: any = devices.front;
  const [hasPermissions, setHasPermissions] = useState<boolean>(false);
  const [isProcessingText, setIsProcessingText] = useState<boolean>(false);
  const [imageResult, setImageResult] = useState<string | undefined>('');
  const navigation = useNavigation()

  useEffect(() => {
    (async () => {
      const cameraPermission: CameraPermissionRequestResult =
        await Camera.requestCameraPermission();
      const microPhonePermission: CameraPermissionRequestResult =
        await Camera.requestMicrophonePermission();
      if (cameraPermission === 'denied' || microPhonePermission === 'denied') {
        Alert.alert(
          'Allow Permissions',
          'Please allow camera and microphone permission to access camera features',
          [
            {
              text: 'Go to Settings',
              onPress: () => Linking.openSettings(),
            },
            {
              text: 'Cancel',
            },
          ],
        );
        setHasPermissions(false);
      } else {
        setHasPermissions(true);
      }
    })();
  }, []);

  const captureAndRecognize = useCallback(async () => {
    try {
      const image = await camera.current?.takePhoto({
        qualityPrioritization: 'quality',
        enableAutoStabilization: true,
        flash: 'on',
        skipMetadata: true,
      });
      console.log('image',image);
      setImageResult(image?.path);
      //@ts-ignore
      navigation.navigate('Home', { ProfileScancard : image?.path })
      setIsProcessingText(true);
      setIsProcessingText(false);
    } catch (err) {
      console.log('err:', err);
      setIsProcessingText(false);
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {device && hasPermissions ? (
        <View>
          <View style={styles.cameraView}>
            <Camera
              photo
              enableHighQualityPhotos
              ref={camera}
              style={styles.camera}
              isActive={true}
              device={device}
            />
          </View>
        </View>
      ) : (
        <Text>No Camera Found</Text>
      )}
      {/* <Image source={{uri:"file://"+ imageResult}} style={{width: 100, height: 100}} /> */}
      {device && hasPermissions && <Pressable
        style={styles.captureBtnContainer}
        onPress={captureAndRecognize}>
        <Image source={Capture} />
      </Pressable>}
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  camera: {
    height: 400,
    width: 330,
  },
  cameraView: {
    marginVertical: 24,
    height: 400,
    width: 330,
    borderRadius: 12,
    overflow: 'hidden',
  },
  captureBtnContainer: {
    position: 'absolute',
    bottom: 80,
  },
});

//make this component available to the app
export default ProfileScanner;
function validateCard(result: string[]) {
  throw new Error('Function not implemented.');
}

