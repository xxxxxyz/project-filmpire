import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  moviesContainer: {
    display: "flex",
    marginTop: "20px",
    justifyContent: "space-between",
    overflow: "auto",
    flexWrap: "wrap",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
}));
