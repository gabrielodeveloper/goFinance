import { useEffect, useState } from "react";
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from "react-native";
import { Control, FieldValues, useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

import  AsyncStorage from "@react-native-async-storage/async-storage"; 
import uuid from 'react-native-uuid';

import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelect } from "../../components/Form/CategorySelect";
import { CategorySelectModal } from "../CategorySelectModal";
import { InputForm } from "../../components/Form/InputForm";
import { Button } from "../../components/Form/Button";
import { Header } from "../../components/Header";

import { 
  Container, 
  Form, 
  Fields,
  TransactionButtons
} from "./styles";

interface FormData {
  name: string;
  amount: number;
}

type NavigationProps = {
  navigate: (screen: string) => void;
}

const schema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  amount: yup.
  number()
  .typeError('Informe um valor numérico')
  .positive('O valor não pode ser negativo')
  .required('O valor é obrigatório')
});

export function Register() {
  const [ category, setCategory ] = useState({
    key: 'category',
    name: 'Categoria'
  });

    const navigation = useNavigation<NavigationProps>();
  
    const {
      reset,
      control,
      handleSubmit,
      formState: { errors },
    } = useForm<FormData>({
      resolver: yupResolver(schema),
    });

  const formControll = control as unknown as Control<FieldValues, any>
    
  const [transactionType, setTransactionType ] = useState('');
  const [categoryModalOpen, setCategoryModalOpen ] = useState(false);

  function handletransactionType(type: 'positive' | 'negative') {
      setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true)
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false)
  }

  async function handleRegister(form: FormData) {
    if(!transactionType) 
      return Alert.alert('Selecione o tipo da transação');

    if(category.key === 'category')
      return Alert.alert('Selecione uma categoria');


    const newTransaction = {
      id: String(uuid.v4()), 
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date()
    }
    
    try {
      const datakey = '@gofinances:transactions';

      const data = await AsyncStorage.getItem(datakey);
      const currentData = data ? JSON.parse(data) : [];

      const dataFormatted = [...currentData,newTransaction];

      await AsyncStorage.setItem(datakey, JSON.stringify(dataFormatted));
      
      reset(),
      setTransactionType(''),
      setCategory({
        key: 'category',
        name: 'Categoria'
      });

      navigation.navigate('Listagem')

    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível salvar!');
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header title="Cadastro" />

      <Form>
        <Fields>
          <InputForm
            name='name'
            control={formControll}
            placeholder="Nome"
            autoCapitalize="sentences"
            autoCorrect={false}
            error={errors.name && errors?.name.message}
          />

          <InputForm
            name='amount'
            control={formControll} 
            placeholder="Preço" 
            keyboardType="numeric"
            error={errors.amount && errors?.amount.message}
          />

          <TransactionButtons>
            <TransactionTypeButton 
              title="Income"
              type="up"
              isActive={transactionType === 'positive'}
              onPress={() => handletransactionType('positive')}
            />

            <TransactionTypeButton 
              title="Outcome"
              type="down"
              isActive={transactionType === 'negative'}
              onPress={() => handletransactionType('negative')}
            />  
          </TransactionButtons>

          <CategorySelect 
            title={category.name}
            onPress={handleOpenSelectCategoryModal}
          />
        </Fields>

        <Button
          onPress={handleSubmit(handleRegister)}
          title="Enviar" 
        />
      </Form>

        <Modal visible={categoryModalOpen} >
            <CategorySelectModal
              category={category}
              setCategory={setCategory}
              closeSelectCategory={handleCloseSelectCategoryModal}
            />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  )
}