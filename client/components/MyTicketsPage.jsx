import USER_API from '../apis/user.api.js';
import React, { useState, useEffect } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Navbar } from './utils/Navbar.jsx';
import extStyle from '../style.js';
import { Heading, ScrollView, Spinner } from '@gluestack-ui/themed';
import { Ionicons } from '@expo/vector-icons';
import EventList from './utils/EventList.jsx';
import Breadcrumb from './utils/Breadcrumb.jsx';

export default function MyTicketsPage({navigation, route}) {

    const STATES = {LOADING: "Loading...", ERROR: "Some error occoured...", READY: "ready"};
    const path = [...route.params.path, "MyTickets"]
    const [state, setState] = useState(STATES.LOADING);
    const [userEvents, setUserEvents] = useState([]);

    // TO DO: find a correct mechanism to identify users // using context etc.
    const userId = 1;

    useEffect(() => {
        const fetchUserEvents = async () => {
            try {
              const result = await USER_API.getUserEvents(userId);
              const events = result.map(e => {
                return {
                  id: e.id,
                  title: e.title,
                  date: e.date,
                  status: e.status,
                  content: {location: e.location, startTime: e.startTime, level: e.level}
                }
              })
              return events;
            } catch (error) {
              console.error(error);
            }
        }

        fetchUserEvents()
        .then(
            userEvents => {
                setUserEvents(userEvents);
                setState(STATES.READY);
            }
        ).catch(error => setState(STATES.ERROR))

    }, []);

    return (
      <>
      {/* <Navbar/> */}
      
        <View style={extStyle.pageContainer}>
          <View style={{flexDirection:'row'}}>
          <View style={extStyle.backButtonContainer}>
                <Pressable style={extStyle.backButton} onPress={() => navigation.navigate("Profile", { path: ["Profile"]})}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </Pressable>
            </View>
            <Breadcrumb path={path} />
          </View>
            
            {/* <View style={extStyle.pageTitleContainer}>
                <Heading size='xl'>MY TICKETS</Heading>
            </View>
           */}

            <View style={extStyle.eventsContainer}>
              {state===STATES.READY ?
              <EventList navigation={navigation} path={path} events={userEvents} option="qrCode" userId={userId} userEvents={userEvents} justJoined={true}/>
              : (state===STATES.LOADING ? 
                  <View>
                    <Spinner size="large" />
                  </View> 
                : <View>
                    <Text>Some Errors Occurred...</Text>
                  </View>)}
            </View>
         </View>
        

      
      </>
      
)};