import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Breadcrumb = ({ path, onNavigate }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 16 }}>
            {path.map((item, index) => (
                <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {index !== 0 && <Text style={breadcrumb.text}>{' > '}</Text>}
                   {/* <TouchableOpacity onPress={() => onNavigate(item)}>*/}
                        <Text style={breadcrumb.text}>{item}</Text>
                   { /*</TouchableOpacity>*/}
                </View>
            ))}
        </View>
    );
};

const breadcrumb = {text: { fontSize: 18, color: 'grey', fontFamily: 'typewriter' }}

export default Breadcrumb;
