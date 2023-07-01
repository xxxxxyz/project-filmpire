import React, { useState, useEffect } from "react";
import { TextField, InputAdornment } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useLocation } from "react-router-dom";
import { searchMovie } from "../../features/currentGenreOrCategory";
import useStyles from "./styles";

const Search = () => {
  const classes = useStyles();
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const isLargeScreen = window.matchMedia("(min-width: 768px)").matches;

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      dispatch(searchMovie(query));
    }
  };

  if (!isLargeScreen) {
    return null;
  }

  return (
    <div className={classes.searchContainer}>
      <TextField
        onKeyPress={handleKeyPress}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        variant="standard"
        InputProps={{
          className: classes.input,
          startAdornment: (
            <InputAdornment position="start">
              <SearchRoundedIcon />
            </InputAdornment>
          ),
        }}
      ></TextField>
    </div>
  );
};

export default Search;
