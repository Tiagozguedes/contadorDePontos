import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import PartidaScreen from './src/screens/PartidaScreen';
import RankingScreen from './src/screens/RankingScreen';
import RegrasScreen from './src/screens/RegrasScreen';
import { GameState, TabName } from './src/types';
import { initialGameState } from './src/utils';

const SCREEN_WIDTH = Dimensions.get('window').width;
const MAX_WIDTH = Math.min(SCREEN_WIDTH, 400);

export default function App() {
  const [activeTab, setActiveTab] = useState<TabName>('partida');
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  const tabs: { name: TabName; label: string; icon: string }[] = [
    { name: 'partida', label: 'Partida', icon: '🎮' },
    { name: 'ranking', label: 'Ranking', icon: '🏆' },
    { name: 'regras', label: 'Regras', icon: '📖' },
  ];

  const renderScreen = () => {
    switch (activeTab) {
      case 'partida':
        return <PartidaScreen gameState={gameState} onUpdateGame={setGameState} />;
      case 'ranking':
        return <RankingScreen gameState={gameState} />;
      case 'regras':
        return <RegrasScreen />;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#060d14', alignItems: 'center' }}>
      <SafeAreaView style={{ flex: 1, width: MAX_WIDTH, backgroundColor: '#0f1923' }}>
        <StatusBar style="light" />

        {/* Conteúdo */}
        <View style={{ flex: 1 }}>
          {renderScreen()}
        </View>

        {/* Tab Bar */}
        <View style={{
          flexDirection: 'row',
          backgroundColor: '#0f1923',
          borderTopWidth: 1,
          borderTopColor: '#1a2332',
          paddingBottom: 12,
          paddingTop: 8,
        }}>
          {tabs.map(tab => (
            <TouchableOpacity
              key={tab.name}
              style={{ flex: 1, alignItems: 'center' }}
              onPress={() => setActiveTab(tab.name)}
            >
              <Text style={{ fontSize: 20 }}>{tab.icon}</Text>
              <Text style={{
                color: activeTab === tab.name ? '#00bcd4' : '#555',
                fontSize: 11,
                fontWeight: activeTab === tab.name ? 'bold' : 'normal',
                marginTop: 2,
              }}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    </View>
  );
}