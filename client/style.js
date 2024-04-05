import { StyleSheet } from "react-native";

// MAIN COLOR: #163f2e
// SECONDARY: #F4FBF8
// ACCENT: #0C220C

const extStyle = StyleSheet.create({
  navbarContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    borderBottomColor: "#F4FBF8", // or 364958
    borderBottomWidth: 4,
    backgroundColor: "#163f2e",
    paddingVertical: 16,
    //position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex:2,
  },

  card:{
    marginLeft:10, 
    marginRight:10, 
    marginBottom:5, 
    marginTop:5, 
    backgroundColor: "#F4FBF8" 
  },
  cardTile:{
    fontSize: 24, 
    fontWeight: 'bold',
    color:"#163f2e",
    marginLeft:7
  },
  answersContainer: {
    marginLeft: 10,
    

  },

  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    paddingLeft:10,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 16,
    paddingLeft:10,
    paddingRight:10,
    textAlign: 'justify',
    flexWrap: 'wrap',
    color: "#163f2e",
  },
  bottomBar:{
    backgroundColor: '#163f2e', 
    borderTopWidth: 2,         
    borderTopColor: '#234e3a',
    paddingBottom: 10,
    height: 70,

  },
  profileMenu:{

    flexDirection: "row",
    height: 55, 
    paddingLeft: 20

  },
  profileText:{
    fontSize: 18,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    marginTop: 20,
    marginBottom: 5,
    textAlign:'left',
    //lineHeight:'100%', //It doesn't work on the mobile app

  },

  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pageContainer: {
    padding: 8, 
    marginBottom:10,
    paddingBottom:10,
 
  },

  homeContainer: {
    //flex: 1, //It doesn't work on the mobile app
    padding: 8,
  },

  homeButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    // width: '100%',
    // paddingHorizontal: 16,
    marginTop: 8,
  },

  homeButtonLeft: {
    width: 162,
    borderRadius: 5,
    marginHorizontal: 3,
    padding: 12,
    marginLeft:7,
    elevation: 2,
    backgroundColor: "#163f2e",
    borderColor: "#163f2e",
    borderWidth: 3,
  },  

  homeButtonRight: {
    width: 162,
    borderRadius: 5,
    marginHorizontal: 3,
    marginRight: 7,
    padding: 12,
    elevation: 2,
    backgroundColor: "#163f2e",
    borderColor: "#163f2e",
    borderWidth: 3,
  },
  eventsContainer: {
    marginBottom: 10,
    marginTop: 10,
  },
  backButtonContainer: {
   
    marginLeft: 16,
    alignItems: "start",
  },
  backButton: {
    borderRadius: 10,
    paddingHorizontal: 12,
    elevation: 2,
    backgroundColor: "#163f2e",
    color: "white",
  },
  joinButton: {
    backgroundColor: "#0C220C",
    padding: 8,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 10,
  },
  joinButton2: {
    backgroundColor: "#F4FBF8", //0C220C
    padding: 8,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 10,
  },
  viewJoinButton: {
    flex: 1,
    alignItems: "center",
  },
  pageTitleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    marginBottom:10,
  },
  qrCodeContainer: {
    alignItems: "center",
  },
  mapContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  reload: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10
  },
  textCreateEvent: {
    marginTop: 15,
    marginBottom: 2,
    fontSize: 16,
    fontWeight: "12",
    fontWeight: '12',
  },
  textNote: {
    marginTop: 5,
    marginBottom: 15,
    fontSize: 14,
    fontWeight: "12",
    fontWeight: 12,
  },

  descStyle: {
    height: 70,
    borderColor: "transparent",
    borderWidth: 1,
    borderRadius:6,
    paddingLeft:0,
    marginTop: 5,
    backgroundColor: 'transparent',

    
  },

  inputStyle: {
    
    borderColor: "transparent",
    borderWidth: 1,
    borderRadius:2,
    backgroundColor: 'transparent',
    marginTop: 3,
  },

  textError: {
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius:2,
    borderColor: "#FF0000",
  },

  levelStyle: {
    marginTop: 9,
    marginLeft: 15,
    textAlign: "center",
    justifyContent: 'center',
    width: "50px",
    height: "30px",
  },

  externalViewCreate: {
    marginBottom: 15,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 25,
    padding: 20,
    borderColor: "#163f2e",
  },

  calendarContainer: {
    marginTop: 5,
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 25,
    borderColor: "#163f2e",
  },

  levelModal:{
    height:'25%',
    backgroundColor:"#F4FBF8" ,
    borderColor: "#0C220C",
    borderWidth:2,
    padding:3,
    borderRadius: 10,
    marginLeft:20,
    marginRight:20,
    alignItems: 'center',

  },
  fileList: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 8,
  },

  icon: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    marginLeft:0,
  },
  placeholderStyle: {
    marginLeft: 5,
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  selectedTextStyle: {
    marginLeft: 5,
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  dropdown: {
    marginTop: 3,
    height: 50,
    borderColor: "#163f2e",
    borderWidth: 2,
    borderRadius: 8,
  },
  container: {
    backgroundColor: "#F4FBF8",
    padding: 16,
  },
  describeLearning: {
    marginTop: 5,
    marginLeft: 5,
    marginRight:5,
    marginBottom: 10,
    height: 60,
    borderColor: "transparent",
    paddingLeft:0,
    borderWidth: 1,
    borderRadius:2,
    backgroundColor: 'transparent',
  },
  titleLearning: {
    marginLeft: 5,
    marginRight:5,
    padding:0,
    marginTop: 0,
    borderColor: "transparent",
    borderWidth: 1,
    borderRadius:2,
    backgroundColor: 'transparent',

  },
  learningContainer: {
    
    marginTop: 10,
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 25,
    borderColor: "#163f2e",
   
  },

  uploadButton: {
    backgroundColor: "#163f2e",
    padding: 8,
    borderRadius: 6,
    marginBottom: 5,
    marginLeft: 20,
    marginRight: 20,
  },

  button: {
    backgroundColor: "#163f2e",
    padding: 8,
    borderRadius: 6,
    marginBottom:5,
    alignItems: "center",
    marginTop:20,
  },
  learningCardTitleText: {
    textAlign: "center",
    flex: 1,
    fontWeight: "bold",
    marginTop: 5,
  },
  learningCardTitleDiv: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
});

