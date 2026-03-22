import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { GameState } from '../types';

interface Props {
  gameState: GameState;
}

export default function RankingScreen({ gameState }: Props) {
  const sorted = [...gameState.players].sort((a, b) => b.score - a.score);

  return (
    <View className="flex-1 p-4" style={{ backgroundColor: '#0f1923' }}>
      <Text
        className="text-center font-bold text-lg mb-6 tracking-widest"
        style={{ color: 'white' }}
      >
        🏆 RANKING
      </Text>

      {sorted.map((player, index) => (
        <View
          key={player.id}
          className="flex-row items-center justify-between rounded-2xl p-4 mb-3"
          style={{ backgroundColor: '#1a2332' }}
        >
          <Text style={{ color: '#00bcd4', fontWeight: 'bold', fontSize: 20 }}>
            #{index + 1}
          </Text>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
            {player.name}
          </Text>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 24 }}>
            {player.score}
          </Text>
        </View>
      ))}

      <Text
        className="text-center font-bold text-lg mt-6 mb-4 tracking-widest"
        style={{ color: 'white' }}
      >
        📋 HISTÓRICO
      </Text>

      <FlatList
        data={[...gameState.history].reverse()}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <View className="flex-row justify-between py-2"
            style={{ borderBottomWidth: 1, borderBottomColor: '#263248' }}>
            <Text style={{ color: '#aaa' }}>{item.playerName}</Text>
            <Text style={{ color: item.points > 0 ? '#4caf50' : '#f44336', fontWeight: 'bold' }}>
              {item.points > 0 ? '+' : ''}{item.points}
            </Text>
          </View>
        )}
      />
    </View>
  );
}