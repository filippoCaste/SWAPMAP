'use strict';

import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { Modal, Portal } from "react-native-paper";
import extStyle from "../../style";


export function SuccessfulAlert({ title, message, icon, onCancel }) {
    return (
        <Portal>
            <Modal
                /*animationType="slide">*/
                /*transparent={true}*/
                /*onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    () => onCancel()
                }}*/
                visible={true}
                onDismiss={() => onCancel()}
                contentContainerStyle={extStyle.levelModal}>
                    <View style={{marginHorizontal: 40}}>

                        <View style={{marginBottom: 20, flexDirection: "row", justifyContent: "space-between"}}>
                            <View style={{justifyContent: "center"}}>
                            </View>
                            <View style={{justifyContent: "center"}}>
                                <Text style={{textAlign:'center', fontSize:25, fontWeight:'bold'}}> {title} </Text>
                            </View>
                            <View style={{justifyContent: "center"}}>
                                {icon}
                            </View>
                        </View>

                        <Text style={{alignItems:'center', fontSize:14}}> {message} </Text>
                    </View>

                    {/*<View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>{message}</Text>
                            <View style={styles.buttonContainer}>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => onCancel()}
                                >
                                    <Text style={styles.textStyle}>Close</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>*/}
            </Modal>
        </Portal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
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
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonClose: {
        backgroundColor: '#364958',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});