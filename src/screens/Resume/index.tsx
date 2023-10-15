import React, { useEffect, useState } from "react";
import { VictoryPie } from 'victory-native';

import { categories } from "../../utils/categories";

import { HistoryCard } from "../../components/HistoryCard"
import { Header } from "../../components/Header";

import { Container, Content, ChartContainer } from "./styles";

import AsyncStorage from "@react-native-async-storage/async-storage";

interface TrasactionData {
  type: 'positive' | 'negative';
  name: string; 
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  key: string;
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
} 

export function Resume() {
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

  async function loadData() {

    const datakey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(datakey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensives = responseFormatted
    .filter((expensive: TrasactionData) => expensive.type === 'negative');

    const totalByCategory: CategoryData[] = [];

    categories.forEach(category => {
      let categorySum = 0;

      expensives.forEach((expensive: TrasactionData) => {
        if(expensive.category === category.key){
          categorySum += Number(expensive.amount);
        }
      });

      if(categorySum > 0) {
        const totalFormatted = categorySum
        .toLocaleString('pt-BR',  {
          style: 'currency',
          currency: 'BRL'
        });

        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total: categorySum,
          totalFormatted
        })
      }
  })

  setTotalByCategories(totalByCategory)

} 

  useEffect(() => {
    loadData()
  },[])

  return (
    <Container>
      <Header title="Resumo por categorias" />
        <Content>
            <ChartContainer>
               <VictoryPie 
                    data={totalByCategories}
                    x="name"
                    y="total"
                    />
              </ChartContainer>
            {
              totalByCategories.map(item => (
                <HistoryCard 
                  key={item.key}
                  title={item.name}
                  amount={item.totalFormatted}
                  color={item.color}
                />
              ))
            }
        </Content>
      </Container>
  )
}