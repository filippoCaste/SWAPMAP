import { React, useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Pressable,
  StyleSheet
} from "react-native";
//import { Button } from 'react-native-paper';
import extStyle from "../style.js";
import * as DocumentPicker from "expo-document-picker";
import { Divider, Input, InputField } from "@gluestack-ui/themed";
// import DateTimePicker from "react-native-ui-datepicker";
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from "dayjs";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
import { Card } from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";
import EVENTS_API from "../apis/event.api.js";
import { ConfirmationAlert } from "./utils/ConfirmationAlert.jsx";
import { SuccessfulAlert } from "./utils/SuccessfulAlert.jsx";
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Breadcrumb from './utils/Breadcrumb';
import { Navbar } from "./utils/Navbar.jsx";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Surface, TextInput } from 'react-native-paper';
import { useAppContext } from "./utils/context.jsx";


export function CreateEvent({ navigation, route }) {
  const [name, setName] = useState("");
  const [missingFields, setMissingFields] = useState(false);
  const [location, setLocation] = useState([]);
  // const [date, setDate] = useState(new dayjs().format("YYYY-MM-DD HH:mm"));
  const [date, setDate] = useState(new Date());
  const [desc, setDesc] = useState("");
  const [minLevel, setMinLevel] = useState(5);
  const [learningInput, setLearningInput] = useState([]);
  const [error, setError] = useState({});
  const [categCode, setCategCode] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [askConfirmation, setAskConfirmation] = useState(false);
  const [successfulAlert, setSuccessfulAlert] = useState(false);
  const path = [...route.params.path, "Create Event"];
  const {back, setBack, backModal, setBackModal} = useAppContext();

  useEffect(()=>{
    calculateLevel();
    setBack(true)
  },[categCode])

  // useEffect(()=>{
  //   for(let i=0; i< categCode.length; i++)
  //   CreateInputFields({i, categCode, handlePressClose, learningInput, error, learningFunctionTitle, learningFunctionDesc, pickDocument, handleDelete});
  // },[error])


  const containerStyle = { backgroundColor: "white", padding: 20 };

  const categories = [
    { label: "Workshop", value: "1" },
    { label: "Expert Talk", value: "2" },
    { label: "Masterclass", value: "3" },
    { label: "Other", value: "4" },
  ];

  const locations = [
    { label: "Via Po 254, Torino", value: "Via Po 254, Torino" },
    { label: "Via Roma 45, Torino", value: "Via Roma 45, Torino" },
    { label: "Corso Peschiera 2, Torino", value: "Corso Peschiera 2, Torino" },
    { label: "Via Monginevro 1, Torino", value: "Via Monginevro 1, Torino" },
    { label: "Corso Castelfidardo 10, Torino", value: "Corso Castelfidardo 10, Torino" },
  ];
  const successfulMessage = "You should receive feedback within 3-5 business days.";

  const dropdownToggle = () => {
    
    setDropdownOpen(!dropdownOpen);
  };

  const submissionConfimed = async () => {
    const data = {
      name: name,
      location: location,
      date: new dayjs(date).format("YYYY-MM-DD"),
      hour: new dayjs(date).format("HH:mm"),
      desc: desc,
      minLevel: minLevel,
      learningInput: learningInput,
    };
    try {
      await EVENTS_API.createEvent(1, data);
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
    }

    console.log("Submitted data: ", data);
    navigation.navigate("Home");
  };

  const onSubmit = async () => {
    setError({});
    let error_state = {};

    if (name.trim().length === 0) {
      error_state.name = "Name is required";
    }
    if (location.length === 0) {
      error_state.location = "Location is required";
    }
    if (desc.trim().length === 0) {
      error_state.desc = "Description is required";
    }

    
    if (learningInput.length === 0) {
      error_state.learningInput = "Need a learning input";
  } else {
      //error_state.learningInput = {}; // Initialize error_state.learningInput outside the loop
      
      learningInput.forEach((input, index) => {
          //error_state.learningInput[index] = error_state.learningInput[index] || {}; // Initialize or use existing object
          
          // Check if title is null or empty
          if (!input.title || input.title.trim().length === 0) {
              error_state.learningInput = error_state.learningInput || {};
              error_state.learningInput[index] = error_state.learningInput[index] || {};
              error_state.learningInput[index].title = "Title is required";
          }
          if (!input.desc || input.desc.trim().length === 0) {
              error_state.learningInput = error_state.learningInput || {};
              error_state.learningInput[index] = error_state.learningInput[index] || {};
              error_state.learningInput[index].desc = "Description is required";
          }
      });
  }

    await setError(error_state);
    console.error("Error: ",error);
    
    console.log("condition: ", Object.keys(error_state).length === 0);
  

    if (
      Object.keys(error_state).length === 0  ) {
      setAskConfirmation(true);
      console.log("Successful Alert: ", successfulAlert);
      if (successfulAlert) {
        const data = {
          name: name,
          location: location,
          date: date,
          desc: desc,
          minLevel: minLevel,
          learningInput: learningInput,
        };
        console.log("Data submitted: ", data);
        return data;
      
      }
    }
    else { setMissingFields(true)}

  };

  const handleDelete = (index, filename) => {
   
    let newLearning= [...learningInput];
    newLearning[index].files = newLearning[index].files.filter(file => file !== filename.trim());
    setLearningInput(newLearning);
  };

  const calculateLevel= ()=>{
    let base =5;
    let workshops = categCode.filter((element)=> (element.value==1)).length;
    let talks = categCode.filter((element)=> (element.value==2)).length;
    let masterclasses = categCode.filter((element)=> (element.value==3)).length;
    let others = categCode.filter((element)=> (element.value==4)).length;
    let level = base + 2*workshops+3*talks+4*(masterclasses+others);
    setMinLevel(level);

  }
  const categFunction = (categ) => {
    setCategCode([...categCode, categ]);
    let newLearning = [...learningInput, { code: categ.value }];
    setLearningInput(newLearning);
  };

  const pickDocument = async (event, index) => {
    try {
      const file = await DocumentPicker.getDocumentAsync({ multiple: true });
      let filesName = file.assets.map((element) => element.name);
      let newLearning = [...learningInput];

      if (!newLearning[index]) {
        newLearning[index] = { files: [] };
      }
      if (!newLearning[index].files) {
        newLearning[index].files = [];
      }

      newLearning[index] = {
        ...newLearning[index],
        files: [...newLearning[index].files, ...filesName],
      };

      setLearningInput(newLearning);
    } catch (error) {
      console.log(error);
    }
  };

  const learningFunctionTitle = (
    event,
    index //sets title and code
  ) => {
    console.log("event: ",event);
    let newTitle = event;
    let newLearning = [...learningInput];
    newLearning[index] = {
      ...newLearning[index],
      code: categCode[index].value,
      title: newTitle,
    };
    setLearningInput(newLearning);
  };

  const learningFunctionDesc = (
    event,
    index //sets description
  ) => {
    
    let newDesc = event;
    let newLearning = [...learningInput];
    newLearning[index] = { ...newLearning[index], desc: newDesc };
    setLearningInput(newLearning);
  };

  const handlePressClose = (event, nb) => {
    let newLearning = [...learningInput];
    newLearning.splice(nb, 1);
    setLearningInput(newLearning);

    let newCateg = [...categCode];
    newCateg.splice(nb, 1);
    setCategCode(newCateg);
    calculateLevel();

  };

  const handleBackNavigation = () => {
    
    if (!back)
      navigation.navigate("Home")
    else
      setBackModal(true);
  }

  return (
    <SafeAreaProvider>
      {/* <Navbar /> */}
      {backModal && <ConfirmationAlert 
          operation={"Confirm"}
          message={"Are you sure you want to go back? If you confirm, you will lose all changes"}
          onConfirm={() => {
            setBack(false);
            setBackModal(false);
            navigation.navigate("Home");
            
          }}
          onCancel={() => setBackModal(false)}/>}
      <View style={extStyle.pageContainer}>
      <View>
        <View style={{flexDirection:'row'}}>
        <View style={extStyle.backButtonContainer}>
            <Pressable style={extStyle.backButton} onPress={() => handleBackNavigation()}><Ionicons name="arrow-back" size={24} color="white" /></Pressable>
        </View> 
          <Breadcrumb path={path}  />
        </View>
       
        
      </View>
      </View>
      <ScrollView scrollEnabled={!dropdownOpen}>
      
        <View style={extStyle.externalViewCreate}>
       
          <TextInput
            style={[
              extStyle.inputStyle
            ]}
            mode="outlined"
            size="md"
            isRequired={true}
                
            selectionColor='#163f2e'
            activeUnderlineColor= '#163f2e' 
            activeOutlineColor= {['#163f2e' ]}
          
            outlineColor={error.name? '#FF0000': '#163f2e' }
            label="Event Name"
            value={name}
            onChangeText={(event) => setName(event)}>
          
          </TextInput>

          <View>
            <Dropdown
              style={[
                extStyle.dropdown, {marginTop:20},
                error.location ? extStyle.textError : null,
              ]}
              placeholder="Select Location"
              placeholderStyle={extStyle.placeholderStyle}
              selectedTextStyle={extStyle.selectedTextStyle}
              inputSearchStyle={extStyle.inputSearchStyle}
              iconStyle={extStyle.iconStyle}
              data={locations}
              search
              maxHeight={300}
              onFocus={dropdownToggle}
              onBlur={dropdownToggle}
              labelField="label"
              valueField="value"
              activeColor="#C9E4CA"
              searchPlaceholder="Search..."
              value={location}
              onChange={(location) => {
                setLocation(location.value);
              }}
            />
          </View>
          <View>
            <TextInput
              style={[extStyle.inputStyle, {marginTop:20}]}
                    
              selectionColor='#163f2e'
              activeUnderlineColor='#163f2e'
              activeOutlineColor= '#163f2e'
              mode="outlined"
              size="md"
              isRequired={true}
              isReadOnly={true}
              editable={false}
            
              label="Event Date & Start Time" 
              value={date.toString().substring(0,21)} />
          

            <Text style={extStyle.textCreateEvent}>
              {" "}
              Choose Event Date & Start Time
            </Text>
            <View style={extStyle.calendarContainer}>
              <DateTimePicker
                display="inline"
                mode="datetime"
                minimumDate={new Date()}
                value={date}
                accentColor="#163F2E"
                // onValueChange={(date) => {
                //   setDate(new dayjs(date).format("YYYY-MM-DD HH:mm"));
                // }}
                onChange={(event, selectedDate) => {
                  if (selectedDate !== undefined) {
                    setDate(selectedDate);
                  }}}
              />
            </View>
          </View>
            
          <TextInput
            mode="outlined"
                
            isRequired={true}
            style={[extStyle.descStyle, {paddingTop:0},{marginTop:10},]}
            
            selectionColor='#163f2e'
            activeUnderlineColor= '#163f2e' 
            activeOutlineColor= {['#163f2e' ]}
          
            outlineColor={error.desc? '#FF0000': '#163f2e' }
            size="md"
            multiline={true}
            numberOfLines={4} // You can adjust this number, only for android
            label="Event Description"
            value={desc}
            dense={true}
            onChangeText={(desc) => setDesc(desc)}
            textAlignVertical="top"
            textAlign="left">

          </TextInput>
         

          <Text style={extStyle.textCreateEvent}>
            {" "}
            Learning Activity Category{" "}
          </Text>

          <View>
            <Dropdown
             style={[
              extStyle.dropdown,
              (error.learningInput && learningInput.length==0)? extStyle.textError : null,
            ]}
              placeholderStyle={extStyle.placeholderStyle}
              selectedTextStyle={extStyle.selectedTextStyle}
              inputSearchStyle={extStyle.inputSearchStyle}
              iconStyle={extStyle.iconStyle}
              data={categories}
              search
              maxHeight={300}
              onFocus={dropdownToggle}
              onBlur={dropdownToggle}
              labelField="label"
              valueField="value"
              activeColor="#C9E4CA"
              searchPlaceholder="Search..."
              value={categCode}
              onChange={(code) => {
                categFunction(code);
              }}
            />
            {categCode.map((code, index) => (
              <CreateInputFields key={index} nb={index} categCode={categCode} handlePressClose={handlePressClose} learningInput={learningInput} error={error} learningFunctionTitle={learningFunctionTitle} learningFunctionDesc={learningFunctionDesc} pickDocument={pickDocument} handleDelete={handleDelete}/>            
              ))}
          </View>

          <View style={{ flexDirection: "row", marginBottom: 10 }}>
            <Text style={extStyle.textCreateEvent}>Minimum Required Level</Text>
            <Input
              style={extStyle.levelStyle}
              variant="outline"
              size="md"
              isReadOnly={true}
            >
              <Surface style={styles.surface} mode="flat">
                <Text>{minLevel}</Text>
            </Surface>
            </Input>
            
          </View>
          <Text style={extStyle.textNote}>
            *The minimum level required for attending your event is proportional
            to the number of Learning Activities you include.{" "}
          </Text>

          <Pressable style={extStyle.button} onPress={() => onSubmit()}>
            <Text style={{ fontWeight: "bold", color: "#F4FBF8" }}>SUBMIT</Text>
          </Pressable>
        </View>

        <View>
          {askConfirmation && (
            <ConfirmationAlert
              operation={"Submit Event"}
              message={"Are you sure you want to submit this event?"}
              onConfirm={() => {
                setSuccessfulAlert(true);
                setAskConfirmation(false);
                setBack(false)
              }}
              onCancel={() => setAskConfirmation(false)}
            />
          )}
          {successfulAlert && (
            <SuccessfulAlert
              title={"Successfully \n submitted event!"}
              message={successfulMessage}
              icon={<MaterialIcons name="done-outline" size={24} color="green" />}
              onCancel={() => {
                setSuccessfulAlert(false);
                submissionConfimed();
              }}
            />
          )}

          {missingFields && <SuccessfulAlert title="ERROR!" message="Please fill the missing fields" icon={<MaterialCommunityIcons name="close-outline" size={24} color="red" />} onCancel={() => setMissingFields(false)} ></SuccessfulAlert>}
        </View>
          </ScrollView>
 
    </SafeAreaProvider>
      );
}

