import React, { useEffect, useState } from 'react';
import { Text, View, Image, ScrollView, FlatList } from 'react-native';
import tw from 'twrnc';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import axios from 'axios';

type ArticleItem = {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};

type Article = {
  status: string;
  totalResults: number;
  articles: ArticleItem[];
};

export default function explore() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  useEffect(() => {
    getArticles();
    // getSiswas();
  },[])

  const [articles, setArticles] = useState<ArticleItem[]>([]);

  const getArticles = async() => {
    try {
      const response = await axios.get("https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=5740a61053f747a792ffeb02b50d44e3 ");
      setArticles(response.data.articles);
      // console.log(response);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <ThemedView darkColor='#151515' lightColor='white' style={tw`flex-1 px-4`}>
      <SafeAreaView style={tw`flex-1`}>
          <ThemedText style={tw`font-bold text-xl underline text-center`}>
            Articles List:
          </ThemedText>
          <FlatList
          data={articles}
          scrollEnabled={true}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => (
          <View style={tw`flex-col bg-[${colors.secondary}] w-full mx-auto shadow mb-2 rounded-xl pb-4`}>
            <View style={tw`flex-col gap-2`}>
              <Image source={{ uri: item.urlToImage }} style={tw`w-full h-50 rounded-t-xl`}/>
              <View style={tw`px-4 gap-1`}>
                <ThemedText style={tw`font-bold mb-1 flex-1`}> {item.title} </ThemedText>
                <ThemedText style={tw`text-[${colors.tabIconDefault}]`}><Text style={tw`font-bold text-sm`}>Author:</Text> {item.author}</ThemedText>
                <ThemedText style={tw`text-[${colors.tabIconDefault}]`}>
                  <Text style={tw`font-bold text-sm`}>Published:</Text>{' '}
                  {new Date(item.publishedAt).toLocaleString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </ThemedText>

                <ThemedText style={tw`text-[${colors.tabIconDefault}]`}><Text style={tw`font-bold text-sm`}>Source:</Text> {item.source.name}</ThemedText>
              </View>
            </View>
          </View>
          )}
          />
      </SafeAreaView>
    </ThemedView>
  );
};
