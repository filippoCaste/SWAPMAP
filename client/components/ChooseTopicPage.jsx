import React, { useState, useEffect } from 'react';
import TOPICS_API from '../apis/topics.api';
import { Card, Paragraph, Title } from 'react-native-paper';
import { Pressable, View, Text } from 'react-native';
import extStyle, { cardStyle, text } from '../style';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Breadcrumb from './utils/Breadcrumb';
import { Navbar } from './utils/Navbar';
import { ScrollView} from "@gluestack-ui/themed";



export default function ChooseTopicPage({navigation, route}) {
    const [topics, setTopics] = useState(null);
    const [dirty,setDirty] = useState(true);
    const [userTopics, setUserTopics] = useState([]);
    const path = [...route.params.path, "Topics"];
    const updateExperience = route.params.updateExperience;
    const userId=1;

    // load the topics
    useEffect(() => {
        if(dirty){
        const fetchTopics = async () => {
            return await TOPICS_API.getAllTopics();
        }
        const fetchUserTopics = async () => {
            return await TOPICS_API.getUserTopics(userId);
        }

        fetchTopics().then(res => setTopics(res));
        fetchUserTopics().then(res => setUserTopics(res));
        setDirty(false)
    }
    }, [dirty]);

    return (<>
        <View style={extStyle.pageContainer}>
            {/* <Navbar/> */}
            <View style={{flexDirection:'row'}}>
            <View style={extStyle.backButtonContainer}>
                <Pressable style={extStyle.backButton} onPress={() => navigation.navigate('Home')}><Ionicons name="arrow-back" size={24} color="white" /></Pressable>
            </View>
                <Breadcrumb path={path} />
            </View>
        </View>

        <ScrollView  style={{marginBottom:10}}>
           

            {topics && topics.map((topic) => <SingleCard key={topic.id} path={path} navigation={navigation} topic={topic} userTopics={userTopics} setDirty={setDirty} updateExperience={updateExperience}/>)}
        </ScrollView>
    </>
    );
}

function SingleCard(props) {
    const topic = props.topic;
    const setDirty = props.setDirty;
    const updateExperience = props.updateExperience;
    const userTopics = props.userTopics;
    const path = props.path;
    const navigation = props.navigation;
    const done = userTopics && userTopics.filter((userTopic) => userTopic.id_topic===topic.id).length>0;

    return <Card style={done ? cardStyle.card : cardStyle.card2} elevation={5}>
            <Card.Content>
                <View style={{flexDirection: "row", justifyContent: "space-between",}}>
                    <Title style={done ? text.title: text.title2}>{topic.title}</Title>
                    { done && <MaterialIcons name="done-outline" size={24} color="#163f2e" />}
                </View>
                <Paragraph style={done ? text.baseText: text.baseText2}>{topic.description}</Paragraph>
            </Card.Content>
            <Card.Actions>
                <Pressable 
                    style={done ? extStyle.joinButton : extStyle.joinButton2}
                    onPress={() => navigation.navigate('Questionnaire', { topic, path, done, setDirty, updateExperience})}
                    >
                    <Text style={done ? text.smallButtonText : text.smallButtonText2}>START &gt;&gt;</Text>
                </Pressable>
            </Card.Actions>
        </Card>
}
