import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ActivityIndicator } from 'react-native';

const API_URL = 'https://infoassef.com.br/api/agendamento/cadastroEmpresa/'; // deixe a barra final se sua rota exigir

export default function RegisterScreen({ onSuccess }) {
  const [nome, setNome]         = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail]       = useState('');
  const [endereco, setEndereco] = useState('');
  const [urlLogo, setUrlLogo]   = useState('');
  const [loading, setLoading]   = useState(false);

  const validarEmail = (valor) => /^\S+@\S+\.\S+$/.test(valor);

  const submit = async () => {
    // Validações simples
    if (!nome || !telefone || !email || !endereco) {
      return Alert.alert('Atenção', 'Preencha todos os campos obrigatórios: Nome, Telefone, E-mail e Endereço.');
    }
    if (!validarEmail(email)) {
      return Alert.alert('Atenção', 'Digite um e-mail válido.');
    }

    setLoading(true);
    try {
      // Monte o payload conforme seu backend espera.
      // Se seu backend só espera nome/telefone/urlLogo/idRamoAtividade, ajuste aqui:
      const payload = {
        nome,
        telefone,
        email,     // remova se o backend não utilizar
        endereco,  // remova se o backend não utilizar
        urlLogo,   // remova se o backend não utilizar
        // idRamoAtividade: null, // descomente/ajuste se precisar enviar
      };

      console.log('Enviando para API:', API_URL, payload);

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      // Tente ler JSON; se falhar, tente texto para log
      let data;
      const text = await response.text();
      try {
        data = JSON.parse(text);
      } catch {
        data = { message: text };
      }

      console.log('Status:', response.status);
      console.log('Resposta:', data);

      if (response.ok) {
        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
        onSuccess?.(data);
      } else {
        Alert.alert('Erro', data?.message || `Falha no cadastro (status ${response.status}).`);
      }
    } catch (err) {
      console.log('Erro de conexão:', err);
      Alert.alert('Erro de conexão', 'Não foi possível conectar ao servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Input label="Nome" value={nome} onChangeText={setNome} />
      <Input label="Telefone" value={telefone} onChangeText={setTelefone} keyboardType="phone-pad" />
      <Input label="E-mail" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <Input label="URL da Logomarca" value={urlLogo} onChangeText={setUrlLogo} />
      <Input label="Endereço" value={endereco} onChangeText={setEndereco} />

      <TouchableOpacity style={[styles.btn, styles.primary]} onPress={submit} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Criar conta</Text>}
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
  container: {
    flex: 1, backgroundColor: '#fff',
    alignItems: 'center', justifyContent: 'center',
    padding: 24, width: '100%',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#0E1B2C',
    backgroundColor: '#F8FAFC',
  },
  btn: {
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    marginTop: 8,
  },
  primary: { backgroundColor: '#0A6BF2' },
  btnText: { color: '#fff', fontWeight: '700' },
});
