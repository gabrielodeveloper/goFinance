import { TouchableOpacityProps } from 'react-native';

import { Container, Icon, Title } from "./styles";

interface Props extends TouchableOpacityProps {
  type: 'up' | 'down';
  title: string;
  isActive: boolean;
}

const icon = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle'
}

export function TransactionTypeButton({ 
  type, 
  title, 
  isActive,
  ...rest 
} : Props ) {
  return (
    <Container 
      type={type}
      isActive={isActive}
      {...rest}
    >
      <Icon 
        name={icon[type]} 
        type={type} 
      />
      <Title>{title}</Title>
    </Container>
  )
}