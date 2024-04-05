"use client"
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { Box, Button, FormControl, FormHelperText, Stack, TextField, Typography } from '@mui/material';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { login } from '../../redux/authSlice';
import { useRouter } from 'next/navigation';
import store from '@/app/redux/store';

interface FormErrors {
  email: string;
  password: string;
}


 const LoginForm = () => {
  const dispatch = useAppDispatch();
  const [credentials, setCredentials] = useState<{ email: string; password: string }>({ email: '', password: '' });
  const [errors, setErrors] = useState<FormErrors>({ email: '', password: '' });
  const auth = useAppSelector(state => state.auth);

  const router = useRouter();

  useEffect(()=>{
    const token = localStorage.getItem("token");
    if( token ){
      router.push("/");
    }
  },[router])

  const validateForm = () => {
    const newErrors: FormErrors = { email: '', password: '' };
    if (credentials.password.length < 4) {
      newErrors.password = 'Password must be at least 4 characters long';
    }
    setErrors(newErrors);
    return Object.values(newErrors).every(error => error === '');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Clear error on input
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Proceed with login logic
        dispatch(login(credentials)).then(r=>
          {
            if(r.type === 'auth/login/fulfilled'){
              router.push("/")
            }
          }
          ).catch((r)=>console.log(r));
        // Dispatch any additional actions or handle success
      } catch (error) {
        // Handle login failure
      }
    }
  };

  return (
    <div>
      <Box height={'100%'} justifyContent={'center'} display={'flex'}>
        <Stack alignItems={'center'}>
          <Typography variant="h2" margin={2}>
            Login
          </Typography>
          <form onSubmit={handleLogin}>
            <FormControl>
              <Stack spacing={2}>
                <TextField
                  label="Email"
                  name="email"
                  value={credentials.email}
                  type="email"
                  size="small"
                  onChange={handleChange}
                  error={Boolean(errors.email)}
                  sx={{ width: '300px' }} // Ensure consistent width
                />
                {errors.email && <FormHelperText sx={{ mt: 0, mb: 1 }} error>{errors.email}</FormHelperText>}
                <TextField
                  label="Password"
                  name="password"
                  value={credentials.password}
                  type="password"
                  size="small"
                  onChange={handleChange}
                  error={Boolean(errors.password)}
                  sx={{ width: '300px' }} // Ensure consistent width
                />
                {auth.error && (
                  <Typography color={"error"}>{auth.error?.detail}</Typography>
                )}
                <Button type="submit">Login</Button>
              </Stack>
            </FormControl>
          </form>
        </Stack>
      </Box>
    </div>
  );
};

export default LoginForm;
