import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { styled } from '@mui/system';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import Link from 'next/link';

const CustomButton = styled(Box)<{ active?: boolean }>(({active}) => ({
    position: 'relative',
    backgroundColor: active ? 'var(--mainBlue)' : 'var(--mainGrey)',
    color: '#ffffff',
    padding: 'var(--space-8) var(--space-20)',
    borderRadius: 'var(--space-4)',
    cursor: 'pointer'
  }))

interface filterListProps {
    name: string;
    brand: string;
    src: string;
}
  interface styledMenuProps {
    nameList: filterListProps[];
}

export default function StyledMenuForCategoryMobile({ nameList}: styledMenuProps) {
    const router = useRouter();
    const [currentName,setCurrentName] = React.useState<string>("All");
    React.useEffect(()=>{
        getCurrentCategory();
    },[router.asPath])

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const getCurrentCategory = () =>{       
        nameList.forEach(item => {            
            if (item.brand===brandDeCode(router.query.brand)){
                setCurrentName(item.name);              
            }     
        }); 

    
      }
    const brandDeCode = (brand:any) =>{
        if(brand==="ps") { return "Play Station"}
        else if (brand==="xbox") { return "Xbox"}
        else if (brand==="nintendo") {return "Nintendo"} 
        else if (brand==="all") {return "all"}
    }
    const brandCode = (brand:string)=>{
        if(brand==="Play Station") { return "ps"}
        else if (brand==="Xbox") { return "xbox"}
        else if (brand==="Nintendo") {return "nintendo"} 
        else if (brand==="all") {return "all"}
    }

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
               {currentName}
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
                    nameList.map(({name,brand,src}:filterListProps, index:number)=> (
                        <Link href={`/console_brand/${brandCode(brand)}`} passHref key={index}>
                            <MenuItem  onClick={(e)=>{
                                handleClose();
                            }}>{name}</MenuItem>
                        </Link>

                    ))
                }
            </Menu>
        </div>
    );
}
