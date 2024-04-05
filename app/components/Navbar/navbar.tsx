"use client"
import { useAppDispatch, useAppSelector, useAppStore } from '@/lib/hooks'
import { Box, Stack, Button, AppBar, styled } from '@mui/material';
import Link from 'next/link';
import React, { useEffect } from 'react'
import AccountMenu from './AccountMenu';
import { TOKEN } from '@/app/constants/names';
import { getUser } from '@/lib/feature/auth/authSlice';
import { useRouter } from 'next/navigation';
const navItems = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
];

const Navbar = () => {
  let token = null;
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(()=>{

    token = localStorage.getItem(TOKEN);
    if(token){

        dispatch(getUser()).then((res)=>console.log(res)).catch(errr=>router.push('/login'));

    }
    

},[])

  const auth = useAppSelector((state)=>state.auth);

   return (
      <Box sx={{ boxShadow: 0, margin: 1 }}>
        <Stack
          direction={"row"}
          spacing={2}
          height={"35px"}
          alignItems={"center"}
          justifyContent={"space-around"}
        >
          <Stack direction={"row"}>
            {navItems.map((item) => (
              <Link key={item.path} href={item.path} passHref>
                <Button color="inherit" variant="text" sx={{ color: "white" }}>
                  {item.label}
                </Button>
              </Link>
            ))}
          </Stack>
          {auth.user ? (
            <AccountMenu />
          ) : (
            <Stack direction={"row"} spacing={1}>
              <Link href={"login"}>
                <Button color="inherit" sx={{ color: "white" }}>
                  Login
                </Button>
              </Link>
              <Link href="register">
                <Button color="inherit" sx={{ color: "white" }}>
                  Register
                </Button>
              </Link>
            </Stack>
          )}
        </Stack>
      </Box>
  );
};

export default Navbar;