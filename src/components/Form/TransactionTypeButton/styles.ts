import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";
import { css } from "styled-components";

interface IconProps {
  type: 'up' | 'down';
}

interface ContainerProps {
  isActive: boolean;
  type: 'up' | 'down';
}

export const Container = styled(TouchableOpacity)<ContainerProps>`
  background-color: transparent;

  padding: 18px;
  width: 48%;

  border: 1.5px solid ${({ theme }) => theme.colors.text};
  border-radius: 5px;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  ${({ isActive, type }) => 
    isActive && type === 'up' && css`
      background-color: ${({ theme }) => theme.colors.success_light};
      border: 0;
   `
  }

${({ isActive, type }) => 
    isActive && type === 'down' && css`
      background-color: ${({ theme }) => theme.colors.attention_light};
      border: 0;
   `
  }
`;

export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(24)}px;
  color: ${({ theme, type }) => 
  type === 'up' ? theme.colors.success : theme.colors.attention};
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;

  margin-left: 12px;
`;