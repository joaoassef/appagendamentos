import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';

export default function LoginScreen({ onSuccess }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const submit = () => {
    if (!email || !senha) return Alert.alert('Atenção', 'Preencha e-mail e senha.');
    onSuccess(); // aqui você depois troca pela chamada de API real
  };

  return (
    <View style={styles.container}>
      <Input label="E-mail" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <Input label="Senha" value={senha} onChangeText={setSenha} secureTextEntry />

      <TouchableOpacity style={[styles.btn, styles.primary]} onPress={submit}>
        <Text style={styles.btnText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

function Input({ label, ...props }) {
  return (
    <View style={{ width: '100%', marginBottom: 12 }}>
      <Text style={{ color: '#0E1B2C', fontWeight: '700', marginBottom: 6 }}>{label}</Text>
      <TextInput
        placeholder={label}
        style={styles.input}
        placeholderTextColor="#8EA1C0"
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', padding: 24, width: '100%' },
  input: { width: '100%', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, color: '#0E1B2C', backgroundColor: '#F8FAFC' },
  btn: { paddingVertical: 14, paddingHorizontal: 18, borderRadius: 12, alignItems: 'center', width: '100%', marginTop: 8 },
  primary: { backgroundColor: '#0A6BF2' },
  btnText: { color: '#fff', fontWeight: '700' },
});
