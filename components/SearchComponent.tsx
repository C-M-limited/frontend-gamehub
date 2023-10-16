import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { server } from '../config';
import axios from 'axios';
import { useRouter } from 'next/router';
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { Box, Divider, Typography, useAutocomplete } from '@mui/material';
import { useDispatch } from 'react-redux';
import { OpenAlertAction } from '../store/action/alert';

interface GameListProps{
  id: number;
  name: string;
  image_url: string;
}

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 4,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  // marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    // marginLeft: theme.spacing(3),
    width: "auto",
  },
}));
const SearchItemWraper = styled("div")(({ theme }) => ({
  position:'absolute' , 
  marginLeft: '30px', 
  marginTop:'10px',
  width: '200px',
  display:'flex',
  justifyContent:'center',
  alignItems:'center', 
  flexDirection:'column',
  borderRadius:'4px',
  backgroundColor: alpha(theme.palette.common.black, 1),
}));
const SearchItem = styled("div")(({ theme }) => ({
  cursor:'pointer',
  position: "relative",
  borderRadius: 0,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  // marginRight: theme.spacing(2),
  // marginLeft: 0,
  width: "100%",
  display:'flex',
  justifyContent:'center',
  alignItems:'center', 
  flexDirection:'column',

}));

  // [theme.breakpoints.up("sm")]: {
  //   marginLeft: theme.spacing(3),
  //   width: "auto",
