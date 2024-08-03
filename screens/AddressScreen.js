import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'

const AddressScreen = () => {
      const [name,setName] = useState("");
      const [mobileNo,setMobileNo] = useState("");
      const [houseNo,setHouseNo] = useState("");
      const [street,setStreet] = useState("");
      const [landmark,setLandmark] = useState("");
      const [postalCode,setPostalCode] = useState("");


  return (
    <ScrollView style={{marginTop:50}}>
      <View style={{height:50,backgroundColor:"#00CED1"}}/>
      <View style={{padding:10}}>
        <Text style={{fontSize:17,fontWeight:"bold"}}>Add a new adress</Text>
        <TextInput placeholderTextColor="black"
         placeholder='Morocco'
          style={{padding:10,borderColor:"#D0D0D0"
          ,borderWidth:1,marginTop:10,borderRadius:5}}/>
          <View style={{marginVertical:10}}>
            <Text style={{fontSize:15,fontWeight:"bold"}}>Full name (First name and last name)</Text>
            <TextInput 
            value={name}
            onChangeText={(text)=>setName(text)}
            placeholderTextColor="black"
             style={{padding:10,borderColor:"#D0D0D0",borderWidth:1,marginTop:10,borderRadius:5}}
            placeholder='Enter your name'/>
          </View>
          <View>
            <Text style={{fontSize:15,fontWeight:"bold"}}>Mobile number</Text>
            <TextInput 
            value={mobileNo}
            onChangeText={(text)=>setMobileNo(text)}
            placeholderTextColor="black"
             style={{padding:10,borderColor:"#D0D0D0",borderWidth:1,marginTop:10,borderRadius:5}}
            placeholder='Mobile number'/>
          </View>
          <View style={{marginVertical:10}}>
            <Text style={{fontSize:15,fontWeight:"bold"}}>Flat,House number,building</Text>
            <TextInput
            value={houseNo}
            onChangeText={(text)=>setHouseNo(text)}
            placeholderTextColor="black"
             style={{padding:10,borderColor:"#D0D0D0",borderWidth:1,marginTop:10,borderRadius:5}}
            placeholder=''/>
          </View>
          <View>
            <Text style={{fontSize:15,fontWeight:"bold"}}>Area,Street,sector,village</Text>
            <TextInput
            value={street}
            onChangeText={(text)=>setStreet(text)}
            placeholderTextColor="black"
             style={{padding:10,borderColor:"#D0D0D0",borderWidth:1,marginTop:10,borderRadius:5}}
            placeholder=''/>
          </View>
          <View style={{marginVertical:10}}>
            <Text style={{fontSize:15,fontWeight:"bold"}}>LandMark</Text>
            <TextInput
            value={landmark}
            onChangeText={(text)=>setLandmark(text)}
            placeholderTextColor="black"
             style={{padding:10,borderColor:"#D0D0D0",borderWidth:1,marginTop:10,borderRadius:5}}
            placeholder='Ex : near Mohamed 5 school'/>
          </View>
          <View >
            <Text style={{fontSize:15,fontWeight:"bold"}}>Pincode</Text>
            <TextInput 
            value={postalCode}
            onChangeText={(text)=>setPostalCode(text)}
            placeholderTextColor="black"
             style={{padding:10,borderColor:"#D0D0D0",borderWidth:1,marginTop:10,borderRadius:5}}
            placeholder='Enter pincode'/>
          </View>
          <Pressable style={{backgroundColor:"#FFC72C",padding:19,justifyContent:"center",
            alignItems:"center",marginTop:20

          }}>
            <Text style={{fontWeight:"bold"}}>Add Adress</Text>
          </Pressable>
      </View>
    </ScrollView>
  )
}

export default AddressScreen

const styles = StyleSheet.create({})