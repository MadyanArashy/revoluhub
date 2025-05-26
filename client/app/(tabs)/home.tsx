import React, { useEffect, useState } from 'react';
import { Text, View, Image, ScrollView, FlatList } from 'react-native';
import tw from 'twrnc';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import axios from 'axios';

type User = {
  url: string;
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

type Siswa = {
  id: number;
  nama: string;
  nis: number;
  kelas: string;
  jurusan: string
}

export default function home() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  useEffect(() => {
    getUsers();
    // getSiswas();
  },[])

  const [users, setUsers] = useState<User[]>([]);
  const [siswas, setSiswas] = useState<Siswa[]>([]);

  const getUsers = async() => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/users");
      setUsers(response.data);
      // console.log(response);
    } catch (err) {
      console.error(err);
    }
  }
  
  // const getSiswas = async() => {
  //   try {
  //     const response = await axios.get("http://192.168.137.98:8000/api/siswa");
  //     setSiswas(response.data);
  //     // console.log(response);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  return (
    <ThemedView darkColor='#151515' lightColor='white' style={tw`flex-1 px-4`}>
      <SafeAreaView style={tw`flex-1`}>
          <ThemedText style={tw`font-bold text-xl underline text-center`}>
            Users List:
          </ThemedText>
          <FlatList
          data={users}
          scrollEnabled={true}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
          <View style={tw`flex-col bg-[${colors.secondary}] w-full mx-4 shadow mb-2 px-4 py-2 rounded-lg`}>
            <ThemedText style={tw`text-center text-lg font-bold`}>
              {item.name}
            </ThemedText>
            <View style={tw`flex-col gap-1`}>
              <ThemedText><Text style={tw`font-bold`}>Nama:</Text> {item.name}</ThemedText>
              <ThemedText><Text style={tw`font-bold`}>Email:</Text> {item.email}</ThemedText>
              <ThemedText><Text style={tw`font-bold`}>Phone:</Text> {item.phone}</ThemedText>
              <ThemedText><Text style={tw`font-bold`}>Website:</Text> {item.website}</ThemedText>
            </View>
          </View>
          )}
          />
         
          {/* <ThemedText style={tw`font-bold text-xl underline`}>
            Siswas List:
          </ThemedText>
          <FlatList
            data={siswas}
            scrollEnabled={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={tw`mb-2`} key={item.id}>
                <ThemedText>{item.nama}</ThemedText>
              </View>
            )}
          /> */}
      </SafeAreaView>
    </ThemedView>
  );
};
