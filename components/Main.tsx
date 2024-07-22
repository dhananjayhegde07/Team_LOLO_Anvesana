import React, { useState } from "react";
import { View, Text, Button, Image, ScrollView, StyleSheet,TouchableOpacity, TouchableOpacityComponent, Linking } from "react-native";
import ResultPage from "./Result";
import {pickSingle} from 'react-native-document-picker'
import bgimg from '../assets/log_1.png';
import Vision from "./Vision";

export default function Main() {
    const [visible, setVisible] = useState(false);
    let [result,set_res]=useState(null)
    let [img,chnage_img]=useState(null)
    let [opencam, set_cam]=useState(false)
    let [cam_data,set_cam_data]= useState(null)
    let file=null
    function handle_click(url){
        Linking.openURL(url)
    }
    if(opencam){
        return (<Vision on_close={()=>{set_cam(false)}} on_capture={async(pic)=>{
            console.log(pic);
            set_cam(false)
            let form=new FormData()
            form.append('file', {
                uri: `file://${pic.path}`, // Prefix with "file://"
                type: 'image/jpeg', // or the appropriate image type
                name: 'photo.jpg',
              });
            try {
            let data=await fetch('http://192.168.169.253:8000/test/',{
                method:'POST',
                body:form
            })
            data=await data.json()
            console.log(data);
            if(data.status=='done'){
                set_cam_data(data)
            }
        } catch (error) {
            console.log(error);
        }
            
        }}>

        </Vision>)
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={bgimg} style={styles.image} />
                <Text style={styles.headerText}>Lolotronics</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.scrollViewContainer}>
                    <View style={styles.box}>
                        <Text style={{
                            fontSize:22,
                            height:100,
                            justifyContent:'center',
                            alignContent:'center'
                        }}>
                            Upload Image File
                        </Text>
                        <View style={{height:300,justifyContent:'flex-start'}}>
                            <Button title="Upload" onPress={async()=>{
                                console.log('upload');
                                file=await pickSingle()
                                chnage_img(file)
                                let form=new FormData()
                                form.append('file',file)
                                try {
                                    let data=await fetch('http://192.168.169.253:8000/test/',{
                                        method:'POST',
                                        body:form
                                    })
                                    data=await data.json()
                                    console.log(data);
                                    if(data.status=='done'){
                                        set_res(data)
                                    }
                                } catch (error) {
                                    console.log(error);
                                }
                                
                            }}></Button>
                            {img && <>
                                <Text style={{marginTop:10}}>{img.name}</Text>
                            </>}
                            {result && <View style={{marginTop:20}}>
                                <Text style={{fontSize:20}}>The component is:</Text>
                                <Text style={{marginTop:10,marginLeft:20,fontWeight:'bold',fontSize:15}}>{result.class}</Text>
                                <Text style={{fontSize:20 ,marginTop:10}}>For more info visit: </Text>
                                <Text style={{marginTop:10,marginLeft:20,fontWeight:'bold',fontSize:15}} onPress={()=>{
                                    handle_click(result.link)
                                }}>{result.link}</Text>
                            </View>}
                        </View>
                    </View>
                    <View style={styles.box}>
                        <Text style={{
                            fontSize:22,
                            height:100,
                            justifyContent:'center',
                            alignContent:'center'
                                 }}>
                                Open Camera
                            </Text>
                        <View style={
                            {height:300,justifyContent:'flex-start'}
                        }
                        >
                            <Button title="Open" onPress={async()=>{
                                console.log('Cam Open');
                                set_cam(true)
                            }}></Button>
                            {cam_data &&<View style={{marginTop:20}}>
                                <Text style={{fontSize:20}}>The component is:</Text>
                                <Text style={{marginTop:10,marginLeft:20,fontWeight:'bold',fontSize:15}}>{cam_data.class}</Text>
                                <Text style={{fontSize:20,marginTop:10}}>For more info visit: </Text>
                                <Text style={{marginTop:10,marginLeft:20,fontWeight:'bold',fontSize:15}} onPress={()=>{
                                    handle_click(cam_data.link)
                                }}>{cam_data.link}</Text>
                            </View>}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
    },
    header: {
        height: 200,
        backgroundColor: 'rgba(95, 158, 160, 0.653)',
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        height: 80,
        width: 80,
        borderRadius: 15,
    },
    headerText: {
        marginLeft: 20,
        fontSize: 23,
    },
    scrollViewContent: {
        flexGrow: 1, // Ensure ScrollView content can grow
    },
    scrollViewContainer: {
        backgroundColor: 'rgba(240, 248, 255, 0.8)',
        marginTop: 10,
    },
    box: {
        height: 400,
        backgroundColor: 'white',
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor:'rgba(255,255,255,0.5)',
        borderWidth:5
    },
});
