import { FlatList } from "react-native";
import { Header } from "../../components/Header";
import { categories } from "../../utils/categories";

import { 
  Container,
  Category,
  Icon,
  Name,
  Separator,
  Footer,
} from "./styles";
import { Button } from "../../components/Form/Button";

interface Category {
  key: string;
  name: string;
}

interface Props {
  category: Category;
  setCategory: (category: Category) => void;
  closeSelectCategory: () => void;
}

export function CategorySelectModal({
  category,
  setCategory,
  closeSelectCategory
}: Props) {
  
  function handleCategorySelect(category: Category){
    setCategory(category);
  }

  return(
    <Container>
      <Header title="Categorias" />
        
        <FlatList 
          data={categories}
          keyExtractor={item => item.key}
          renderItem={({item}) => (
            <Category
              onPress={() => handleCategorySelect(item)}
              isActive={category.key === item.key}
            >
              <Icon name={item.icon} />
              <Name>{item.name}</Name>
            </Category>
          )}
          ItemSeparatorComponent={() => <Separator />}
        />

        <Footer>
          <Button
            title="Selecionar" 
            onPress={closeSelectCategory}   
          />
        </Footer>

    </Container>
  )
}