import React from 'react';
import AuthTemplate from '../components/auth/authTemplate';
import LoginForm from '../containers/auth/loginForm';

const LoginPage = () => {
  return (
    <AuthTemplate>
      <LoginForm />
    </AuthTemplate>
  );
};

export default LoginPage;
