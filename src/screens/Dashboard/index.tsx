import React, { useCallback, useEffect, useState } from "react";

import { HighlightCard } from "../../components/HighlightCard";
import { 
  Container,
  Header,
  UserWrapper,
  UserInfo,
  LogoutButton,
  Icon,
  Photo,
  User,
  UserGreeting,
  UserName,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
 } from "./styles";

import { TransactionCard, TrasactionCardProps } from "../../components/TransactionCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export interface DataListProps extends TrasactionCardProps {
  id: string;
} 

export function Dashboard() {
  const [data, setDate] = useState<DataListProps[]>([]);


  async function loadTransaction() {
    const datakey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(datakey);
    const transactions = response ? JSON.parse(response) : [];

    const transactionsFormatted = transactions
    .map((item: DataListProps) => {
      const amount = Number(item.amount)
      .toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });

      const date = Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      }).format(new Date(item.date));
       
      return {
        id: item.id,
        name: item.name,
        amount,
        type: item.type,  
        category: item.category,
        date
      }
      
    });

    setDate(transactionsFormatted); 
  }

  useEffect(() => {
    loadTransaction()
  },[])

  useFocusEffect(useCallback(() => {
    loadTransaction();
  },[]));
  

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: "https://github.com/gabrielodeveloper.png"}} />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Gabriel</UserName>
            </User>
          </UserInfo>

        <LogoutButton onPress={() => {}}>
            <Icon name="power" />
        </LogoutButton>
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard 
          type="up"
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de abril"
        />
        <HighlightCard
            type="down"
            title="Saídas"
            amount="R$ 1.259,00"
            lastTransaction="Última saída dia 03 de abril"
         />
        <HighlightCard 
            type="total"
            title="Total"
            amount="R$ 16.141,00"
            lastTransaction="01 à 16 de abril"
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>
        <TransactionList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item}/>}
        />
          
      </Transactions>
    </Container>
  )
}

