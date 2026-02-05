import { Button, Card, Input, Layout, Text } from '@ui-kitten/components';
import React, { useState } from 'react';
import { View } from 'react-native';
import { styles } from './styles';

interface UserData {
  name: string;
  email: string;
  pass: string;
}

export default function HomeScreen() {
  const [isLogin, setIsLogin] = useState(true);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  const [userList, setUserList] = useState<UserData[]>([]);
  const [errors, setErrors] = useState({ name: '', email: '', pass: '' });
  const [toast, setToast] = useState({ msg: '', type: '' });

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ msg: message, type });
    setTimeout(() => setToast({ msg: '', type: '' }), 3000);
  };

   const onNameChange = (text: string) => {
    setName(text);
    if (text.length > 0) {
        setErrors((prev) => ({ ...prev, name: '' }));
    } else {
        setErrors((prev) => ({ ...prev, name: 'Name is required' }));
    }
  };

  const onEmail = (text: string) => {
    setEmail(text);
     if (text.length > 0 && !text.includes('@')) {
        setErrors((prev) => ({ ...prev, email: 'Enter a valid Email address' }));
    } else {
        setErrors((prev) => ({ ...prev, email: '' }));
    }
  };

  const onPsw = (text: string) => {
    setPassword(text);
     if (text.length > 0 && text.length < 6) {
        setErrors((prev) => ({ ...prev, pass: 'Password must be at least 6 characters' }));
    } else {
        setErrors((prev) => ({ ...prev, pass: '' }));
    }
  };

  const onRegister = () => {
    if (!name || !email || !password || errors.email || errors.pass) {
        showToast('Fix the errors', 'error');  
        return;
    }

    const userExists = userList.some(u => u.email === email);
    if (userExists) {
      showToast('User already!', 'error');  
      return;
    }

    const newUser: UserData = { email, pass: password, name };
    setUserList([...userList, newUser]);
    
    showToast("Registration Successful!", "success");  
    setErrors({ name: '', email: '', pass: '' });

    setTimeout(() => {
        setIsLogin(true);
        setEmail('');
        setPassword('');
        setName('');
    }, 1500);
  };

  const onLogin = () => {
    if (!email || !password) {
      showToast('Enter Email & Password', 'error');  
      return;
    }

    const validUser = userList.find(u => u.email === email && u.pass === password);

    if (validUser) {
      showToast("Login Successfully " + validUser.name, 'success');  
      setErrors({ name: '', email: '', pass: '' });
    } else {
      showToast('Invalid Data', 'error'); 
    }
  };

  return (
    <Layout style={styles.container}>
      
       {toast.msg ? (
        <View style={[styles.toastContainer, toast.type === 'success' ? styles.toastSuccess : styles.toastError]}>
          <Text style={styles.toastText}>
            {toast.type === 'success' ? '' : ''} {toast.msg}
          </Text>
        </View>
      ) : null}

      <Card disabled={true} style={styles.authCard}>
        <Text category='h1' style={styles.heading}>
          {isLogin ? 'Login' : 'Register'}
        </Text>

        {!isLogin && (
          <View style={styles.inputContainer}>
            <Input
              style={styles.inputField}
              placeholder='Name'
              value={name}
              onChangeText={onNameChange} 
              status={errors.name ? 'danger' : 'basic'}
            />
            {errors.name ? <Text category='c1' status='danger'>{errors.name}</Text> : null}
          </View>
        )}

        <View style={styles.inputContainer}>
          <Input
            style={styles.inputField}
            placeholder='Email'
            value={email}
            onChangeText={onEmail} 
            keyboardType='email-address'
            autoCapitalize='none'
            status={errors.email ? 'danger' : 'basic'}
          />
          {errors.email ? <Text category='c1' status='danger'>{errors.email}</Text> : null}
        </View>

        <View style={styles.inputContainer}>
          <Input
            style={styles.inputField}
            placeholder='Password'
            value={password}
            onChangeText={onPsw} 
            secureTextEntry={true}
            status={errors.pass ? 'danger' : 'basic'}
          />
          {errors.pass ? <Text category='c1' status='danger'>{errors.pass}</Text> : null}
        </View>

        <Button 
          style={styles.actionBtn} 
          onPress={isLogin ? onLogin : onRegister}>
          {isLogin ? 'LOGIN' : 'REGISTER'}
        </Button>

        <Button 
          appearance='ghost' 
          status='basic'
          onPress={() => {
            setIsLogin(!isLogin);
            setErrors({ name: '', email: '', pass: '' });
            setToast({ msg: '', type: '' });
          }}>
          {isLogin ? "New User? Register" : "Back to Login"}
        </Button>
      </Card>
    </Layout>
  );
}