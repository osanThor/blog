import React from 'react';
import AuthTemplate from '../components/auth/authTemplate';
import RegisterForm from '../containers/auth/registerForm';

const RegisterPage = () => {
  return (
    <AuthTemplate>
      <RegisterForm />
    </AuthTemplate>
  );
};

export default RegisterPage;
