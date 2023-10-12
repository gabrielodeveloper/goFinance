import { ThemeProvider } from 'styled-components';
import { NavigationContainer } from '@react-navigation/native';

import { AppRoutes } from './src/routes/app.routes';

import theme from './src/global/styles/theme';

export function Myapp() {
  return (
      <ThemeProvider theme={theme}>
        <NavigationContainer>
            <AppRoutes />
        </NavigationContainer>
      </ThemeProvider>
  )
}
