import React from "react";
import Header from "../components/Header";
import SearchBox from '../components/SearchBox'
import { useHistory } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";


const useStyles = makeStyles((theme) => ({
  contentCategoy: {
    "& h1 span": {
      "&::after": {
        content: '"❯"',
        height: 60,
        padding: theme.spacing(1),
      },
    },
    "& h1 span:last-child": {
      "&::after": {
        display: "none",
      },
    },
  },

}));

const Home = ({ children, categories, search }) => {
  const classes = useStyles();
  const history = useHistory();
  const handleSearch = (search) => {
    history.push(`/items?search=${search}`, { search });
  };

  return (
    <>
      <Header>
        <SearchBox handleSearch={handleSearch} search={search}/>
      </Header>
      {categories &&
        (
          <Container>
          <Box component="div" className={classes.contentCategoy} mt={2} mb={2}>
            <Typography
              variant="body2"
              component={"h1"}
            >
              {categories.map((category) => (
                  <Typography
                    key={category}
                    variant="body2"
                    component={"span"}
                  >
                    {category}
                  </Typography>
                ))}
            </Typography>
          </Box>
          </Container>
        )}
      {children}
    </>
  );
};

export default Home;