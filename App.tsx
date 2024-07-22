import { useState, ReactDOM, useRef, useEffect } from 'react'
import { StyleSheet, Text, TouchableNativeFeedbackBase, View, Button, PermissionsAndroid, ScrollView, Dimensions
  ,Image,Animated
 } from 'react-native'
import { pickSingle } from 'react-native-document-picker'
import { launchCamera } from 'react-native-image-picker'
import { request, PERMISSIONS, check, RESULTS } from 'react-native-permissions'
import bgimg from './assets/log_1.png';
import Main from './components/Main'



export default function App() {
  const scaleAnim = useRef(new Animated.Value(1)).current; // Initial scale is 1
  let [mian_page,change_m]=useState(false)
  setTimeout(()=>{
    change_m(true)
    console.log('jdbj');
  },1500)
  useEffect(() => {
    const scaling = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
          
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    scaling.start(); // Start the animation

  }, [scaleAnim]);
  if(mian_page){
    return (
      <Main></Main>
    )
  }
  return (
    <ScrollView>
      <Animated.View style={[sheet.anim_view,{
        transform:[{scale:scaleAnim}]
      }]}>
        <Image source={bgimg} style={{height:200,width:200,borderRadius:15}}></Image>
        <Text style={{fontSize:22,color:'black',fontWeight:'500'}}>Lolotronics</Text>
      </Animated.View>
    </ScrollView>
  )
}



const sheet = StyleSheet.create({
  text: {
    color: "red"
  },
  anim_view:{height:Dimensions.get('window').height,width:Dimensions.get('window').width,
    backgroundColor:'rgba(0,24,0,0.6)',alignItems:'center',justifyContent:'center',
    }
})