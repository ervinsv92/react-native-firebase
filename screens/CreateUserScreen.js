import React, { useEffect, useState } from 'react';
import {View, Button, TextInput, ScrollView, StyleSheet} from 'react-native';
import firebase from '../database/firebase';

const initialState = {
    name:'',
    email:'',
    phone:''
}

export const CreateUserScreen = (props) => {
    const [state, setState] = useState(initialState);
    
    const handleChangeText = (name, value)=>{
        setState({...state, [name]:value});
    }

    const handleOnPress = async ()=>{
        if(state.name ===''){
            alert('Debe ingresar un nombre.');
        }else{
            try {
                await firebase.db.collection('users').add({
                    ...state
                });
                setState(initialState);
                props.navigation.navigate('UserList');
            } catch (error) {
                console.log(error)
            }
        }
    }
    return (
       <ScrollView style={styles.container}>
           <View style={styles.inputGroup}>
               <TextInput placeholder="Nombre de usuario" value={state.name} onChangeText={(value) => handleChangeText("name", value)}/>
           </View>
           <View style={styles.inputGroup}>
               <TextInput placeholder="Correo electrónico" value={state.email} onChangeText={(value) => handleChangeText("email", value)}/>
           </View>
           <View style={styles.inputGroup}>
               <TextInput placeholder="Teléfono" value={state.phone} onChangeText={(value) => handleChangeText("phone", value)}/>
           </View>
           <View>
               <Button title="Guardar" onPress={handleOnPress}/>
           </View>
       </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:35
    },
    inputGroup:{
        flex:1,
        padding:0,
        marginBottom:15,
        borderBottomWidth:1,
        borderBottomColor:"#ccc"
    }
});