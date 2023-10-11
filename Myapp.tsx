import { ThemeProvider } from 'styled-components';
import { Register } from './src/screens/Register';

import theme from './src/global/styles/theme';

export function Myapp() {
  return (
    <ThemeProvider theme={theme}>
      <Register />
    </ThemeProvider>
  )
}
