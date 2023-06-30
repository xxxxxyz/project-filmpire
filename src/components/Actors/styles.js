import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  containerSpaceAround: {
    display: "flex",

    justifyContent: "space-around",
    margin: "30px 0 !important",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      flexWrap: "wrap",
    },
  },
  image: {
    borderRadius: "20px",
    boxShadow: "0.5em 0.5em 1em rgb(64, 64, 70)",
    width: "80%",
  },
}));
