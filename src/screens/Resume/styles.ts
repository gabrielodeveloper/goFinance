import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {  flex: 1, paddingHorizontal: 24}
})``;

export const ChartContainer = styled.View`
  width: 100%;
  align-items: center;
`;