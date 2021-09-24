import React, { useEffect, useState } from 'react';
import { Button, ScrollView, Text, View } from 'react-native';
import firebase from '../database/firebase';
import { ListItem, Avatar } from 'react-native-elements';

export const UserList = (props) => {

    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        firebase.db.collection('users').onSnapshot(querySnapshot => {
            const users = []
            querySnapshot.docs.forEach(doc =>{
                const {name, email, phone} = doc.data();
                users.push({
                    id:doc.id,
                    name, 
                    email, 
                    phone
                });
            });

            setUsuarios(users);
        });
    }, [])

    return (
        <ScrollView>
            <Button onPress={()=> props.navigation.navigate('CreateUserScreen')} title="Nuevo"></Button>
           
           {
               usuarios.map(user => {
                  return (
                    <ListItem bottomDivider onPress={()=>{
                        props.navigation.navigate('UserDetailScreen', {
                            userId:user.id
                        })
                    }}
                        key={user.id}
                    >
                        <ListItem.Chevron />
                        <Avatar 
                            source={{uri:'https://picsum.photos/200'}}
                            rounded
                        />
                        <ListItem.Content>
                            <ListItem.Title>{user.name}</ListItem.Title>
                            <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                   )
               })
           }
        </ScrollView>
    )
}
