import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { styled } from '@mui/system';
import { Box } from '@mui/material';

const CustomButton = styled(Box)<{ active?: boolean }>(({active}) => ({
    position: 'relative',
    backgroundColor: active ? 'var(--mainBlue)' : 'var(--color-gray-1)',
    color: '#ffffff',
    padding: 'var(--space-8) var(--space-20)',
    borderRadius: 'var(--space-4)',
    cursor: 'pointer'
  }))

interface nameListProps {
    sortBy: string;
    asc: boolean;
    name: string;
}
  interface styledMenuProps {
    nameList: nameListProps[];
    selectIndex: number;
    handleChange: (key:number, sortBy:string, asc:boolean) => void;
}

export default function StyledMenu({ nameList, selectIndex, handleChange }: styledMenuProps) {
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
               {nameList[selectIndex]?.name}
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
                {
                    nameList.map((item, key)=> (
                        <MenuItem key={item.name} onClick={()=>{
                            handleClose()
                            const { sortBy, asc } = item
                            handleChange(key, sortBy, asc)
                        }}>{item.name}</MenuItem>
                    ))
                }
            </Menu>
        </div>
    );
}
