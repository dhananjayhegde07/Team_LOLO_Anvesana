import React, { useEffect, useRef, useState } from 'react';
import { View, Button, StyleSheet, Text, Alert } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';

const Vision = ({on_capture,on_close}) => {
  const [hasPermission, setHasPermission] = useState(false);
  const cameraRef = useRef<Camera>(null);
  const device = useCameraDevice('back');

  useEffect(() => {
    const requestPermission = async () => {
      const cameraPermission = await Camera.requestCameraPermission();
      setHasPermission(cameraPermission === 'granted');
    };

    requestPermission();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePhoto({flash:'auto'});
        on_capture(photo)

      } catch (e) {
        console.error('Failed to take photo:', e);
      }
    }
  };

  if (!device) return <Text>Loading...</Text>;
  if (!hasPermission) return <Text>No camera permission</Text>;

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
      />
      <View style={styles.buttonContainer}>
        <Button title="Take Picture" onPress={takePicture} />
        <Button title='Close' onPress={on_close}></Button>
      </View>
      <View style={{justifyContent:'center',alignItems:"center"}}>
        <View style={styles.rectangle}>
            <Text></Text>
        </View>
      </View>
      <View style={styles.rectangle_top}>
        <Text style={{fontSize:25,fontWeight:'bold',color:'black'}}>Hold The device steady</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    flexDirection:'row',
    width:250,
    justifyContent:'space-between'
  },
  rectangle:{
    top:100,
    width:350,
    height:500,
    borderColor:'green',
    borderWidth:5,
    justifyContent:'center',
    alignItems:'center'
  },
  rectangle_top:{
    position:'absolute',
    justifyContent:'center',
    top:50,
    width:400,
    alignItems:"center",
    
  }
});

export default Vision;
