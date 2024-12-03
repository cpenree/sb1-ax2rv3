import * as React from 'react';
import { StyleSheet } from 'react-nativescript';
import { authService } from '../../services/auth.service';

export function LoginScreen({ navigation }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = async () => {
    try {
      await authService.signInWithEmail(email, password);
      navigation.navigate('Home');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <flexboxLayout style={styles.container}>
      <label className="text-2xl font-bold mb-8">Welcome to Nexium</label>
      
      <textField
        className="input mb-4 w-3/4 p-4 rounded-lg bg-white"
        hint="Email"
        keyboardType="email"
        text={email}
        onTextChange={(args) => setEmail(args.value)}
      />
      
      <textField
        className="input mb-6 w-3/4 p-4 rounded-lg bg-white"
        hint="Password"
        secure={true}
        text={password}
        onTextChange={(args) => setPassword(args.value)}
      />
      
      <button
        className="btn w-3/4 p-4 rounded-lg bg-blue-500 text-white"
        onTap={handleLogin}
      >
        Login
      </button>
      
      <button
        className="btn-link mt-4 text-blue-500"
        onTap={() => navigation.navigate('SignUp')}
      >
        Create Account
      </button>
    </flexboxLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5'
  }
});