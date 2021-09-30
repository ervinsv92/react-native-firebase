import React, { useEffect, useState } from 'react';
import {View, ScrollView, TextInput, Button, StyleSheet, ActivityIndicator, Alert} from 'react-native';
import firebase from '../database/firebase';

const initialState = {
    id:'',
    name:'',
    email:'',
    phone:''
}

export const UserDetailScreen = (props) => {
    const [loading, setLoading] = useState(true);
    const [state, setState] = useState(initialState);
    const getUserById = async (id)=>{
       const dbRef = firebase.db.collection('users').doc(id);
       const doc = await dbRef.get();
       const user = doc.data();
       user.id = id;
       return user;
    }

    useEffect(() => {
        (async function() {
            const user = await getUserById(props.route.params.userId);
            setState(user);
            setLoading(false);
        })();
    }, [])

    const handleChangeText = (name, value)=>{
        setState({...state, [name]:value});
    }

    const handleOnUpdate = async ()=>{
        
        if(state.name ===''){
            alert('Debe ingresar un nombre.');
        }else{
            try {
                const dbRef = firebase.db.collection('users').doc(state.id);
                await dbRef.set({
                    ...state
                });
                setState(initialState);
                props.navigation.navigate('UserList');
            } catch (error) {
                console.log(error)
            }
        }
    }

    const handleOnDelete = async ()=>{
        const dbRef = await firebase.db.collection('users').doc(props.route.params.userId);
        await dbRef.delete();
        props.navigation.navigate('UserList');
    }

    const openConfirmationAlert = ()=>{
        Alert.alert('Remover usuario', '¿Está seguro?',[
            {text:'Si', onPress:()=>handleOnDelete()},
            {text:'No', onPress:()=>console.log(false)}
        ])
    }
    if(loading){
        return (
            <View>
                <ActivityIndicator size="large" color="#9e9e9e"/>
            </View>
        )
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
                <Button 
                    color="#19AC52"
                    title="Actualizar" onPress={handleOnUpdate}/>
            </View>
            <View>
                <Button 
                    color="#E37399"
                    title="Eliminar" onPress={openConfirmationAlert}/>
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