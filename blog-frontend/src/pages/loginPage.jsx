import React from 'react';
import AuthForm from '../components/auth/authForm';
import AuthTemplate from '../components/auth/authTemplate';

const LoginPage = () => {
  return (
    <AuthTemplate>
      <AuthForm type="login" />
    </AuthTemplate>
  );
};

export default LoginPage;
