import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';

const STORAGE_KEY = '@has_seen_onboarding';

export default function LoginScreen({ navigation, onSuccess }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const submit = () => {
    if (!email || !senha) return Alert.alert('Atenção', 'Preencha e-mail e senha.');
    onSuccess();
  };

  const voltarTutorial = async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Onboarding', params: { startIndex: 0 } }],
      })
    );
  };

  return (
    <View style={styles.container}>
      <Label text="E-mail" />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholder="E-mail"
        placeholderTextColor="#8EA1C0"
      />

      <Label text="Senha" />
      <TextInput
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        placeholder="Senha"
        placeholderTextColor="#8EA1C0"
      />

      <TouchableOpacity style={[styles.btn, styles.primary]} onPress={submit}>
        <Text style={styles.btnText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.btn, styles.secondary]} onPress={() => navigation.navigate('Cadastro')}>
        <Text style={[styles.btnText, { color: '#0A6BF2' }]}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.btn, styles.danger]} onPress={voltarTutorial}>
        <Text style={styles.btnText}>Voltar para Tutorial</Text>
      </TouchableOpacity>
    </View>
  );
}

function Label({ text }) {
  return <Text style={{ color: '#0E1B2C', fontWeight: '700', marginBottom: 6, alignSelf: 'flex-start' }}>{text}</Text>;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', padding: 24, width: '100%' },
  input: { width: '100%', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, color: '#0E1B2C', backgroundColor: '#F8FAFC', marginBottom: 12 },
  btn: { paddingVertical: 14, paddingHorizontal: 18, borderRadius: 12, alignItems: 'center', width: '100%', marginTop: 8 },
  primary: { backgroundColor: '#0A6BF2' },
  secondary: { backgroundColor: '#E6F0FF', borderWidth: 1, borderColor: '#BBD5FF' },
  danger: { backgroundColor: '#EF4444' },
  btnText: { color: '#fff', fontWeight: '700' },
});
