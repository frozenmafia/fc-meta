"use client"
import { logout } from '@/app/redux/authSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { Button, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';

const AccountMenu = () => {
    const [anchorEl, setAnchorEl] = useState<any>(null);
    const items = ['Profile', 'Logout'];
    // const auth : AuthState = useSelector((state: RootState)=>state.auth);
    const auth = useAppSelector(state=>state.auth);
    const dispatch = useAppDispatch();
    const user = useAppSelector(state=>state.auth.user)
    
    let token = null;


    const handleClick = (event:any) =>{
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () =>{
        setAnchorEl(null);
    }

    const handleMenuItemClick = (item: any) => () =>{
        console.log(item);
        if(item==="Logout"){
            // console.log("log out")
            dispatch(logout());
        }
        handleClose();
    }

    return (

        <>
            <Button
                aria-controls='dropdown-menu'
                aria-haspopup="true"
                onClick={handleClick}
                sx={{ color: "white" }}

            >
                
                {user?.username}
            </Button>
            <Menu
                id="dropdown-menu"
                anchorEl={anchorEl}
                open = {Boolean(anchorEl)}
                onClose={handleClose}
            >
                {items.map((item, index)=>(
                    <MenuItem key={index} onClick={handleMenuItemClick(item)}>
                    {item}
                    </MenuItem>
                ))}
            </Menu>

        </>

    )

   
}

export default AccountMenu