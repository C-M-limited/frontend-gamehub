import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { styled } from '@mui/system';
import { Box } from '@mui/material';

const CustomButton = styled(Box)<{ active?: boolean }>(({active}) => ({
    position: 'relative',
    backgroundColor: active ? '#6100FF' : '#353545',
    color: '#ffffff',
    padding: '10px 20px',
    borderRadius: '10px',
    cursor: 'pointer'
  }))

export default function StyledMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <CustomButton
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                display="flex"
                alignItems="center"
            >
               Lowest Price
               <KeyboardArrowDownRoundedIcon />
            </CustomButton>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem onClick={handleClose}>Lowest ID</MenuItem>
                <MenuItem onClick={handleClose}>Highest ID</MenuItem>
                <MenuItem onClick={handleClose}>Lowest Price</MenuItem>
                <MenuItem onClick={handleClose}>Highest Price</MenuItem>
                <MenuItem onClick={handleClose}>Latest</MenuItem>
            </Menu>
        </div>
    );
}
