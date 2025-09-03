import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function AuthEntry({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agenda de Negócios</Text>
      <Text style={styles.desc}>Acesse sua conta ou crie uma nova</Text>

      <TouchableOpacity style={[styles.btn, styles.primary]} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.btnText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.btn, styles.secondary]} onPress={() => navigation.navigate('Cadastro')}>
        <Text style={[styles.btnText, { color: '#0A6BF2' }]}>Criar conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', padding: 24, gap: 12 },
  title: { fontSize: 24, fontWeight: '800', color: '#0E1B2C', marginBottom: 8, textAlign: 'center' },
  desc: { fontSize: 14, color: '#3A4763', marginBottom: 12, textAlign: 'center' },
  btn: { paddingVertical: 14, paddingHorizontal: 18, borderRadius: 12, alignItems: 'center', width: '100%' },
  primary: { backgroundColor: '#0A6BF2' },
  secondary: { backgroundColor: '#E6F0FF', borderWidth: 1, borderColor: '#BBD5FF' },
  btnText: { color: '#fff', fontWeight: '700' },
});
