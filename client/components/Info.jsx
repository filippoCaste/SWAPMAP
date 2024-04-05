import { ScrollView } from "@gluestack-ui/themed";
import { React } from "react";
import { Pressable, Text, View } from "react-native";
import extStyle from "../style";
import { Card, Title } from "react-native-paper";
import { Navbar } from "./utils/Navbar";


export default function ShowInfo  () {
    //c//onst navigation = useNavigation();

    return(
        <>
            {/* <Navbar /> */}
            
            <ScrollView style={{backgroundColor:"white"}}>
                <Card mode="contained" style={extStyle.card}>
                    
                    <Card.Content>
                        <Title style={extStyle.cardTile}>How SwapMap Works</Title>
                        <Text style={extStyle.paragraph}>To help you exchange preloved clothes more easily, SwapMap helps you find all the clothes-swapping 
                        events around you. Browse and find the most interesting events near you! </Text>
                    </Card.Content>
                </Card>
                
                <Card mode="contained" style={extStyle.card}>
                    
                    <Card.Content>
                        <Title style={extStyle.cardTile}>SwapMap Level System</Title>
                        <Text style={extStyle.paragraph}>Each event requires a specific minimum level of the attendees so that they have a set of pre-requisite information that allows them to fully follow the event's learning activities. 
                        To increase your level, you must navigate to the "Tests" section of the application,watch a video-lecture, and complete a set of questions related to 
                        the topic. You reach the next level when you earn 10 experience points.{`\n`}
                        Score: {`\n`}
                        60%-70% to earn 2 points {`\n`}
                        71%-80% to earn 5 points {`\n`}
                        81%-100% to earn 8 points </Text>
                        
               

                    </Card.Content>
                </Card>
    
                <Card mode="contained" style={extStyle.card}>
                    
                    <Card.Content>
                        <Title style={extStyle.cardTile}>Creating Events</Title>
                        <Text style={extStyle.paragraph}>Once you are experienced enough with swapping and attending events, SwapMap allows you to 
                create and organize events yourself. The only requirement is that you have a minimum level of 20.
                Navigate to "Create Event" and start organizing!</Text>

                    </Card.Content>
                </Card>

            </ScrollView>
        </>

    )

}

