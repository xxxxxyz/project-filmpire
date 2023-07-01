import React, { useState } from "react";
import { Typography, Button, Box, Grid, CircularProgress } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import useStyles from "./styles";

import {
  useGetActorQuery,
  useGetMoviesByActorIdQuery,
} from "../../services/TMDB";
import MovieList from "../MovieList/MovieList";
import Pagination from "../Pagination/Pagination";

const Actors = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
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
        <Button
          onClick={() => {
            navigate(-1);
          }}
        ></Button>
      </Box>
    );
  }
  console.log(movies);
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
        <Typography
          variant="h2"
          gutterBottom
          style={{ display: "flex", padding: "20px" }}
        >
          {data?.name}
        </Typography>
        <Typography
          variant="h5"
          gutterBottom
          style={{ display: "flex", padding: "20px" }}
        >
          Born: {new Date(data?.birthday).toDateString()}
        </Typography>
        <Typography
          variant="body1"
          align="justify"
          paragraph
          style={{ display: "flex", padding: "20px" }}
        >
          {data?.biography || "Sorry, no other information yet..."}
        </Typography>
        <Box display="flex" marginTop="2rem" justifyContent="space-around">
          <Button
            size="large"
            variant="contained"
            target="_blank"
            color="primary"
            href={`http://www.imdb.com/name/${data?.imdb_id}`}
          >
            IMDB
          </Button>
          <Button
            size="large"
            href="#text-buttons"
            startIcon={<ArrowBack />}
            onClick={() => navigate(-1)}
            color="primary"
          >
            BACK
          </Button>
        </Box>
      </Grid>
      <Box margin="5rem 0" width="100%">
        <Typography variant="h3" align="center" gutterBottom>
          Movies
        </Typography>
        {movies && <MovieList movies={movies} numberOfMovies={12} />}
        <Pagination
          currentPage={page}
          setPage={setPage}
          totalPages={movies?.total_pages}
        />
      </Box>
    </Grid>
  );
};

export default Actors;
