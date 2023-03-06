import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
// @mui


import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';

import { LoadingButton } from '@mui/lab';
import { useMutation, useQuery } from '@apollo/client';

import { REGISTER_USER } from '../../../mutations/userMutations';
import {GET_USERS} from '../../../queries/userQueries';

import RequestButton from '../../../components/Buttons/RequestButton';



// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm(props) {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const { data, error } = useQuery(GET_USERS, {
    fetchPolicy: "cache-and-network",
  });
  
  if (error) {
    console.log(`Error fetching users: ${error.message}`);
  }
  
  // const [registerUser] = useMutation(REGISTER_USER, {
  //   variables: { email, password },
  //   onCompleted: (data, response, cache) => {
  //     const { registerUser } = data;
  //     const { users } = cache.readQuery({ query: GET_USERS });
  //     cache.writeQuery({
  //       query: GET_USERS,
  //       data: { users: [...users, registerUser] },
  //     });
  //   }
  // }
  
  // );
  

  const [registerUser] = useMutation(REGISTER_USER, {
    variables: { email, password },
    onCompleted: (data, response, cache) => {
      const { registerUser } = data;
      console.log(registerUser);
      // const { users } = cache.readQuery({ query: GET_USERS });
      
      // cache.writeQuery({
      //   query: GET_USERS,
      //   data: { users: [...users, registerUser] },
      // });
    }
  }
  
  );
  const handleClick = () => {
    registerUser()
      .then((res) => {
        console.log(res);
        navigate('/nonverified', { replace: true });
      })
      .catch((err) => {
        props.errorAlert(err);
        console.log(err);
      });
  };
  
  
  
  
  

  // const [registerUser] = useMutation(REGISTER_USER, {
  //   variables: { email, password },
  //   onCompleted: (data, response, cache) => {
  //     const { registerUser } = data;
  //     const { users } = cache.readQuery({ query: GET_USERS });
  //     cache.writeQuery({
  //       query: GET_USERS,
  //       data: { users: [...users, registerUser] },
  //     });
  //   }
  // });
  


  
  // const handleClick = () => {

  //   registerUser({variables: {email, password}})
  //   .then((res) => {
  //     console.log(res);


  //   // Check the status of the registered user
  //   navigate('/nonverified', { replace: true });

  //   })
  //   .catch((err) => {
  //     console.log(err);


  //     props.errorAlert(err);
    
  //   });
    

  // };

  return (
    <>
      <Stack spacing={3}>
        <TextField value={email} onChange={(e) => setEmail(e.target.value)} name="email" label="Email address" />

        <TextField
        value={password}
        onChange={(e) => setPassword(e.target.value)}
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment   position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" sx={{backgroundColor: 'black'}} onClick={handleClick}>
        Login
         {/* <RequestButton message={props.message}/> */}
        
      </LoadingButton>


    
    </>
  );
}
