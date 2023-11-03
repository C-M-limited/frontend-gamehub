import * as React from 'react';
import { server } from '../config';
import axios from 'axios';
import { useRouter } from 'next/router';
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { Box, useAutocomplete } from '@mui/material';
import { useDispatch } from 'react-redux';
import { OpenAlertAction } from '../store/action/alert';
import { useDebounce, useDebouncedCallback } from "use-debounce";

interface GameListProps{
  id: number;
  name: string;
  image_url: string;
}

const SearchWrapper = styled("div")(({ theme }) => ({
  width: '350px',
}));

const Search = styled("div")(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  position: "relative",
  borderRadius: 4,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  border: 'solid 2px black',
  outline: 'none',
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: 4,
  height: "100%",
  // position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#000",
}));

const Input = styled('input')(({ theme }) => ({
  width: '320px',
  fontSize:'15px',
  padding: theme.spacing(1, 1, 1, 0),
  borderRadius:'5px',
  border: 'none',
  "&:focus": {
    outline: 'none'
  },
}));

const Listbox = styled('ul')(({ theme }) => ({
  cursor: 'pointer',
  width: '350px',
  backgroundColor: 'var(--white)',
  color: 'var(--black)',
  margin: 0,
  zIndex: 1,
  fontSize:'20px',
  position: 'absolute',
  maxHeight: 200,
  border: '1px solid rgb(0, 0, 0)',
  borderRadius: '0 0px 5px 5px',
  listStyle: 'none',
  paddingLeft: 0,
  overflow: 'auto',
  [theme.breakpoints.down("sm")]: {
    top: 40,
  },
}));

const ListItem = styled('li')(({ theme }) => ({
  width:'100%',
  paddingLeft: '30px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  transition:  theme.transitions.create(['font-size', 'transform'], {
    duration: theme.transitions.duration.standard,
  }),
  "&:hover": {
    backgroundColor: 'var(--mainLightGrey)'
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

    const [openBox, setOpenBox] = React.useState(false);
    const [options, setOptions] = React.useState<GameListProps[]>([]);
    const [inputValue, setInputValue] = React.useState("");
    const router = useRouter();

    const debounced = useDebouncedCallback(
      (value) => {
        setInputValue(value);
        fetchGameList(value);
      }, 500
    );

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setInputValue(value);
      debounced(value);
    };

    const fetchGameList = async(keyword: string)=>{
      axios.get(`${server}/api/v1/games/byKeyword?keyword=${keyword}&page=${0}`)
      .then(response =>{
        const sortedData = response.data.content.sort((a : any,b: any) => a.name.localeCompare(b.name));
        console.log(sortedData);
        setOptions(sortedData);
      })
      .catch((error)=> dispatch(OpenAlertAction({type:"warning",content: "Sorry, Server is down"})))
    }

    return (
      <>
        <Box sx={{display:{xs:'none',sm:'block'}}}>
          <SearchWrapper>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <Input value={inputValue} placeholder="Search your game name…" onChange={handleInputChange} />
            </Search>
            {options.length > 0 ? (
              <Listbox>
                {options.map((option, index) => (
                  <ListItem key={index}
                  onClick={()=>{
                    router.push(`/game/${option.id}`);
                    setOptions([]);
                  }}>{option.name}</ListItem>
                ))}
              </Listbox>
            ) : null}
          </SearchWrapper>
        </Box >
        {/* Small Screen */}
        <Box  sx={{display:{xs:'block',sm:'none'}}}>
          <Box display={'flex'} justifyContent={'center'} alignItems={'center'} padding={'10px'} sx={{cursor:'pointer'}} onClick={()=>{setOpenBox(!openBox)}}>
            <SearchIcon color='action' />
          </Box>
          {openBox && 
            <Box ref={wrapperRef} position={'absolute'} left={0} top={60} width="100%" height={'40px'} display={'flex'} bgcolor="white">
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <Input value={inputValue} placeholder="Search your game name…" onChange={handleInputChange}/>
              </Search>
              {options.length > 0 ? (
                <Listbox>
                  {options.map((option, index) => (
                    <ListItem key={index}
                    onClick={()=>{
                      router.push(`/game/${option.id}`);
                      setOptions([]);
                      setOpenBox(false)
                    }}>{option.name}</ListItem>
                  ))}
                </Listbox>
              ) : null}
            </Box>
          }
          
        </Box>
      </>
    )
}