function CreateInputFields({nb, categCode, handlePressClose, learningInput, error, learningFunctionTitle, learningFunctionDesc, pickDocument, handleDelete}) {
  
  return (
    <View style={extStyle.learningContainer}>
      <View style={extStyle.learningCardTitleDiv}>
        <Text style={extStyle.learningCardTitleText}>
          {" "}
          {categCode[nb].label}{" "}
        </Text>
        <TouchableOpacity onPress={(event, nb) => handlePressClose(nb)}>
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Divider my="$2"></Divider>
      <TextInput
        style={[
          extStyle.titleLearning,
          
        ]}
        
        selectionColor='#163f2e'
        activeUnderlineColor= '#163f2e' 
        activeOutlineColor= {['#163f2e' ]}
        outlineColor={ (learningInput &&
          error.learningInput &&
          error.learningInput[nb] &&
          error.learningInput[nb].title)? '#FF0000': '#163f2e' }
        mode="outlined"
        size="md"
        isRequired={true}
        label = {`Title of ${categCode[nb].label}`}
        // placeholder={`Title of ${categCode[nb].label}`}
        onChangeText={(event) => learningFunctionTitle(event, nb)}
        >
      
      </TextInput>

      <TextInput style={extStyle.describeLearning} size="md"
          mode ="outlined"
          multiline={true}
          selectionColor='#163f2e'
          activeUnderlineColor= '#163f2e' 
          activeOutlineColor= {['#163f2e' ]}
          outlineColor={(learningInput && error.learningInput && error.learningInput[nb] && error.learningInput[nb].desc)? '#FF0000': '#163f2e' }
          dense = {true}
          numberOfLines={2} // You can adjust this number
          label="Description"
          value={learningInput[nb]?.desc || ''}
          onChangeText={(event) => learningFunctionDesc(event, nb)}>
        
      </TextInput>

      {learningInput[nb]?.files !== undefined &&
        learningInput[nb].files.map((ele) => (
          <Files key={ele} name={ele} index={nb} handleDelete={handleDelete}></Files>
        ))}

      <Pressable
        style={extStyle.uploadButton}
        onPress={(event) => pickDocument(event, nb)}
      >
        <Text
          style={{
            fontWeight: "bold",
            color: "#F4FBF8",
            textAlign: "center",
          }}
        >
          {" "}
          Upload Files
        </Text>
      </Pressable>
    </View>
  );
}

