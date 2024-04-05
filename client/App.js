import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { config } from "@gluestack-ui/config";
import { Navbar } from "./components/utils/Navbar";
import { HomePage } from "./components/HomePage.jsx";
import { CreateEvent } from "./components/CreateEvent.jsx";
import EventInfoPage from "./components/EventInfoPage";
import UserProfile from "./components/Profile.jsx";
import ChooseTopicPage from "./components/ChooseTopicPage.jsx";
import QuestionnairePage from "./components/QuestionnairePage.jsx";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { PaperProvider } from "react-native-paper";
import { React, useState, useEffect } from "react";
import USER_API from "./apis/user.api.js";
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MyTicketsPage from "./components/MyTicketsPage.jsx";
import MyEventsPage from "./components/MyEventsPage.jsx";
import ShowInfo from "./components/Info.jsx";
import { LogBox } from "react-native";
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import extStyle from "./style.js";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AppProvider, useAppContext } from "./components/utils/context.jsx";

//const Stack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const InfoStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
  

function HomeStackNavigator({route}) {
    const navigation = useNavigation();
    const setExperience = route.params?.setExperience;
    const {back} = useAppContext()

    useEffect(() => {
      const unsubscribe = navigation.addListener('tabPress', (e) => {
      
        e.preventDefault();
        if(!back){
        navigation.navigate('Home');
        }
      });

      return unsubscribe;
    }, [navigation, back]);

    
    return (
      <HomeStack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown:false, 
          //header: (props) => <Navbar {...props} />,
        }}>
         
        <HomeStack.Screen name="Home" component={HomePage} />
        <HomeStack.Screen name="Create" component={CreateEvent} />
        <HomeStack.Screen name="Topics" component={ChooseTopicPage} />
        <HomeStack.Screen name="EventInfo" component={EventInfoPage} />
        <HomeStack.Screen name="Questionnaire">{props => <QuestionnairePage {...props} setExperience={setExperience} />}</HomeStack.Screen>
      </HomeStack.Navigator>
    );
}

function ProfileStackNavigator() {

    const navigation = useNavigation();
    const {back} = useAppContext()

    useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', (e) => {
     
      e.preventDefault();
      if(!back){
      navigation.navigate('Profile');
      }
    });

    return unsubscribe;
  }, [navigation,back]);


    return (
      <ProfileStack.Navigator
        initialRouteName="Profile"
        screenOptions={{
          headerShown:false, 
          //header: (props) => <Navbar {...props} />,
        }}>
        <ProfileStack.Screen name="Profile" component={UserProfile} />
        <ProfileStack.Screen name="MyTickets" component={MyTicketsPage} />
        <ProfileStack.Screen name="MyEvents" component={MyEventsPage} />
        <ProfileStack.Screen name="EventInfo" component={EventInfoPage} />
      </ProfileStack.Navigator>
    );
} 

function InfoStackNavigator(){
    const navigation = useNavigation();
    const {back} = useAppContext()

    useEffect(() => {
      const unsubscribe = navigation.addListener('tabPress', (e) => {
      
        e.preventDefault();
        if(!back){
        navigation.navigate('info');
        }
      });

    return unsubscribe;
  }, [navigation,back]);
      return(
        <InfoStack.Navigator
          initialRouteName="info"
          screenOptions={{
            headerShown:false, 
            //header: (props) => <Navbar {...props} />,
          }}>
          <InfoStack.Screen name="info" component={ShowInfo}/>
        </InfoStack.Navigator>
      );
}
  


export default function App() {

  LogBox.ignoreLogs(['Warnings...'])
  LogBox.ignoreAllLogs();

  // TO DO: find a correct mechanism to identify users // using context etc.
  const userId=1;

  const [experience, setExperience] = useState(-1);  

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await USER_API.getUser(userId);
        return result;
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser()
      .then((user) => {
        setExperience(user.experience);
      })
      .catch((error) => console.log("Error in fetchUser_API: " + error));
  }, []);

  return (
    <PaperProvider>
      <GluestackUIProvider config ={config}>
        <AppProvider>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName= "HomePage"
            screenOptions={
              {
                
              tabBarStyle: extStyle.bottomBar,
              tabBarActiveTintColor: 'white',
              tabBarInactiveTintColor:"#0C220C",
                header: (props) => <Navbar {...props} experience={experience}/>,
              //headerShown:false, 
              
            }
            }
          > 
            <Tab.Screen name= "InfoPage" component={InfoStackNavigator} options={{ tabBarIcon:({ color, size}) => (<MaterialCommunityIcons name = "information" color ={color} size={30}></MaterialCommunityIcons>),tabBarShowLabel:false}}/>
            <Tab.Screen name= "HomePage" component={HomeStackNavigator} options={{tabBarIcon:({ color, size}) => (<MaterialCommunityIcons name = "home" color ={color} size={30}></MaterialCommunityIcons>), tabBarShowLabel:false}} initialParams={{ setExperience: setExperience }}/>
            <Tab.Screen name= "ProfilePage" component={ProfileStackNavigator} options={{ tabBarIcon:({ color, size}) => (<MaterialCommunityIcons name = "account-circle" color={color} size={30}></MaterialCommunityIcons>),tabBarShowLabel:false}}/>
          </Tab.Navigator>
        </NavigationContainer>
        </AppProvider>
      </GluestackUIProvider>
    </PaperProvider>
  );
}







