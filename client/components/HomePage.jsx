import { React, useState, useEffect } from 'react';
import { Pressable, Text, View, Image, ActivityIndicator} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, Spinner} from "@gluestack-ui/themed";
import extStyle, { text } from '../style.js';

//import Geolocation from '@react-native-community/geolocation';
import openMap from 'react-native-open-maps';

import EventList from './utils/EventList.jsx'

import USER_API from '../apis/user.api.js';
import EVENTS_API from '../apis/event.api.js';
import Breadcrumb from './utils/Breadcrumb.jsx';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { SuccessfulAlert } from './utils/SuccessfulAlert.jsx';

/*const fakeEvents = [{
    id : 1,
    title : "My Event",
    date : "11/06/1999",
    content: {location : "Loc", startTime:"10:00", level : 3}
  },
  {
    id: 2,
    title : "My Event",
    date : "11/06/1999",
    content: {location : "Loc", startTime:"10:00", level : 3}
  },
  {
    id: 3,
    title : "My Event",
    date : "11/06/1999",
    content: {location : "Loc", startTime:"10:00", level : 3}
  }
]*/


const HomePage = ({navigation}) => {

    // TO DO: find a correct mechanism to identify users // using context etc.
    const userId = 1;
    const STATES = {LOADING: "Loading...", ERROR: "Some error occoured...", READY: "ready"};
    const path = ["Home"];

    const [state, setState] = useState(STATES.LOADING);
    const [events, setEvents] = useState([]);
    const [userEvents, setUserEvents] = useState([]);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [reload, setReload] = useState(false);
    const [dirtyReload, setDirtyReload] = useState(false);
    const [experience, setExperience] = useState(-1);
    const [showAlert, setShowAlert] = useState(false);


  const handleScroll = (event) => {
    const position = event.nativeEvent.contentOffset.y;
    setScrollPosition(position);
    if(scrollPosition <= -90) {
      setDirtyReload(true)
    }
    if(scrollPosition >= -10 && dirtyReload==true){
      setReload(true)
      fetchUserEvents()
      .then(
        userEvents => setUserEvents(userEvents)
      ).catch(error => console.error(error));

      fetchAllEvents()
        .then(events => {
                    //console.log(events);
                    setEvents(events);
                    setState(STATES.READY)}
        ).catch(error => setState(STATES.ERROR));
      setReload(false)
      setDirtyReload(false)
    }
  };

  const handleNavigate = (index) => {
    // Slice the path array to the specified index to navigate back
    setPath(path.slice(0, index + 1));
  };

  /*const handleAlert = () => {
    openInfo ? setOpenInfo(false) : setOpenInfo(true);
  }*/

  const fetchUserEvents = async () => {
    try {
      const result = await USER_API.getUserEvents(userId);
      return result;
    } catch (error) {
      console.error(error);
    }
  }

  const fetchAllEvents = async () => {
    try {
      const result = await EVENTS_API.getAllEvents();
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

  const fetchUser = async () => {
    try {
      const result = await USER_API.getUser(userId);
      return result;
    } catch (error) {
      console.error(error);
    }
  };

  function _goToYosemite(location) {
    openMap({}); 
  }

  const updateUserEvents = (joinedEvent) => {
    setUserEvents([...userEvents, joinedEvent])
  }

  const updateExperience = (newExperience) => {
    setExperience(newExperience);
  }

  useEffect(() => {
    setReload(true)
    fetchUserEvents()
      .then(
        userEvents => setUserEvents(userEvents)
      ).catch(error => console.error(error));

    fetchAllEvents()
      .then(events => {
                  //console.log(events);
                  setEvents(events);
                  setState(STATES.READY)}
      ).catch(error => setState(STATES.ERROR));
      setReload(false)

    fetchUser()
      .then((user) => {
        setExperience(user.experience);
      })
      .catch((error) => console.log("Error in fetchUser_API: " + error));
  },[])

    return(
      <>
      {/* <Navbar/> */}
      <View style={extStyle.pageContainer}>
        <View>
          <Breadcrumb path={path||["Home"]} onNavigate={handleNavigate} />
        </View>
        <View style={extStyle.homeContainer}>
            <View style={extStyle.homeButtonContainer}>

              <Pressable
                onPress={() => navigation.navigate('Topics', { path: path, updateExperience: updateExperience })}
                style={extStyle.homeButtonLeft}>
              <Text style={text.buttonText}>Tests</Text>
              </Pressable>

              <Pressable
                onPress={() => experience>=200 ? navigation.navigate('Create', { path: path }) : setShowAlert(true)}
                style={extStyle.homeButtonRight}>
                  <Text style={text.buttonText}>Create Event</Text>
              </Pressable>

              {/*<Pressable
              onPress={() => _goToYosemite()}
                style={extStyle.homeButtonRight}>
                  <Text style={text.buttonText}>jasd</Text>
              </Pressable>*/}

              {showAlert && <SuccessfulAlert title={"Create Event"} icon={<FontAwesome name="lock" size={24} color="grey" />} message={"Unlock this feature by reaching level 20"} onCancel={() => setShowAlert(false)}></SuccessfulAlert>}
            </View>
            
          
          </View>
      </View>
      { reload ? <ActivityIndicator size="large" color="#00ff00" />:
      <ScrollView style={{marginBottom: 10}} onScroll={handleScroll} scrollEventThrottle={150} >
        {scrollPosition <= -50 && 
        <View style={extStyle.reload}>
          <Ionicons name="reload" size={24} color="black" />
        </View>
        
        }
      <View style={extStyle.mapContainer}>
        <Pressable onPress={_goToYosemite}>
          <Image source={require('../assets/map.png')} style={{width: 330, height: 200}}/>
          </Pressable>
      </View>

    
        <View style={{marginTop:16}}>
          <Text style={{fontFamily: 'Helvetica', textAlign: 'center', fontWeight: 'bold', fontSize: 20}}>JOINED EVENTS: </Text>
        </View>

        <View style={extStyle.eventsContainer}>
          {state===STATES.READY ?
          <EventList navigation={navigation} handleNavigate={handleNavigate} path={path} events={events} option="button" userId={userId} userEvents={userEvents} updateUserEvents={updateUserEvents} justJoined={true}/>
          : (state===STATES.LOADING ? 
              <View>
                <Spinner size="large" />
              </View> 
            : <View>
                <Text>Some Errors Occurred...</Text>
              </View>)}
        </View>


        <View style={{marginTop:16}}>
          <Text style={{fontFamily: 'Helvetica', textAlign: 'center', fontWeight: 'bold', fontSize: 20}}>EXPLORE EVENTS: </Text>
        </View>
        
        <View style={extStyle.eventsContainer}>
          {state===STATES.READY ?
          <EventList navigation={navigation} handleNavigate={handleNavigate} path={path} events={events} option="button" userId={userId} userEvents={userEvents} updateUserEvents={updateUserEvents} justJoined = {false}/>
          : (state===STATES.LOADING ? 
              <View>
                <Spinner size="large" />
              </View> 
            : <View>
                <Text>Some Errors Occurred...</Text>
              </View>)}
        </View>
        <StatusBar style="auto" />
      </ScrollView>
}
      
      </>
    )
}


export {HomePage}