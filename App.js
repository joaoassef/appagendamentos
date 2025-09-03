import React, { useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OnboardingScreen from './screens/OnboardingScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';

const STORAGE_KEY = '@has_seen_onboarding';
const AUTH_KEY = '@auth_token';

const Stack = createNativeStackNavigator();

export default function App() {
  const [checking, setChecking] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [onb, token] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEY),
          AsyncStorage.getItem(AUTH_KEY),
        ]);
        setShowOnboarding(!(onb === 'true'));
        setIsAuthed(!!token);
      } finally {
        setChecking(false);
      }
    })();
  }, []);

  const finishOnboarding = useCallback(async () => {
    await AsyncStorage.setItem(STORAGE_KEY, 'true');
    setShowOnboarding(false);
  }, []);

  const handleLoginSuccess = useCallback(async (mockToken = 'token-demo-123') => {
    await AsyncStorage.setItem(AUTH_KEY, mockToken);
    setIsAuthed(true);
  }, []);

  const handleLogout = useCallback(async () => {
    await AsyncStorage.removeItem(AUTH_KEY);
    setIsAuthed(false);
  }, []);

  if (checking) return null;

  // Defina a rota inicial de acordo com o estado,
  // mas mantenha TODAS as telas registradas abaixo.
  const initial = showOnboarding ? 'Onboarding' : (isAuthed ? 'Home' : 'Login');

  return (
    <NavigationContainer>
      
      <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
        <Stack.Screen initialRouteName={initial} name="Onboarding" options={{ headerShown: false }}>
          {(props) => (
            <OnboardingScreen
              {...props}
              onFinish={finishOnboarding}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Login" options={{ title: 'Entrar' }}>
          {(props) => <LoginScreen {...props} onSuccess={handleLoginSuccess} />}
        </Stack.Screen>

        <Stack.Screen name="Cadastro" options={{ title: 'Criar conta' }}>
          {(props) => <RegisterScreen {...props} onSuccess={handleLoginSuccess} />}
        </Stack.Screen>

        <Stack.Screen name="Home" options={{ title: 'Agenda de Negócios' }}>
          {(props) => (
            <HomeScreen
              {...props}
              onLogout={handleLogout}
              onResetOnboarding={finishOnboarding}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
