import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from "react-native";
import { useState } from "react";
import { Control, FieldValues, useForm } from 'react-hook-form';

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
    
    const {
      control,
      handleSubmit
    } = useForm<FormData>({
      resolver: yupResolver(schema),
    });

    // const formControll = control as unknown as Control<FieldValues, any>
    
  const [transactionType, setTransactionType ] = useState('');
  const [categoryModalOpen, setCategoryModalOpen ] = useState(false);

  function handletransactionType(type: 'up' | 'down') {
      setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true)
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false)
  }

  function handleRegister(form: FormData) {
    if(!transactionType) 
      return Alert.alert('Selecione o tipo da transação');

    if(category.key === 'category')
      return Alert.alert('Selecione uma categoria');


    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key
    }
    console.log(data);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header title="Cadastro" />

      <Form>
        <Fields>
          <InputForm
            name='name'
            control={control}
            placeholder="Nome"
            autoCapitalize="sentences"
            autoCorrect={false}
          />

          <InputForm
            name='amount'
            control={control} 
            placeholder="Preço" 
            keyboardType="numeric"
          />

          <TransactionButtons>
            <TransactionTypeButton 
              title="Income"
              type="up"
              isActive={transactionType === 'up'}
              onPress={() => handletransactionType('up')}
            />

            <TransactionTypeButton 
              title="Outcome"
              type="down"
              isActive={transactionType === 'down'}
              onPress={() => handletransactionType('down')}
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