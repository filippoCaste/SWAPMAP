'use strict';

import { Alert, StyleSheet, Text } from "react-native";
import { Pressable, View } from "react-native";
import { Modal } from "react-native";


export function ConfirmationAlert({ title, message, onConfirm, onCancel, operation }) {
    //console.log(`message: ${message}`);
    return (
        <Modal
            animationType="slide"
            transparent={true}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                () => onCancel()
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>{message}</Text>
                    <View style={styles.buttonContainer}>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => onCancel()}
                        >
                            <Text style={styles.textStyle}>Cancel</Text>
                        </Pressable>
                        
                        <Pressable
                            style={[styles.button, styles.buttonOpen]}
                            onPress={() => onConfirm()}
                        >
                            <Text style={{fontWeight: 'bold', textAlign: 'center'}}>{operation}</Text>
                        </Pressable>
                    </View>                
                </View>
            </View>
        </Modal>
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
    buttonOpen: {
        backgroundColor: '#C9E4CA',
        marginLeft: 4
    },
    buttonClose: {
        backgroundColor: '#364958',
        marginRight: 4
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