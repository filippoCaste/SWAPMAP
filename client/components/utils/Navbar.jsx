import { React,useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import {
  Heading,
} from "@gluestack-ui/themed";
import extStyle from "../../style";

import { Modal,Portal} from "react-native-paper";

import * as Progress from "react-native-progress";

const Navbar = ({ navigation, experience }) => {

  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <View style={extStyle.navbarContainer}>
      <View style={extStyle.navbar}>
        <View style={{ justifyContent: "center", marginLeft:32 }}>
          <Heading
            style={{ color: "white", marginTop:25 }}
            size="3xl"
          >
            SWAPMAP
          </Heading>
          <Text style={{fontStyle: 'italic', color:'white'}}>Connect, Share, and Swap the Wear!</Text>
        </View>
        
        <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={extStyle.levelModal}>
        <View style={{ alignItems: 'center', justifyContent: 'center'  }}>
          <Text style={{textAlign:'center', flex:1,fontSize:16, fontWeight:'bold',marginTop:10}}> You are currently at level {Math.floor(experience / 10)} </Text>
          {/* <View style={{ justifyContent: "center",flex:1,alignContent:'center'}}> */}
          <ProgressBar
            // showModal={showModal}
            color= "#0C220C"
            size="60"
            level={Math.floor(experience / 10)}
            progressValue={(experience % 10) / 10}
          />
        {/* </View> */}
          <Text style={{alignItems:'center', fontSize:14,marginBottom: 10}}>Earn {10-(experience%10)} experience points to reach the next level.</Text>
          </View>
        </Modal>
        </Portal>

        <View style={{ justifyContent: "center", marginRight: 20, marginTop: 35}}>
          <ProgressBar
            color="#F4FBF8"
            size="43"
            showModal={showModal}
            level={Math.floor(experience / 10)}
            progressValue={(experience % 10) / 10}
          />
        </View>
      </View>
    </View>
  );
};

function ProgressBar({ progressValue, level,showModal,visible,color,size }) {
  return (
    <View style={{alignItems: 'center', marginTop:0}}>
      <TouchableOpacity onPress={showModal}>
      <Progress.Circle
        progress={progressValue}
        size={size}
        animated={true}
        showsText={true}
        formatText={() => progressValue*100+"%"}
        color={color}
      >
        
        {/* <View
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {progressValue <= 0.45 ? (
            <Text style={{ color: "white", fontSize: 10 }}>{`${Math.round(
              progressValue * 100
            )}%`}</Text>
          ) : (
            <Text style={{ color: "black", fontSize: 10 }}>{`${Math.round(
              progressValue * 100
            )}%`}</Text>
          )}
        </View> */}
      </Progress.Circle>
      </TouchableOpacity>
      <Text style={{ textAlign: "center", fontSize:12, color: "white", marginTop:3 }}>
        Level: {level < 10 ? "0" + level : level}
      </Text>

    </View>
  );
}

export { Navbar };