const Files = (props) => {
  return (
    <View style={extStyle.fileList}>
      <Text>{props.name}</Text>
      <TouchableOpacity
        onPress={() => props.handleDelete(props.index, props.name)}
      >
        <AntDesign
          name="delete"
          size={24}
          color="black"
          style={extStyle.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  surface: {
    paddingLeft: 8,
    paddingTop:2,
    height: 26,
    width: 26,
    marginTop: 4
  },
});

/*const LearningCard = (props) => {
  return (
    <Card>
      <Card.Title title={props.title} />
      <Card.Content>
        <Text variant="bodyMedium">{props.desc}</Text>
      </Card.Content>
    </Card>
  );
};*/

/*  {learningInput.map((element) => (
            <LearningCard
              title={element.title}
              desc={element.desc}
            ></LearningCard>
          ))}

<Modal
            visible={showModal}
            onDismiss={() => {
              setDescriptionLearning("");
              setTitleLearning("");
              setShowModal(false);
            }}
            contentContainerStyle={containerStyle}
          >
            <View>
              <Input
                
                style={{ width: "200px", marginLeft: 5 }}
                variant="outline"
                size="md"
                isRequired={true}
              >
                <InputField
                  placeholder="Title of Learning Moment"
                  value={titleLearning}
                  onChange={(title) => setTitleLearning(title.nativeEvent.text)}
                />
              </Input>
            </View>
            <View>
              <Input
                style={{
                  marginTop: 0,
                  marginLeft: 20,
                  width: "300px",
                  height: "70px",
                }}
                variant="outline"
                size="md"
              >
                <InputField
                  multiline={true}
                  numberOfLines={2} // You can adjust this number
                  placeholder="Describe the learning activity and upload any related files"
                  value={descriptionLearning}
                  onChangeText={(text) => setDescriptionLearning(text)}
                />
              </Input>
            </View>
            <View>
              <Button
                title="Save"
                onPress={() => {
                  learningFunction(1);
                  setDescriptionLearning("");
                  setTitleLearning("");
                  setShowModal(false);
                }}
              ></Button>
              <Button
                title="Cancel"
                onPress={() => {
                  setDescriptionLearning("");
                  setTitleLearning("");
                  setShowModal(false);
                }}
              ></Button>
            </View>
          </Modal>
          */
