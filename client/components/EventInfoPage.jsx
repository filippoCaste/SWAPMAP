import EVENTS_API from '../apis/event.api.js';
import USER_API from '../apis/user.api.js';
import React, { useState, useEffect } from 'react';
import { Pressable, Text, View } from 'react-native';
import extStyle, { mainContent, text } from '../style.js';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Map } from './utils/Map.jsx';
import { ConfirmationAlert } from './utils/ConfirmationAlert.jsx';
import { SuccessfulAlert } from './utils/SuccessfulAlert.jsx';
import { ScrollView } from '@gluestack-ui/themed';
import { Divider } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import Breadcrumb from './utils/Breadcrumb.jsx';
import openMap from 'react-native-open-maps';
import { cardStyle } from "../style";

const dayjs = require('dayjs')

export default function EventInfoPage({ route, navigation }) {

    const { event, option, userId, userEvents, updateUserEvents, handleNavigate } = route.params;
    const path = [...route.params.path, "EventInfo"]
    
    const successfulMessage='Your ticket details are now available in the "MyTickets" section of the app'

    const [eventDetails, setEventDetails] = useState([]);
    const [longitude, setLongitude] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [joined, setJoined] = useState(false);
    const [wrongLevel, setWrongLevel] = useState(false);
    const [askConfirmation, setAskConfirmation] = useState(false);
    const [successfulAlert, setSuccessfulAlert] = useState(false);
    const [categoryTitle, setCategoryTitle] = useState([]);
    const [eventDescription, setEventDescription] = useState('');

    function _goToYosemite(location) {
        openMap({ start:"", end:`${location}` , travelType:"walk"}); 
      }

    useEffect(() => {
        setLongitude(Number(event.content.location.split(",")[0]));
        setLatitude(Number(event.content.location.split(",")[1]));

        const fetchEventDetails = async () => {
            try {
                const eventDetailsResult = await EVENTS_API.getEventDetailsById(event.id);
                const user = await USER_API.getUser(userId);
                const userLevel = Math.floor(user.experience/10);
                console.log(eventDetailsResult);
                setEventDetails(eventDetailsResult);
                setCategoryTitle(eventDetailsResult.map(e => {return e.categoryTitle;}));
                setEventDescription(eventDetailsResult[0].eventDescription);
                // check whether the user already has joined this event
                const res = userEvents.filter(e => e.id == event.id);
                if (res.length > 0) {
                    setJoined(true);
                }

                // check whether the user has the required level
                if (event.content.level > userLevel) {
                    setWrongLevel(true);
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchEventDetails().then();
    }, []);

    const joinEvent = async () => {
        try {
            await EVENTS_API.joinEvent(event.id, userId);
            updateUserEvents(event);
            setJoined(true);
            setAskConfirmation(false);
            setSuccessfulAlert(true);
        } catch (error) {
            console.error(error);
        }
    }

    const backNavigation = () => {
        if (option==="") {
            navigation.navigate('MyEvents', {path: path.slice(0, -2)});
        } else if (option==="qrCode") {
            navigation.navigate('MyTickets', { path: path.slice(0, -2) });
        } else {
            navigation.navigate('Home');
        }
            
    }

    return (
        <>
        <View style={extStyle.pageContainer}>
            <View style={{flexDirection:'row'}}>
            <View style={extStyle.backButtonContainer}>
                <Pressable style={extStyle.backButton} onPress={() => backNavigation()}><Ionicons name="arrow-back" size={24} color="white" /></Pressable>
            </View>
                <Breadcrumb path={path} onNavigate={handleNavigate} />
            </View>
        </View>
        <ScrollView>
            <View
                style={mainContent.container}
            >
                <Text style={[text.value, text.title]}>{event ? event.title : 'No title'}</Text>
                <Text style={text.value}>{eventDescription ? eventDescription : 'No description'}</Text>
                <Text style={text.label}>Date and Time:</Text>
                <Text style={text.value}>{event ? dayjs(event.date).format("YYYY/MM/DD") : 'No date'} at {event ? event.content.startTime : 'No time'}</Text>
                <Text style={text.label}>Activities:</Text>
                {eventDetails.map((ed, index) => {
                    return (<> 
                   
                    <View key={"activity" + index} style={{ marginBottom: 5, justifyContent:'flex-start', alignItems:'flex-start', alignContent:'flex-start', marginLeft:0, marginTop:'2%' }}>

                        {/*this version makes the badge as wide as the screen}

                        {/* <View style={{ display: 'inline-flex' }}> */}
                            {/* <Badge  size="lg" variant="solid" borderRadius="$xl" action="info" ml="$1" style={{ display: 'flex',flexDirection: 'row', alignItems:'center', width: 'fit-content', backgroundColor: '#F4FBF8',  marginBottom:5, padding: 3}}>
                                <BadgeText style={{ fontSize: 15,fontWeight:'bold', padding:2, color: '#163f2e',textAlign:'left' }}>{ed.categoryTitle.toUpperCase()}</BadgeText>
                            </Badge> */}

                            {/*This version makes the badge fit the content but it is aligned to the right and not to the left of the page*/}
                            
                            <Text  variant="solid" style={{marginLeft:'0%',  width: 'fit-content',height:'fit-content', padding: 6,backgroundColor: '#F4FBF8',  marginBottom:5,fontSize: 15,fontWeight:'bold', color: '#163f2e'}}>
                            {ed.categoryTitle.toUpperCase()}
                            </Text>
                         


                            <Text style={[text.label, marginLeft=0]}>{ed ?ed.activityTitle : 'No activity title'}</Text>
                        {/* </View> */}
                        <Text style={text.value}>{ed ? ed.activityDescription : 'No activity description'}</Text>
                    
                    </View>
                    <Divider/>

                    </>)
                })}
                
            <View style={{marginTop:12}}>
                <Text style={text.label}>Minimum level required:</Text>
                </View>
                <Text style={text.value}>{event ? event.content.level : 'No level'}</Text>

                <Text style={text.label}>Address:</Text>
                {event ? <Pressable onPress={()=>_goToYosemite(event.content.location)}>
                <Text style={text.valueLocation}>{event.content.location }</Text>
                </Pressable>
                :
                <Text style={text.value}>{'No location'}</Text>
                }
            </View>
            <View style={{
                borderRadius: 8,
                margin: 16,
                elevation: 4,
            }}>
                {(option==="qrCode" || joined) ? 
                    <View style={extStyle.qrCodeContainer}>
                        <Text style={text.title}> YOUR TICKET </Text>
                        <Text style={{marginBottom: 10}}> Please show this QR code on the event day for entry </Text>
                        <QRCode 
                            value="https://github.com/polito-hci-2023/SWAPMAP"
                            size={150}
                        />
                    </View>
                : (option==="button" ?
                    <>
                        <Pressable style={extStyle.joinButton} disabled={joined || wrongLevel} onPress={() => setAskConfirmation(true)}>
                                <Text style={text.buttonText}>JOIN</Text>
                        </Pressable>
                        {wrongLevel && <Text style={text.warning}>Go to the Test section and keep increasing your level to join this event ⚠️</Text>}
                        {!wrongLevel && joined && <Text style={text.warning}>You already joined this event! ⚠️</Text>}
                    </> :
                    <></>
                )}
            </View>
            </ScrollView>
            
            {askConfirmation && <ConfirmationAlert operation='Join Event' message='Are you sure you want to join this event?' onConfirm={joinEvent} onCancel={() => setAskConfirmation(false)} />}
            {successfulAlert && <SuccessfulAlert title={"Successfully \n joined event!"} icon={<MaterialIcons name="done-outline" size={24} color="green" />} message={successfulMessage} onCancel={() => setSuccessfulAlert(false)} />}
            </>
    );
}
