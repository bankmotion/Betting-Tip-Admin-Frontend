import { useRoutes } from 'react-router-dom';
import router from 'src/router';
import { Provider } from 'react-redux';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { CssBaseline } from '@mui/material';
import ThemeProvider from './theme/ThemeProvider';
import { AuthProvider } from './middleware/AuthContext';
import { store } from './app/store';
import { MuteProvider } from './hook/muteContext';

function App() {
  const content = useRoutes(router);

  return (
    <Provider store={store}>
      <MuteProvider>
        <AuthProvider>
          <ThemeProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <CssBaseline />
              {content}
            </LocalizationProvider>
          </ThemeProvider>
        </AuthProvider>
      </MuteProvider>
    </Provider>
  );
}
export default App;
