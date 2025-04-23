import { Box, Button, InputAdornment } from '@mui/material';
import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';

export const LoginWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  flexDirection: 'column',
  gap: 12
}));

export const LogoImage = styled('img')(({ theme }) => ({
  width: 60,
  height: 'auto'
}));

export const TitleWrapper = styled(Box)(({ theme }) => ({
  fontSize: '20px'
}));

export const InputPanel = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 12
}));

export const TextFieldInput = styled(TextField)(({ theme }) => ({
  minWidth: 280,

  '& svg': {
    color: '#777777'
  }
}));

export const LoginButton = styled(Button)(({ theme }) => ({
  borderRadius: '50%',
  width: 60,
  height: 60,
  minWidth: 'auto',
  margin: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  '& svg': {
    color: '#777777'
  }
}));
