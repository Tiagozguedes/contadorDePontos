import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Player, HistoryEntry } from '../types';
import { addPoints, resetPlayer } from '../utils';

interface PlayerCardProps {
  player: Player;
  round: number;
  onUpdate: (player: Player, entry: HistoryEntry) => void;
  onReset: (player: Player) => void;
}

export default function PlayerCard({
  player,
  round,
  onUpdate,
  onReset,
}: PlayerCardProps) {
  const [editingName, setEditingName] = useState(false);
  const [tempName, setTempName] = useState(player.name);

  const isBlue = player.color === 'blue';

  const handlePoints = (points: number) => {
    const updated = addPoints(player, points);
    const entry: HistoryEntry = {
      playerId: player.id,
      playerName: player.name,
      points,
      round,
    };
    onUpdate(updated, entry);
  };

  const handleNameConfirm = () => {
    setEditingName(false);
    onUpdate({ ...player, name: tempName }, {
      playerId: player.id,
      playerName: tempName,
      points: 0,
      round,
    });
  };

  return (
    <View
      className="w-full rounded-2xl p-4 mb-2"
      style={{ backgroundColor: '#1a2332' }}
    >
      {/* Nome do jogador */}
      <View className="flex-row items-center justify-center mb-2">
        <Text style={{ color: isBlue ? '#00bcd4' : '#f44336', marginRight: 6 }}>
          ▲
        </Text>

        {editingName ? (
          <View className="flex-row items-center">
            <TextInput
              value={tempName}
              onChangeText={setTempName}
              autoFocus
              style={{
                color: 'white',
                borderBottomWidth: 1,
                borderBottomColor: isBlue ? '#00bcd4' : '#f44336',
                minWidth: 100,
                textAlign: 'center',
                fontSize: 14,
                fontWeight: 'bold',
              }}
            />
            <TouchableOpacity onPress={handleNameConfirm} style={{ marginLeft: 8 }}>
              <Text style={{ color: '#4caf50', fontSize: 18 }}>✓</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={() => setEditingName(true)}>
            <Text
              className="font-bold text-sm tracking-widest"
              style={{ color: 'white' }}
            >
              {player.name}
            </Text>
          </TouchableOpacity>
        )}

        {!editingName && (
          <TouchableOpacity onPress={() => setEditingName(true)} style={{ marginLeft: 6 }}>
            <Text style={{ color: '#888', fontSize: 12 }}>✏️</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Placar */}
      <Text
        className="text-center font-bold"
        style={{ fontSize: 72, color: 'white', lineHeight: 80 }}
      >
        {player.score}
      </Text>

      {/* Botões */}
      <View className="flex-row gap-2 mt-2">
        <TouchableOpacity
          onPress={() => handlePoints(-1)}
          className="flex-1 rounded-xl py-3 items-center"
          style={{ backgroundColor: '#263248' }}
        >
          <Text className="font-bold" style={{ color: 'white' }}>-1</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handlePoints(1)}
          className="flex-1 rounded-xl py-3 items-center"
          style={{ backgroundColor: isBlue ? '#00bcd4' : '#f44336' }}
        >
          <Text className="font-bold" style={{ color: 'white' }}>+1</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row gap-2 mt-2">
        <TouchableOpacity
          onPress={() => handlePoints(5)}
          className="flex-1 rounded-xl py-3 items-center"
          style={{ backgroundColor: isBlue ? '#00838f' : '#b71c1c' }}
        >
          <Text className="font-bold" style={{ color: 'white' }}>+5</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handlePoints(10)}
          className="flex-1 rounded-xl py-3 items-center"
          style={{ backgroundColor: isBlue ? '#00838f' : '#b71c1c' }}
        >
          <Text className="font-bold" style={{ color: 'white' }}>+10</Text>
        </TouchableOpacity>
      </View>

      {/* Reset */}
      <TouchableOpacity
        onPress={() => onReset(resetPlayer(player))}
        className="items-center mt-3"
      >
        <Text style={{ color: '#888', fontSize: 20 }}>↺</Text>
      </TouchableOpacity>
    </View>
  );
}