// },
const SearchIconWrapper = styled("div")(({ theme }) => ({
  color: alpha(theme.palette.common.white, 1),
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#fff",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
const Label = styled('label')({
  display: 'block',
});

const Input = styled('input')(({ theme }) => ({
  width: '200px',
  color: "#fff",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  fontSize:'15px',
  padding: theme.spacing(1, 1, 1, 0),
  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  borderRadius:'5px',
  border: 'none'

  // backgroundColor: theme.palette.background.paper,
  // color: theme.palette.getContrastText(theme.palette.background.paper),
}));

const Listbox = styled('ul')(({ theme }) => ({
  cursor: 'pointer',
  width: '200px',
  margin: 0,
  
  zIndex: 1,
  fontSize:'20px',
  position: 'absolute',
  listStyle: 'none',
  // backgroundColor: theme.palette.background.paper,
  overflow: 'auto',
  maxHeight: 200,
  border: '1px solid rgba(0,0,0,.25)',
  '& li[data-focus="true"]': {
    backgroundColor: '#4a8df6',
    color: 'white',
    cursor: 'pointer',
  },
  '& li:active': {
    backgroundColor: '#2977f5',
    color: 'white',
  },
  backgroundColor: alpha(theme.palette.common.black, 1),
  borderRadius: '0 0px 20px 20px',
  // listStyle: 'none',
}));

const ListItem = styled('li')(({ theme }) => ({
  // paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  width:'100%',
  // backgroundColor:'red',
  transition:  theme.transitions.create(['font-size', 'transform'], {
    duration: theme.transitions.duration.standard,
  }),
  "&:hover": {
    // backgroundColor: alpha(theme.palette.common.white, 0.25),
    fontSize:'25px',
    overflow:'hidden',
  },
}));


const ListboxSmall = styled('ul')(({ theme }) => ({
  cursor: 'pointer',
  width: '196px',
  margin: 0,
  height: '150',
  zIndex: 1,
  fontSize:'20px',
  position: 'absolute',
  listStyle: 'none',
  // backgroundColor: theme.palette.background.paper,
  overflow: 'auto',
  maxHeight: 200,
  border: '1px solid rgba(0,0,0,.25)',
  '& li[data-focus="true"]': {
    backgroundColor: '#4a8df6',
    color: 'white',
    cursor: 'pointer',
  },
  '& li:active': {
    backgroundColor: '#2977f5',
    color: 'white',
  },
  backgroundColor: alpha(theme.palette.common.black, 1),
  borderRadius: '0 0px 20px 20px'
}));

const ListItemSmall = styled('li')(({ theme }) => ({
  // paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  width:'100%',
  transition:  theme.transitions.create(['font-size', 'transform'], {
    duration: theme.transitions.duration.standard,
  }),
  "&:hover": {
    // backgroundColor: alpha(theme.palette.common.white, 0.25),
    fontSize:'25px',
    overflow: 'hidden'
  },
}));


export default function SearchComponent() {
  const dispatch = useDispatch();
    const wrapperRef = React.useRef(null);
    useOutsideAlerter(wrapperRef);
    function useOutsideAlerter(ref:any) {
      React.useEffect(() => {
          /**
           * Alert if clicked on outside of element
           */
          function handleClickOutside(event:any) {
              if (ref.current && !ref.current.contains(event.target)) {
                  setOpenBox(false);
                  // setOpenSearchBox(false)
              }
          }
    
          // Bind the event listener
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
              // Unbind the event listener on clean up
              document.removeEventListener("mousedown", handleClickOutside);
          };
      }, [wrapperRef]);
    }

    const [open, setOpen] = React.useState(false);
    const [openBox, setOpenBox] = React.useState(false);
    const [options, setOptions] = React.useState<GameListProps[]>([]);
    const router = useRouter();

    const fetchGameList=async()=>{
      axios.get(`${server}/api/v1/games/all`)
      .then(response =>{
        setOptions(response.data);
      })
      .catch((error)=> dispatch(OpenAlertAction({type:"warning",content: "Sorry, Server is down"})))
    }
    const {
      getRootProps,
      getInputLabelProps,
      getInputProps,
      getListboxProps,
      getOptionProps,
      groupedOptions,
    } = useAutocomplete({
      id: 'use-autocomplete-demo',
      options: options,
      getOptionLabel: (option) => option.name,
    });

    return (
      <>
        <Box sx={{display:{xs:'none',sm:'block'}}}>
          <Search {...getRootProps()} 
          onClick={()=>{
            fetchGameList()
            setOpen(true)
          }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <Input  {...getInputProps()} placeholder="Search…"/>

          </Search>
          {open && groupedOptions.length > 0 ? (
            <Listbox {...getListboxProps()}>
              {(groupedOptions as typeof options).map((option, index) => (
                <ListItem {...getOptionProps({ option, index })} key={index}
                onClick={()=>{
                  router.push(`/game/index/${option.id}`);
                  setOpen(false)
                }}>{option.name}</ListItem>
              ))}
            </Listbox>
          ) : null}
        </Box >
        {/* Small Screen */}
        <Box  sx={{display:{xs:'block',sm:'none'}}}>
          <Box display={'flex'} justifyContent={'center'} alignItems={'center'} padding={'10px'} sx={{cursor:'pointer'}} onClick={()=>{setOpenBox(!openBox)}}>
            <SearchIcon />
          </Box>
          {openBox && 
            <Box ref={wrapperRef} position={'absolute'} width={'200px'} height={'250px'} bgcolor={'black'} display={'flex'} borderRadius={'0 0 20px 20px'} border='2px solid white'>
              {/* <Box position={'absolute'} border={'10px solid white'} width={'20px'} height={'20px'} mt={-2} ml={-1}/ > */}
              <Box>
                <Search {...getRootProps()} 
                  onClick={()=>{
                    fetchGameList()
                    setOpen(!open)
                  }}>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <Input  {...getInputProps()} placeholder="Search…"/>

                  </Search>
                  {open && groupedOptions.length > 0 ? (
                    <ListboxSmall {...getListboxProps()}>
                      {(groupedOptions as typeof options).map((option, index) => (
                        <ListItemSmall {...getOptionProps({ option, index })} key={index}
                        onClick={()=>{
                          router.push(`/game/index/${option.id}`);
                          setOpen(false)
                          setOpenBox(false)
                        }}>{option.name}</ListItemSmall>
                      ))}
                    </ListboxSmall>
                  ) : null}
              </Box>
            </Box>
          }
          
        </Box>
      </>
    )
}
    //   {/* Big Screen */}
    //   <Box ref={wrapperRef} sx={{display:{xs:'none',sm:'block'}}}>
    //   <Search >
    //     <SearchIconWrapper>
    //       <SearchIcon />
    //     </SearchIconWrapper>
    //     <StyledInputBase
    //       placeholder="Search…"
    //       inputProps={{ "aria-label": "search" }}
    //       value={keyword}
    //       onChange={(e) => setKeyword(e.target.value)}
    //       onClick = {()=>{setOpen(true)}}
    //     />
    //   </Search>
    //   <SearchItemWraper>
    //     {open && searchList.searchList.content?.map((game:GameListProps,index: number)=>{
    //       return(
    //         <Link href={`/game/index/${game.id}`} key={index} passHref >
    //           <Box sx={{width: '100%'}}>
    //             <Divider/>
    //             <SearchItem onClick={()=>setOpen(false)}>{game.name}</SearchItem>
    //           </Box>

    //         </Link>
    //       )
    //     })}
    //   </SearchItemWraper>
    // </Box>
    // {/* Small Screen */}
    // <Box  sx={{display:{xs:'block',sm:'none'}}}>
    //   <Box mx={2} onClick={()=>setOpenSearchBox(!openSearchBox)} sx={{display:'flex', justifyContent:'center',alignItems:'center', cursor: 'pointer'}}>
    //     <SearchIcon />
    //   </Box>

    //   {openSearchBox && 
    //   <>
    //   <Box position={'absolute'} bgcolor={'black'}>
    //     <Search >
    //       <SearchIconWrapper>
    //         <SearchIcon />
    //       </SearchIconWrapper>
    //       <StyledInputBase
    //         placeholder="Search…"
    //         inputProps={{ "aria-label": "search" }}
    //         value={keyword}
    //         onChange={(e) => setKeyword(e.target.value)}
    //         onClick = {()=>{setOpen(true)}}
    //       />
    //     </Search>
    //   </Box>
    //   <SearchItemWraper sx={{marginTop: '35px'}}>
    //   {searchList.searchList.content?.map((game:GameListProps,index: number)=>{
    //     return(
    //       <Link href={`/game/index/${game.id}`} key={index} passHref >
    //         <Box sx={{width: '100%'}}>
    //           <Divider/>
    //           <SearchItem onClick={()=>setOpenSearchBox(false)}>{game.name}</SearchItem>
    //         </Box>

    //       </Link>
    //     )
    //   })}
    //     </SearchItemWraper>
    //   </>
    // }
    // </Box>