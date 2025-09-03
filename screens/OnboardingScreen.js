import React from 'react';
import OnboardingCarousel from '../src/componentes/Com_carrocel';

export default function OnboardingScreen({ navigation, route, onFinish }) {
  const startIndex = route?.params?.startIndex ?? 0;

  return (
    <OnboardingCarousel
      startIndex={startIndex}
      onFinish={onFinish}
      
      onPressEntrar={() => {
        onFinish();
        navigation.replace('Login');
      }}
      onPressCadastrar={() => {
        onFinish();
        navigation.replace('Cadastro');
      }}
    />
  );
}
