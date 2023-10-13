import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator } from 'react-native';
import { useTheme } from "styled-components";

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
  LoadContainer
 } from "./styles";

import { TransactionCard, TrasactionCardProps } from "../../components/TransactionCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export interface DataListProps extends TrasactionCardProps {
  id: string;
} 

interface HighlightProps {
  amount: string;
  lasTransaction: string;
}

interface HighlightData {
  entries: HighlightProps;
  expensive: HighlightProps;
  total: HighlightProps;
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [transaction, setTransaction] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);

  const theme = useTheme();

  function getLastTransactionDate(
    collection: DataListProps[],
    type: 'positive' | 'negative'
  ) {
    const lastTransaction = new Date(
    Math.max.apply(Math, collection
      .filter(transaction => transaction.type === type)
      .map(transaction => new Date(transaction.date).getTime())));

    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', { month: 'long'})}`
  }

  async function loadTransaction() {
    const datakey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(datakey);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted = transactions
    .map((item: DataListProps) => {
        if(item.type === 'positive') {
          entriesTotal += Number(item.amount)
        }else {
          expensiveTotal += Number(item.amount)
        }

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

    setTransaction(transactionsFormatted); 

    const lasTransactionEntries = getLastTransactionDate(transactions, 'positive');
    const lasTransactionExpensive = getLastTransactionDate(transactions, 'negative');
    const totalInterval = `01 à ${lasTransactionExpensive}`

    const total = entriesTotal - expensiveTotal;

    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lasTransaction: `Última entrada dia ${lasTransactionEntries} `
      },
      expensive: {
        amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lasTransaction: `Última saída dia ${lasTransactionExpensive} `
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lasTransaction: totalInterval
      }
    })

    setIsLoading(false);
  }

  useEffect(() => {
    loadTransaction()
  },[])

  useFocusEffect(useCallback(() => {
    loadTransaction();
  },[]));
  

  return (
    <Container>
      {
          isLoading ? 
          <LoadContainer>
            <ActivityIndicator 
              color={theme.colors.primary} 
              size="large"
            /> 
          </LoadContainer> :
        <>
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
              amount={highlightData?.entries?.amount}
              lastTransaction={highlightData.entries.lasTransaction}
            />
            <HighlightCard
                type="down"
                title="Saídas"
                amount={highlightData?.expensive?.amount}
                lastTransaction={highlightData.expensive.lasTransaction}
            />
            <HighlightCard 
                type="total"
                title="Total"
                amount={highlightData?.total?.amount}
                lastTransaction={highlightData.total.lasTransaction}
            />
          </HighlightCards>

          <Transactions>
            <Title>Listagem</Title>
            <TransactionList
              data={transaction}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <TransactionCard data={item}/>}
            />
              
          </Transactions>
        
        </>
      }
    </Container>
  )
}

