import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SearchBox from "../components/SearchBox";
import Container from "@material-ui/core/Container";
import { useHistory,useParams } from "react-router-dom";
import Product from "../components/Product";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import services from "../api/services";

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
  category: {
    display: "inline-block",
    // color: theme.palette.text.primary,
  },
}));

const Items = (  props ) => {
  const valores = window.location.search;
  const urlParams = new URLSearchParams(valores);
  const history = useHistory();
  const search = urlParams.get('q') || props.location.state.search 
  const classes = useStyles();
  const [publications, setPublications ] = useState(null)
  const [categories, setCategories ] = useState(null)


  useEffect(() => {
    getAll();
  }, [search]);


  const getAll = async () => {
    try {
      const data =  await services.get4Items(search)
      setPublications(data && data.data.items)
      setCategories(data && data.data.categories)
    } catch (e) {
      console.log(e);
    }
  };
  
  const handleSearch = (search) => {
    history.push(`/items?q=${search}`);
  };

  return (
    <>
      <Header>
        <SearchBox handleSearch={handleSearch} value={search} />
      </Header>
      <Container>
        <Box component="div" className={classes.contentCategoy} mt={2} mb={2}>
          <Typography
            variant="body2"
            className={classes.category}
            component={"h1"}
          >
            {categories ?
              categories.map((category) => (
                <Typography
                  key={category}
                  variant="body2"
                  className={classes.category}
                  component={"span"}
                >
                  {category}
                </Typography>
              )) : null}
          </Typography>
        </Box>
        <Box component="div" borderColor="grey.100" border={1} borderBottom={0}>
          <Paper elevation={0}>

            {publications ?
              publications.map((product, i) => (
                <Product key={i} product={product} categories={categories} />
              )) : null }
          </Paper>
        </Box>
      </Container>
    </>
  );
};



export default Items;