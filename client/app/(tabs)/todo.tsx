import React, { useEffect, useState } from 'react';
import { Text, View, Image, ScrollView, FlatList } from 'react-native';
import tw from 'twrnc';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import axios from 'axios';

type Siswa = {
  id: number;
  nama: string;
  nis: number;
  kelas: string;
  jurusan: string
}

export default function todo() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [siswas, setSiswas] = useState<Siswa[]>([]);

  const API_URL = 'https://20fe-66-96-228-86.ngrok-free.app'

  useEffect(() => {
    getSiswa();
  },[])

  const getSiswa = async() => {
    try {
      const response = await axios.get(`${API_URL}/api/siswa`)
      setSiswas(response.data)
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <ThemedView darkColor='#151515' lightColor='white' style={tw`flex-1 px-4`}>
      <SafeAreaView style={tw`flex-1`}>       
        <ThemedText style={tw`font-bold text-xl underline`}>
          Siswas List:
        </ThemedText>
        <FlatList
          data={siswas}
          scrollEnabled={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
          <View style={tw`flex-col gap-1`}>
            <ThemedText><Text style={tw`font-bold`}>Nama:</Text> {item.nama}</ThemedText>
            <ThemedText><Text style={tw`font-bold`}>NIS:</Text> {item.nis}</ThemedText>
            <ThemedText><Text style={tw`font-bold`}>Kelas:</Text> {item.kelas}</ThemedText>
            <ThemedText><Text style={tw`font-bold`}>Jurusan:</Text> {item.jurusan}</ThemedText>
          </View>
          )}
        />
      </SafeAreaView>
    </ThemedView>
  );
};
