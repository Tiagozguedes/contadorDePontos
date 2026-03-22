import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Player, HistoryEntry } from '../types';
import { addPoints, resetPlayer } from '../utils';

interface PlayerCardProps {
    player: Player;
    round: number;
    onUpdate: (player: Player, entry: HistoryEntry) => void;
    onReset: (player: Player) => void;
}

export default function PlayerCard({ player, round, onUpdate, onReset }: PlayerCardProps) {
    const [editingName, setEditingName] = useState(false);
    const [tempName, setTempName] = useState(player.name);
    const isBlue = player.color === 'blue';

    const handlePoints = (points: number) => {
        const updated = addPoints(player, points);
        const entry: HistoryEntry = { playerId: player.id, playerName: player.name, points, round };
        onUpdate(updated, entry);
    };

    const handleNameConfirm = () => {
        setEditingName(false);
        onUpdate({ ...player, name: tempName }, { playerId: player.id, playerName: tempName, points: 0, round });
    };

    return (
        <View style={{ width: '100%', backgroundColor: '#1a2332', borderRadius: 16, padding: 16, marginBottom: 8 }}>

            {/* Nome */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                <Text style={{ color: isBlue ? '#00bcd4' : '#f44336', marginRight: 6 }}>▲</Text>

                {editingName ? (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TextInput
                            value={tempName}
                            onChangeText={setTempName}
                            autoFocus
                            style={{ color: 'white', borderBottomWidth: 1, borderBottomColor: isBlue ? '#00bcd4' : '#f44336', minWidth: 100, textAlign: 'center', fontSize: 14, fontWeight: 'bold' }}
                        />
                        <TouchableOpacity onPress={handleNameConfirm} style={{ marginLeft: 8 }}>
                            <Text style={{ color: '#4caf50', fontSize: 18 }}>✓</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <TouchableOpacity onPress={() => setEditingName(true)}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12, letterSpacing: 2 }}>
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
            <Text style={{ fontSize: 72, color: 'white', fontWeight: 'bold', textAlign: 'center', lineHeight: 80 }}>
                {player.score}
            </Text>

            {/* Botões linha 1 */}
            <View style={{ flexDirection: 'row', marginTop: 8, gap: 8 }}>
                <TouchableOpacity onPress={() => handlePoints(-1)} style={{ flex: 1, backgroundColor: '#263248', borderRadius: 12, paddingVertical: 12, alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>-1</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handlePoints(1)} style={{ flex: 1, backgroundColor: isBlue ? '#00bcd4' : '#f44336', borderRadius: 12, paddingVertical: 12, alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>+1</Text>
                </TouchableOpacity>
            </View>

            {/* Botões linha 2 */}
            <View style={{ flexDirection: 'row', marginTop: 8, gap: 8 }}>
                <TouchableOpacity onPress={() => handlePoints(5)} style={{ flex: 1, backgroundColor: isBlue ? '#00838f' : '#b71c1c', borderRadius: 12, paddingVertical: 12, alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>+5</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handlePoints(10)} style={{ flex: 1, backgroundColor: isBlue ? '#00838f' : '#b71c1c', borderRadius: 12, paddingVertical: 12, alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>+10</Text>
                </TouchableOpacity>
            </View>

            {/* Reset */}
            <TouchableOpacity onPress={() => onReset(resetPlayer(player))} style={{ alignItems: 'center', marginTop: 12 }}>
                <Text style={{ color: '#888', fontSize: 20 }}>↺</Text>
            </TouchableOpacity>

        </View>
    );
}