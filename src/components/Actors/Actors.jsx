import React, { useState } from "react";
import {
  Typography,
  Button,
  Box,
  Grid,
  CircularProgress,
  Pagination,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { Link, useParams, useHistory } from "react-router-dom";
import useStyles from "./styles";

import { useDispatch, useSelector } from "react-redux";
import {
  useGetActorQuery,
  useGetMoviesByActorIdQuery,
} from "../../services/TMDB";
import MovieList from "../MovieList/MovieList";

const Actors = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const { data, isFetching, error } = useGetActorQuery(id);
  const { data: movies } = useGetMoviesByActorIdQuery({ id, page });

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center">
        <Link to="/">Something has gone wrong - Go Back</Link>
      </Box>
    );
  }
  console.log(data);
  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid item sm={12} lg={4} align="center">
        <img
          className={classes.image}
          src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`}
          alt={data?.name}
        />
      </Grid>
      <Grid item container direction="column" lg={7}>
        <Typography variant="h2" align="left" gutterBottom>
          {data?.name}
        </Typography>
        <Typography variant="h5" align="left" gutterBottom>
          Born: {new Date(data?.birthday).toDateString()}
        </Typography>
        <Typography variant="body1" align="justify" paragraph>
          {data?.biography || "Sorry, no other information yet..."}
        </Typography>
        <Box display="flex">
          <Button size="large" variant="contained" onClick={() => {}}>
            IMDB
          </Button>
          <Button
            size="large"
            href="#text-buttons"
            startIcon={<ArrowBack />}
            onClick={() => {}}
          >
            BACK
          </Button>
        </Box>
      </Grid>
      <Box marginTop="5rem" width="100%">
        <Typography variant="h3" align="center" gutterBottom>
          Movies
        </Typography>
        {movies && <MovieList movies={movies} numberOfMovies={12} />}
        <Pagination />
      </Box>
    </Grid>
  );
};

export default Actors;
