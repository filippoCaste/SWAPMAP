import { React } from "react";
import { Pressable, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Navbar } from "./utils/Navbar.jsx";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome,
  Feather,
} from "@expo/vector-icons";

import extStyle from "../style.js";
import { Divider } from 'react-native-paper';


export default function UserProfile  () {
    const navigation = useNavigation();

    return(
        <>
        {/* <Navbar /> */}

        <Pressable>
            <View style={extStyle.profileMenu}>
            <MaterialCommunityIcons
                name="account-circle"
                size={35}
                color="#163f2e"
                style={{paddingTop:15}}s
              />
            <Text style={extStyle.profileText}> Profile Information </Text>
            
            </View>
        </Pressable>
        <Divider />

        <Pressable onPress={()=> navigation.navigate("MyTickets", { path: ["Profile"] })}>
            <View style={extStyle.profileMenu}>
            <MaterialCommunityIcons
                name="ticket-confirmation-outline"
                size={35}
                color="#163f2e"
                style={{paddingTop:15}}s
              />
            <Text style={extStyle.profileText}> My Tickets </Text>
            
            </View>
        </Pressable>
        <Divider />
        <Pressable onPress={()=> navigation.navigate("MyEvents", { path: ["Profile"] })}>
            <View style={extStyle.profileMenu}>
            <MaterialIcons name="event-note" size={35} color="#163f2e" style={{paddingTop:15}}/>
            <Text style={extStyle.profileText}> My Events </Text>
            
            </View>
        </Pressable>
        
        <Divider />

        </>

        

    )
    


}

