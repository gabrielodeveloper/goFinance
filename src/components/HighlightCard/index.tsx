import { 
  Container,
  Headers,
  Title,
  Icon,
  Footer,
  Amount,
  LastTransaction,
} from "./styles";

interface Props {
  type: 'up' | 'down' | 'total';
  title: string;
  amount: string;
  lastTransaction: string;
}

const icon = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
  total: 'dollar-sign'
}

export function HighlightCard({ 
  type,
  title, 
  amount, 
  lastTransaction
}: Props) {
  return (
    <Container type={type}>
      <Headers>
        <Title type={type}>{title}</Title>
        <Icon 
          name={icon[type]} 
          type={type} 
        />
      </Headers>

      <Footer>
        <Amount type={type}>{amount}</Amount>
        <LastTransaction type={type}>
          {lastTransaction}
        </LastTransaction>
      </Footer>
    </Container>
  )
}