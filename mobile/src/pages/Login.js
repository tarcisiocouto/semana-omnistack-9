import React, {useState, useEffect} from 'react';
import { View, AsyncStorage, KeyboardAvoidingView, Platform, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import api from '../services/api';

import logo from '../assets/logo.png';
import { bold } from 'ansi-colors';

export default function Login({ navigation }){

    const [email, SetEmail] = useState('');
    const [techs, SetTechs] = useState('');

    // useEffect, executa assim que todo o bloco de código é montado
    // verifica se o usuário já está logado. se sim redireciona o u
    // user para a tela de listagem.
    //  com o array vazio, a instrução só é executada uma vez
    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if(user){
                navigation.navigate('List');
            }
        })
    }, []);

    async function handleSubmit(){
        const response = await api.post('/sessions', {
            email
        })
        const { _id } = response.data;
        await AsyncStorage.setItem('user', _id);
        await AsyncStorage.setItem('techs', techs);
        navigation.navigate('List');
    }

    return (
        <KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior="padding" style={style.container}>
            <Image source={logo}></Image>
            <View style={style.form}>
                <Text style={style.label}>SEU EMAIL *</Text>
                <TextInput
                    style={style.input}
                    placeholder="Seu e-mail"
                    placeholderTextColor= '#999'
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={SetEmail}
                />

                <Text style={style.label}>TECNOLOGIAS *</Text>
                <TextInput
                    style={style.input}
                    placeholder="Tecnologias de interesse"
                    placeholderTextColor= '#999'
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={techs}
                    onChangeText={SetTechs}
                />

                <TouchableOpacity onPress={handleSubmit} style={style.button}>
                    <Text style={style.buttonText}>Encontrar spots</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30,
    },

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },

    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    },
});