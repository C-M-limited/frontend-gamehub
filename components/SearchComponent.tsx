import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { server } from '../config';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/reducer';
import { fetchSearchListSuccessAction, fetchSearchListThunk } from '../store/action/search';
import InputBase from "@mui/material/InputBase";
import { Box, Divider } from '@mui/material';
import { SettingsPowerRounded } from '@mui/icons-material';
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
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchItem = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 4,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

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


export default function SearchComponent() {
    const wrapperRef = React.useRef(null);
    useOutsideAlerter(wrapperRef);
    function useOutsideAlerter(ref:any) {
      React.useEffect(() => {
          /**
           * Alert if clicked on outside of element
           */
          function handleClickOutside(event:any) {
              if (ref.current && !ref.current.contains(event.target)) {
                  setOpen(false);
              }
          }
    
          // Bind the event listener
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
              // Unbind the event listener on clean up
              document.removeEventListener("mousedown", handleClickOutside);
          };
      }, [ref]);
    }
    
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState<GameListProps[]>([]);
    const [keywordId, setKeywordId] = React.useState<any>(-1);
    const loading = open && options.length === 0;
    const router = useRouter();
    const [keyword, setKeyword] = React.useState("");
    const dispatch = useDispatch();
    const searchList = useSelector((state: RootState) => state.searchList);
    React.useEffect(() => {
      dispatch(fetchSearchListThunk({ page: 0, keyword: keyword }));
      console.log(searchList.searchList.content)
    }, [keyword]);
    const fetchGameList=async()=>{
      axios.get(`${server}/api/v1/games/all`)
      .then(response =>{
        setOptions(response.data);
      })
      .catch((error)=> window.alert("Sorry, Server is down right now"))
    }

    React.useEffect(() => {
    
        if (!loading) {
          return undefined;
        }
        fetchGameList();    

      }, [loading]);
    
    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);
    const handleSubmit = (e: { preventDefault: () => void; target: any; })=>{
      console.log("hello")
      e.preventDefault()
      router.push( `/game/index/${keywordId}`);
    }
    return (
        //   <Autocomplete
        //   id="asynchronous-demo"
        //   sx={{ width: 200 }}
        //   open={open}
        //   onOpen={() => {
        //     setOpen(true);
        //   }}
        //   onClose={() => {
        //     setOpen(false);
        //   }}
        //   isOptionEqualToValue={(option, value) => option.name === value.name}
        //   getOptionLabel={(option) => option.name}
        //   options={options}
        //   loading={loading}
        //   autoSelect={true}
        //   onChange={(event, value) => setKeywordId(value?.id)}
        //   renderInput={(params) => (
        //       <TextField
        //         {...params}
        //         label="Search…"
        //         // onSubmit={handleSubmit}
        //         InputProps={{
        //           ...params.InputProps,
        //           endAdornment: (
        //             <React.Fragment>
        //               {loading ? <CircularProgress color="inherit" size={20} /> : null}
        //               {/* {params.InputProps.endAdornment} */}
        //             </React.Fragment>
        //           ),
        //         }}
        //       />
        //   )}
        // />
        <Box ref={wrapperRef}>
          <Search >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onClick = {()=>{setOpen(true)}}
            />
          </Search>
          <div style={{display: 'absolute'}}>
            {open && searchList.searchList.content?.map((game:GameListProps,index: number)=>{
              return(
                <Link href={`/game/index/${game.id}`} key={index} passHref>
                  {/* <Divider/> */}
                  <SearchItem>{game.name}</SearchItem>
                </Link>
              )
            })}
          </div>

        </Box>
    )
}