import { useEffect, useState } from 'react';
import { CircularProgress, InputAdornment } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

import Logo from '../../assets/logo.png';

import {
  LoginWrapper,
  LogoImage,
  TitleWrapper,
  TextFieldInput,
  InputPanel,
  LoginButton
} from './LoginStyles';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { loginAction } from 'src/reducers/user.slice';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'src/middleware/AuthContext';
import { ToastContainer } from 'react-toastify';
import { toastMsg } from 'src/utils/utils';
import { ToastStatus } from 'src/models/basic';

function login() {
  const dispatch = useAppDispatch();
  const { loadingLogin, userId, token } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const { login } = useAuth();

  const [emailVal, setEmailVal] = useState('');
  const [passwordVal, setPasswordVal] = useState('');

  const handleLogin = async () => {
    if (!emailVal || !passwordVal) {
      toastMsg('Please input username and password', ToastStatus.Info);
      return;
    }
    await dispatch(loginAction({ email: emailVal, password: passwordVal }));
  };

  useEffect(() => {
    if (!loadingLogin && userId !== -1 && token) {
      login(token);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    }
  }, [loadingLogin, userId, navigate, token]);

  return (
    <LoginWrapper>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <LogoImage src={Logo} />
      <TitleWrapper>Betting Tip Admin Portal</TitleWrapper>
      <InputPanel>
        <TextFieldInput
          id="email-input"
          label="Email"
          type="email"
          onChange={(e) => setEmailVal(e.target.value)}
          value={emailVal}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            )
          }}
        />
        <TextFieldInput
          id="password-input"
          label="Password"
          type="password"
          onChange={(e) => setPasswordVal(e.target.value)}
          value={passwordVal}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            )
          }}
        />
      </InputPanel>
      <LoginButton
        variant="outlined"
        size="medium"
        color="primary"
        onClick={handleLogin}
        disabled={loadingLogin}
      >
        {loadingLogin ? (
          <CircularProgress size={20} />
        ) : (
          <LoginIcon
            sx={{
              color: '#777777'
            }}
          />
        )}
      </LoginButton>
    </LoginWrapper>
  );
}

export default login;