export const text = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#163f2e",
  },
  title2: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#F4FBF8", //#163f2e
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  baseText: {
    fontFamily: "Helvetica",
  },
  baseText2: {
    fontFamily: "Helvetica",
    color: "white"
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    paddingLeft:0,
    
  },
  value: {
    fontSize: 16,
    marginBottom: 16,
  },
  valueLocation: {
    fontSize: 16,
    marginBottom: 16,
    textDecorationLine: 'underline',
    textDecorationColor: "blue",
    color: "blue"
  },
  warning: {
    fontSize: 16,
    color: "#721c24", // Optional: A dark red text color
    fontWeight: "bold",
  },
  buttonText: {
    fontFamily: "Helvetica",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    color: 'white',
  },
  smallButtonText: {
    fontFamily: "Helvetica",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
    color: "white",
  },
  smallButtonText2: {
    fontFamily: "Helvetica",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
    color: "#0C220C", //white
  },
});

export const mainContent = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
});

export const cardStyle = StyleSheet.create({
  card: {
    borderRadius: 10,
    borderColor: "#163f2e",
    borderWidth: 2,
    overflow: "hidden",
    elevation: 3,
    backgroundColor: "#F4FBF8",
    marginTop: 10,
    marginLeft: 20, //200
    marginRight: 20, //200
  },
  card2: {
    borderRadius: 10,
    borderColor: "#F4FBF8", //"#163f2e"
    borderWidth: 2,
    overflow: "hidden",
    elevation: 3,
    backgroundColor: "#0C220C", //"#F4FBF8"
    marginTop: 10,
    marginLeft: 20, //200
    marginRight: 20, //200
  },
  titleSection: {
    padding: 8,
    backgroundColor: "#163f2e",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 14, //22
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  contentSection: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  field: {
    fontSize: 12, //18
    marginTop: 4,
    marginBottom: 4,
    
  },
  fieldAndLink: {
    fontSize: 12, //18
    marginTop: 4,
    marginBottom: 4,
    textDecorationLine: 'underline',
    textDecorationColor: "blue",
    color: "blue"
  },
  button: {
    padding: 8, //16
    elevation: 2,
    backgroundColor: "#0C220C",
    borderRadius: 6,
    marginTop: 36,
    alignItems: "center",
    width: 70,

    // marginBottom: 16,
  },
  textButton: {
    fontSize: 12, //18
    fontWeight: "bold",
    color: "white",
  },
});

export default extStyle;
