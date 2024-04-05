import React, { useState, useEffect } from "react";
import { Pressable, ScrollView, Text, View, StyleSheet, Button } from "react-native";
import { Divider, Spinner } from "@gluestack-ui/themed";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { RadioButton, DataTable } from "react-native-paper";
import extStyle, { text } from "../style";
import ProgressBar from "react-native-progress/Bar";
import { FontAwesome } from '@expo/vector-icons';
import QUESTIONNAIRE_API from "../apis/questionnaire.api.js";
import Breadcrumb from "./utils/Breadcrumb.jsx";
import { Video, ResizeMode } from 'expo-av';
import { Feather } from '@expo/vector-icons';
import { ConfirmationAlert } from "./utils/ConfirmationAlert.jsx";
import { useAppContext } from "./utils/context.jsx";


//TRIAL
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function QuestionnairePage({
  navigation,
  route,
  setExperience,
}) {
  const { topic } = route.params;
  const done = route.params.done;
  const setDirty = route.params.setDirty;
  const updateExperience = route.params.updateExperience;
  const path = [...route.params.path, "Test: " + topic.title];

  const STATES = {
    LOADING: "Loading...",
    ERROR: "Some error occoured...",
    READY: "ready",
  };

  const [state, setState] = useState(STATES.LOADING);
  const [questionnaire, setQuestionnaire] = useState([]);
  const [solutions, setSolutions] = useState([]);
  const [status, setStatus] = useState({});
  const {back, setBack, backModal, setBackModal} = useAppContext()


  const video = React.useRef(null);

  function randomSort(a, b) {
    return Math.random() - 0.5;
  }

  const shuffleQuestionnaire = (questionnaire) => {
    return questionnaire.map((questionAnswers) => {
      const { answer1, answer2, answer3, answer4 } = questionAnswers; //answer1 is the correctOne
      const answers = [answer1, answer2, answer3, answer4];
      answers.sort(randomSort);
      return {
        idTopic: questionAnswers.idTopic,
        id: questionAnswers.id,
        questionText: questionAnswers.questionText,
        answer1: answers[0],
        answer2: answers[1],
        answer3: answers[2],
        answer4: answers[3],
      };
    });
  };

  const handleBackNavigation = () => {
    
    if (!back)
      navigation.navigate("Topics", { path: ["Home"] })
    else
      setBackModal(true);
  }

  useEffect(() => {
    setBack(true);
    const fetchQuestionnaireAndSolution = async () => {
      try {
        const result = await QUESTIONNAIRE_API.getQuestionnaire(topic.id);

        const newResult = shuffleQuestionnaire(result);



        const solutions = result.map((questionAnswers) => {
          return {
            questionId: questionAnswers.id,
            answer: questionAnswers.answer1,
          };

          
        });

        return { questionnaire: newResult, solutions: solutions };
      } catch (error) {
        console.error(error);
      }
    };

    fetchQuestionnaireAndSolution()
      .then((result) => {
        if (result && result.questionnaire) {
          setQuestionnaire(result.questionnaire);
          setSolutions(result.solutions);
          setState(STATES.READY);
        } else {
          setState(STATES.ERROR);
        }
      })
      .catch((error) => setState(STATES.ERROR));
  }, []);

  return (
    <>
    {/* <Navbar/> */}
    <View style={extStyle.pageContainer}>
      <View style={{flexDirection:'row'}}>
        <View style={extStyle.backButtonContainer}>
        <Pressable
          style={extStyle.backButton}
          onPress={() => handleBackNavigation()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
          
        </Pressable>
      </View>
        <Breadcrumb path={path} />
      </View>

      
    </View>
    <SafeAreaProvider>
      <SafeAreaView>
        {backModal && <ConfirmationAlert 
          operation={"Confirm"}
          message={"Are you sure you want to go back? If you confirm, you will lose all changes"}
          onConfirm={() => {
            setBack(false);
            setBackModal(false);
            navigation.navigate("Topics", { path: ["Home"] });
            
          }}
          onCancel={() => setBackModal(false)}/>}
        <ScrollView>
          <View style={extStyle.externalViewCreate}>                                                                                                                                                                                                                                                                                                                                     
            <View style={extStyle.pageTitleContainer}>
              <Text style={text.title}>{topic.title}</Text>
            </View>
            <View style={styles.container}>
            

              <Video
              ref={video}
              source={{ uri: 'http://172.22.16.114:5000/video/5 New T-shirt Upcycles_ How To Cut for the Impatient Beginner.mp4' }}
              style={styles.video}
              resizeMode={ResizeMode.CONTAIN}
              shouldPlay={true}
            useNativeControls 
            onPlaybackStatusUpdate={status => setStatus(() => status)}
            />
            </View>
            <View style={{ alignItems: "center", marginTop: 40, marginLeft: 16 }}>
              <Text style={{ fontFamily: "Helvetica", fontWeight: "bold" }}>
                TEST TIME
              </Text>

              <View>
                {state === STATES.READY ? (
                  <Questionnaire
                    questionnaire={questionnaire}
                    solutions={solutions}
                    shuffleQuestionnaire={shuffleQuestionnaire}
                    setQuestionnaire={setQuestionnaire}
                    navigation={navigation}
                    setExperience={setExperience}
                    done={done}
                    topicId={topic.id}
                    setDirty={setDirty}
                    updateExperience={updateExperience}
                  />
                ) : state === STATES.LOADING ? (
                  <View>
                    <Spinner size="large" />
                  </View>
                ) : (
                  <View>
                    <Text>Some Errors Occurred...</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
    
    </>
  );
}

function Questionnaire(props) {
  const setExperience = props.setExperience;
  const questionnaire = props.questionnaire;
  const solutions = props.solutions;
  const setQuestionnaire = props.setQuestionnaire;
  const shuffleQuestionnaire = props.shuffleQuestionnaire;
  const navigation = props.navigation;
  const done = props.done;
  const updateExperience = props.updateExperience;
  const topicId = props.topicId;
  const setDirty = props.setDirty;
  const defaultAnswers = questionnaire.map((q) => {
    return { questionId: q.id, answer: "" };
  });

  const [userAnswers, setUserAnswers] = useState(defaultAnswers);
  const [finalScore, setFinalScore] = useState(-1);
  const [scoreAlert, setScoreAlert] = useState(false);
  const [cleanSolution, setCleanSolution] = useState(0);
  const {setBack} = useAppContext()


  const answerIsRight = (questionId, answer) => {
    return (
      solutions.filter((s) => s.questionId === questionId)[0].answer === answer
    );
  };

  const theshold = 0.6;

  const isPassed = () => {
    return finalScore >= solutions.length * theshold;
  };

  const retry = () => {
    setQuestionnaire(() => shuffleQuestionnaire(questionnaire));
    setCleanSolution(1);
    setScoreAlert(false);
    setUserAnswers(defaultAnswers);
    setBack(true)
  };

  const handleSubmit = () => {
    let finalScore = 0;
    userAnswers.forEach((a) => {
      answerIsRight(a.questionId, a.answer) && finalScore++;
    });
    setFinalScore(finalScore);
    setScoreAlert(true);
    setBack(false)
  };

  return (
    // <ScrollView>
    <>
      {questionnaire &&
        (questionnaire.length > 0 ? (
          <>
            {questionnaire.map((questionAnswers) => {
              const { answer1, answer2, answer3, answer4 } = questionAnswers;
              let answers = [answer1, answer2, answer3, answer4];

              return (
                <SingleQuestion
                  key={questionAnswers.id}
                  question={{
                    questionId: questionAnswers.id,
                    questionText: questionAnswers.questionText,
                  }}
                  answers={answers}
                  userAnswers={userAnswers}
                  setUserAnswers={setUserAnswers}
                  solutions={solutions}
                  answerIsRight={answerIsRight}
                  scoreAlert={scoreAlert}
                  setCleanSolution={setCleanSolution}
                  cleanSolution={cleanSolution}
                />
              );
            })}

            {scoreAlert && (
              <ScoreAlert
                finalScore={finalScore}
                total={solutions.length}
                /*onClose={() => setScoreAlert(false)}*/
                /*navigation={navigation}*/
                isPassed={isPassed()}
                setExperience={setExperience}
                done={done}
                topicId={topicId}
                setDirty={setDirty}
                updateExperience={updateExperience}
              />
            )}
            {scoreAlert && isPassed() ? (
            
                <Pressable style={[extStyle.button, { marginTop: 15 }]} onPress={() =>
                    navigation.navigate("Topics", { path: ["Home"] })
                  }>
              <Text style={{ fontWeight: "bold", color: "#F4FBF8" }}>BACK TO TOPICS</Text>
              </Pressable>
           
            ) : scoreAlert && !isPassed() ? (
              
              <Pressable style={[extStyle.button, { marginTop: 15 }]} onPress={() => retry()}>
                <Text style={{ fontWeight: "bold", color: "#F4FBF8" }}>RETRY</Text>
              </Pressable>
            ) : (
              
              <Pressable style={[extStyle.button]} onPress={() => handleSubmit()}>
              <Text style={{ fontWeight: "bold", color: "#F4FBF8" }}>SUBMIT</Text>
              </Pressable>
            )}
          </>
        ) : (
          <View style={{ alignItems: "center", marginVertical: 8 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                textDecorationLine: "underline",
              }}
            >
              No questions available
            </Text>
          </View>
        ))}
        </>
    // </ScrollView>
  );
}

function SingleQuestion(props) {
  const question = props.question;
  const answers = props.answers;
  const userAnswers = props.userAnswers;
  const setUserAnswers = props.setUserAnswers;
  const answerIsRight = props.answerIsRight;
  const scoreAlert = props.scoreAlert;
  const cleanSolution = props.cleanSolution;
  const setCleanSolution = props.setCleanSolution;

  useEffect(() => {
    if (cleanSolution === 1) {
      setChecked(0);
    }
  }, [cleanSolution]);

  const handlePress = (value, answer) => {
    if (!scoreAlert) {
      setCleanSolution(0);
      if (checked === value) {
        setChecked(0);
        setUserAnswers((userAnswers) =>
          userAnswers.map((q) =>
            q.questionId === question.questionId ? { ...q, answer: "" } : q
          )
        );
      } else {
        setChecked(value);
        setUserAnswers((userAnswers) =>
          userAnswers.map((q) =>
            q.questionId === question.questionId ? { ...q, answer: answer } : q
          )
        );
      }
    }
  };

  const [checked, setChecked] = useState(0);

  return (
    <View style={{ marginTop: 30 }}>
      <View>
        <Text style={[text.baseText, { fontSize: 16 }]}>{question.questionText}</Text>
      </View>

      <Divider w={55} style={{ marginVertical: 10, alignSelf: "center" }} />

      <View style={extStyle.answersContainer}>

        <DataTable>
          <DataTable.Row
            key={`${question.questionId}-1`}
            style={{ borderBottomWidth: 0, marginBottom: 4 }}
          >
              <DataTable.Cell style={{ flex: 2 }}>
              <RadioButton.Android
                value="1"
                status={checked === 1 ? "checked" : "unchecked"}
                onPress={() => handlePress(1, answers[0])}
                color="#163f2e"
              />
            </DataTable.Cell>
            <DataTable.Cell style={{ flex: 8 }}>
              <Text>{answers[0]}</Text>
            </DataTable.Cell>
            <DataTable.Cell style={{ flex: 2 }}>
              {scoreAlert &&
              userAnswers.filter((a) => a.questionId === question.questionId)[0]
                .answer === answers[0] ? (
                answerIsRight(question.questionId, answers[0]) ? (
                  <MaterialIcons name="done-outline" size={24} color="green" style={{flex:4, marginLeft:7, paddingLeft:10}}/>
                ) : (
                  <MaterialCommunityIcons
                    name="close-outline"
                    size={24}
                    color="red"
                    style={{flex:4, marginLeft:7, paddingLeft:10}}
                  />
                )
              ) : (
                ""
              )}
            </DataTable.Cell>
          
          </DataTable.Row>
          <DataTable.Row
            key={`${question.questionId}-2`}
            style={{ borderBottomWidth: 0, marginBottom: 4 }}
          >
            <DataTable.Cell style={{ flex: 2 }}>
              <RadioButton.Android
                value="2"
                status={checked === 2 ? "checked" : "unchecked"}
                onPress={() => handlePress(2, answers[1])}
                color="#163f2e"
              />
            </DataTable.Cell>
            <DataTable.Cell style={{ flex: 8 }}>
              <Text>{answers[1]}</Text>
            </DataTable.Cell>
            <DataTable.Cell style={{ flex: 2 }}>
              {scoreAlert &&
              userAnswers.filter((a) => a.questionId === question.questionId)[0]
                .answer === answers[1] ? (
                answerIsRight(question.questionId, answers[1]) ? (
                  <MaterialIcons name="done-outline" size={24} color="green" style={{flex:4, marginLeft:7, paddingLeft:10}} />
                ) : (
                  <MaterialCommunityIcons
                    name="close-outline"
                    size={24}
                    color="red"
                    style={{flex:4, marginLeft:7, paddingLeft:10}}
                  />
                )
              ) : (
                ""
              )}
            </DataTable.Cell>
            
          </DataTable.Row>
          <DataTable.Row
            key={`${question.questionId}-3`}
            style={{ borderBottomWidth: 0, marginBottom: 4 }}
          >
            <DataTable.Cell style={{ flex: 2 }}>
              <RadioButton.Android
                value="3"
                status={checked === 3 ? "checked" : "unchecked"}
                onPress={() => handlePress(3, answers[2])}
                color="#163f2e"
              />
            </DataTable.Cell>
            <DataTable.Cell style={{ flex: 8 }}>
              <Text>{answers[2]}</Text>
            </DataTable.Cell>
            <DataTable.Cell style={{ flex: 2 }}>
              {scoreAlert &&
              userAnswers.filter((a) => a.questionId === question.questionId)[0]
                .answer === answers[2] ? (
                answerIsRight(question.questionId, answers[2]) ? (
                  <MaterialIcons name="done-outline" size={24} color="green" style={{flex:4, marginLeft:7, paddingLeft:10}} />
                ) : (
                  <MaterialCommunityIcons
                    name="close-outline"
                    size={24}
                    color="red"
                    style={{flex:4, marginLeft:7, paddingLeft:10}}
                  />
                )
              ) : (
                ""
              )}
            </DataTable.Cell>
            
          </DataTable.Row>
          <DataTable.Row
            key={`${question.questionId}-4`}
            style={{ borderBottomWidth: 0 }}
          >
            <DataTable.Cell style={{ flex: 2 }}>
              <RadioButton.Android
                value="4"
                status={checked === 4 ? "checked" : "unchecked"}
                onPress={() => handlePress(4, answers[3])}
                color="#163f2e"
              />
            </DataTable.Cell>
            <DataTable.Cell style={{ flex: 8 }}>
              <Text>{answers[3]}</Text>
            </DataTable.Cell>
            <DataTable.Cell style={{ flex: 2 }}>
              {scoreAlert &&
              userAnswers.filter((a) => a.questionId === question.questionId)[0]
                .answer === answers[3] ? (
                answerIsRight(question.questionId, answers[3]) ? (
                  <MaterialIcons name="done-outline" size={24} color="green" style={{flex:4, marginLeft:7, paddingLeft:10}} />
                ) : (
                  <MaterialCommunityIcons
                    name="close-outline"
                    size={24}
                    color="red"
                    style={{flex:4, marginLeft:7, paddingLeft:10}}
                  />
                )
              ) : (
                ""
              )}
            </DataTable.Cell>
            
          </DataTable.Row>
        </DataTable>
      </View>
    </View>
  );
}

function ScoreAlert({
  finalScore,
  total,
  isPassed,
  setExperience,
  updateExperience,
  done,
  topicId,
  setDirty
}) {
  
  const [stars, setStars] = useState(0)
  const [exp, setExp] = useState(0);

  const successfullPass = async (experience) => {
    try {
      console.log(exp)
      const newExperience = await QUESTIONNAIRE_API.addExperience(1, topicId, experience);
      setExperience(newExperience);
      updateExperience(newExperience);
      setDirty(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isPassed) {
      let experience = 2;
      setExp(2)
      setStars(1);
      if (finalScore > total * 0.7 && finalScore <= total * 0.8) {
        experience = 5;
        setExp(5);
        setStars(2);
      } else if (finalScore > total * 0.8 && finalScore <= total) {
        experience = 8;
        setExp(8);
        setStars(3);
      }
      if(!done)
        successfullPass(experience);
    }
  }, []);

  return (
    <View style={styles.centeredView}>
      
      <View style={styles.modalView}>
        <Text style={styles.modalText}>
          {isPassed ? "GREAT" : "LET'S TRY AGAIN"}
        </Text>
        <Text style={styles.modalText}>
          {finalScore}/{total}
        </Text>
        <View style={styles.stars}>
          {
         [...Array(stars)].map(()=>
          <FontAwesome name="star" size={24} color="darkgreen" />
         )
          }
          {
            [...Array(3-stars)].map(()=>
               <Feather name="star" size={24} color="black" />
            )
          }

        </View>

        <View style={styles.progressView}>
          <ProgressBar
            animated={true}
            progress={finalScore / total}
            animationType="timing"
            style={{
             
              backgroundColor: 'lightgray', // Background color
              borderRadius: 5, // Adjust the border radius as needed
              overflow: 'hidden', // Ensure progress bar stays within bounds
            }}
            color={'#163f2e'} // Progress color
          />
        </View>
        {
          done ? <Text>You cannot earn experience, you already did this questionnaire</Text> :
          isPassed ?
          <Text>You earned {exp} exp!</Text> :
          <Text style={{textAlign:"center", marginTop: 5}}>You didn't earn experience points this time</Text>
        }
      </View> 
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:3,
  },
  video: {
    width: 300,
    height: 200,
    borderRadius:3,
  },
  video: {
    width: 300,
    height: 200,
  },
  centeredView: {
    height:'7%',
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    maringBottom: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    maringBottom: 10,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonClose: {
    backgroundColor: "#364958",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  progressView: {
   
    margin: 5,
  },
  stars: {
     flex: 1,
    
    flexDirection: "row",
  },
  star: {
    padding: 3,
  },
});
