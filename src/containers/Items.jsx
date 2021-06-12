import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Product from "../components/Product";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import services from "../api/services";
import Home from './Home'



const Items = (  props ) => {
  const valores = window.location.search;
  const urlParams = new URLSearchParams(valores);
  const search = urlParams.get('search') || props.location.state.search;
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
  


  return (

    <Home categories={categories} search={search}>
      <Container>
        <Box component="div" borderColor="grey.100" border={1} borderBottom={0}>
          <Paper elevation={0}>
            {publications ?
              publications.map((product, i) => (
                <Product key={i} product={product} categories={categories} />
              )) : null }
          </Paper>
        </Box>
      </Container>
      </Home>
   
  );
};



export default Items;