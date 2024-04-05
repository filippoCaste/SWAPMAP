import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { cardStyle } from "../../style";
import openMap from 'react-native-open-maps';
const dayjs = require("dayjs");

function EventCard({
  title,
  expDate,
  status,
  content,
  onView,
  joined,
  option,
  justJoined,
}) {
  /*const [address, setAddress] = useState(null);

  async function getAddress(coordinates) {
    const latitude = coordinates.split(",")[0];
    const longitude = coordinates.split(",")[1];
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
      .then(response => response.json())
      .then(data => { setAddress(data.address.road + ", " + data.address.city)})
      .catch(error => console.error(error));
  }

  getAddress(content.location).then();*/

  function _goToYosemite(location) {
    openMap({ start:"", end:`${location}` , travelType:"walk"}); 
  }

  const filterJoined = joined && justJoined;

  return (
    ((joined && justJoined) || (!justJoined && !joined)) && <View style={cardStyle.card}>
      <View style={cardStyle.titleSection}>
        <View style={{ justifyContent: "center" }}>
          <Text style={cardStyle.title}>{title}</Text>
        </View>
        <View style={{ justifyContent: "center" }}>
          {option === "" ? (
            <Text style={{ fontSize: 12, color: "white" }}>{status}</Text>
          ) : (
            <>
              {joined ? (
                <MaterialCommunityIcons
                  name="checkbox-marked-outline"
                  size={24}
                  color="white"
                />
              ) : (
                <MaterialCommunityIcons
                  name="checkbox-blank-outline"
                  size={24}
                  color="white"
                />
              )}
            </>
          )}
        </View>
      </View>

      <View style={cardStyle.contentSection}>
        <View>
          <View style={{flexDirection:'row'}}>
          <Text style={[cardStyle.field, {fontWeight:'bold'}]}>
            Date and Time:</Text> 
            <Text style={cardStyle.field}> {dayjs(expDate).format("YYYY/MM/DD")} at {content.startTime} </Text>
          </View>
          <View style={{flexDirection:'row'}}>
          <Text style={[cardStyle.field, {fontWeight:'bold'}]}>
            Minimum required level: </Text><Text style={cardStyle.field}> {content.level} </Text>
          </View>
          <View style={{flexDirection:'row'}}>
            <Text style={[cardStyle.field, {fontWeight:'bold'}]}>Address: </Text>
            <Pressable onPress={()=>_goToYosemite(content.location)}>
              <Text style={cardStyle.fieldAndLink}> {content.location} </Text>
            </Pressable>
          </View>
        </View>
        <View>
          <Pressable onPress={() => onView()} style={cardStyle.button}>
            <Text style={cardStyle.textButton}>
              {joined ? "TICKET" : "DETAILS"}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default EventCard;
