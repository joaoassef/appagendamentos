import React, { useRef, useState, useCallback } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // 👈 pega navigation via hook

const SLIDES = [
  { key: '1', title: 'Agenda de Negócios', desc: 'Aqui você organiza seu tempo e seunegócio.', img: require('../../assets/carrocel/1.png') },
  { key: '2', title: 'Valorize seus Clientes', desc: 'Guarde dados essenciais e tenha tudo à mão na hora do atendimento.', img: require('../../assets/carrocel/2.png') },
  { key: '3', title: 'Agende seus Negócios', desc: 'Seu tempo é valioso, seu cliente também.', img: require('../../assets/carrocel/3.png') },
];

export default function OnboardingCarousel({ onFinish, onSkip }) {
  const navigation = useNavigation();                 // 👈 agora temos navigation
  const { width } = useWindowDimensions();
  const listRef = useRef(null);
  const [index, setIndex] = useState(0);

  const handleNext = useCallback(() => {
    if (index < SLIDES.length - 1) {
      listRef.current?.scrollToIndex({ index: index + 1, animated: true });
    } else {
      // Último slide → marcar como visto e ir para Login
      onFinish?.();
      navigation.replace('Login');                   // 👈 navega para Login
    }
  }, [index, onFinish, navigation]);

  const handleSkip = useCallback(() => {
    // Pular → também marca como visto e vai para Login
    onSkip?.();
    navigation.replace('Login');
  }, [onSkip, navigation]);

  const renderItem = ({ item }) => (
    <View style={[styles.slide, { width }]}>
      <Image source={item.img} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.desc}>{item.desc}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {index < SLIDES.length - 1 && (
        <TouchableOpacity onPress={handleSkip} style={styles.skipBtn} hitSlop={10}>
          <Text style={styles.skipText}>Pular</Text>
        </TouchableOpacity>
      )}

      <FlatList
        ref={listRef}
        data={SLIDES}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
         initialScrollIndex={0} 
        onMomentumScrollEnd={(e) => {
          const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
          setIndex(newIndex);
        }}
      />

      <View style={styles.dots}>
        {SLIDES.map((s, i) => (
          <View key={s.key} style={[styles.dot, i === index && styles.dotActive]} />
        ))}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          onPress={handleNext}
          style={[styles.primaryBtn, index === SLIDES.length - 1 && styles.startBtn]}
        >
          <Text style={styles.primaryBtnText}>
            {index === SLIDES.length - 1 ? 'Começar' : 'Próximo'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const BLUE = '#0A6BF2';
const LIGHT_BLUE = '#EAF2FF';
const DARK = '#0E1B2C';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  slide: { flex: 1, paddingHorizontal: 24, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' },
  image: { width: '100%', height: '90%', marginBottom: -100 },
  title: { fontSize: 28, fontWeight: '700', color: DARK, textAlign: 'center', marginBottom: 0 },
  desc: { fontSize: 16, color: '#3A4763', textAlign: 'center', lineHeight: 22 },
  dots: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  dot: { width: 8, height: 8, borderRadius: 4, marginHorizontal: 5, backgroundColor: LIGHT_BLUE },
  dotActive: { width: 18, backgroundColor: BLUE },
  actions: { paddingHorizontal: 24, paddingBottom: 24 },
  primaryBtn: { backgroundColor: BLUE, paddingVertical: 14, borderRadius: 14, alignItems: 'center', shadowColor: BLUE, shadowOpacity: 0.25, shadowRadius: 8, elevation: 2 },
  startBtn: { backgroundColor: '#0A63DA' },
  primaryBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  skipBtn: { position: 'absolute', top: 50, right: 18, zIndex: 40, padding: 15 },
  skipText: { color: BLUE, fontSize: 14, fontWeight: '700' },
});
