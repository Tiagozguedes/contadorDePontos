import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import PlayerCard from '../components/PlayerCard';
import { GameState, Player, HistoryEntry } from '../types';
import { initialGameState } from '../utils';

interface Props {
  gameState: GameState;
  onUpdateGame: (state: GameState) => void;
}

export default function PartidaScreen({ gameState, onUpdateGame }: Props) {
  const handleUpdate = (updated: Player, entry: HistoryEntry) => {
    const players = gameState.players.map(p =>
      p.id === updated.id ? updated : p
    );
    onUpdateGame({
      ...gameState,
      players,
      history: [...gameState.history, entry],
    });
  };

  const handleReset = (updated: Player) => {
    const players = gameState.players.map(p =>
      p.id === updated.id ? updated : p
    );
    onUpdateGame({ ...gameState, players });
  };

  const handleResetAll = () => {
    onUpdateGame(initialGameState);
  };

  return (
    <ScrollView
      className="flex-1"
      style={{ backgroundColor: '#0f1923' }}
      contentContainerStyle={{ padding: 16 }}
    >
      {/* Header */}
      <View className="flex-row items-center justify-between mb-4">
        <TouchableOpacity>
          <Text style={{ color: '#00bcd4', fontSize: 20 }}>⚙️</Text>
        </TouchableOpacity>

        <Text className="font-bold text-base tracking-widest"
          style={{ color: 'white' }}>
          Contador de Pontos Pro
        </Text>

        <TouchableOpacity onPress={handleResetAll}>
          <Text style={{ color: '#00bcd4', fontSize: 20 }}>🕐</Text>
        </TouchableOpacity>
      </View>

      {/* Cards dos jogadores */}
      {gameState.players.map(player => (
        <PlayerCard
          key={player.id}
          player={player}
          round={gameState.round}
          onUpdate={handleUpdate}
          onReset={handleReset}
        />
      ))}
    </ScrollView>
  );
}