import React from 'react';
import { View, Text, ScrollView } from 'react-native';

export default function RegrasScreen() {
  return (
    <ScrollView className="flex-1 p-4" style={{ backgroundColor: '#0f1923' }}>
      <Text
        className="text-center font-bold text-lg mb-6 tracking-widest"
        style={{ color: 'white' }}
      >
        📖 REGRAS
      </Text>

      {[
        { titulo: '🎯 Objetivo', texto: 'Acumule mais pontos que seu adversário ao final das rodadas.' },
        { titulo: '➕ Pontuação', texto: 'Use os botões +1, +5 e +10 para adicionar pontos. Use -1 para corrigir erros.' },
        { titulo: '↺ Reset', texto: 'O botão de reset individual zera apenas aquele jogador. O botão do histórico zera o jogo inteiro.' },
        { titulo: '✏️ Nomes', texto: 'Toque no nome ou no lápis para editar o nome do jogador.' },
        { titulo: '🏆 Ranking', texto: 'A aba Ranking mostra a classificação atual e o histórico completo de pontos.' },
      ].map((regra, i) => (
        <View
          key={i}
          className="rounded-2xl p-4 mb-3"
          style={{ backgroundColor: '#1a2332' }}
        >
          <Text style={{ color: '#00bcd4', fontWeight: 'bold', marginBottom: 4 }}>
            {regra.titulo}
          </Text>
          <Text style={{ color: '#aaa', lineHeight: 20 }}>
            {regra.texto}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}