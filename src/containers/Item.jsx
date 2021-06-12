import React, { useState,useEffect } from "react";
import Header from "../components/Header";
import SearchBox from "../components/SearchBox";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useHistory, useParams } from "react-router-dom";
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
  picContent: {
    textAlign: "center",
  },
  pic: {
    width: "auto",
    height: "100%",
    maxHeight: "700px",
  },
  price: {
    "& span": {
      fontSize: "15px",
      position: "absolute",
      padding: 5,
    },
  },
  description: {
    textAlign: "left",
  },
}));

const Item = (props) => {
//   const {
//     id,
//     title,
//     price,
//     picture,
//     condition,
//     free_shipping,
//     sold_quantity,
//     description,
//   } = item;
  const classes = useStyles();
  const history = useHistory();
  const [item, setItem] = useState(null)
  const id = useParams().id
  let categories
  if (props.location.state && props.location.state.categories) {
     categories = props.location.state.categories
}



  useEffect(() => {
      getItem();
    }, [id]);
    
    const getItem = async () => {
        try {
            const data =  await services.getItem(id)
            setItem(data && data.data.item)
      
        } catch (e) {
            console.log(e);
        }
    };





const handleSearch = (search) => {
    history.push(`/items?search=${search}`,{search});
};

  console.log(categories)
  return (
    <>
      <Header>
        <SearchBox handleSearch={handleSearch} /> {/*  // value={search} */}
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
        <Paper elevation={0}>
          <Box
            component="div"
            p={4}
            borderColor="grey.100"
            border={1}
            borderBottom={0}
          >
            <Grid container spacing={4}>
              <Grid item xs={9} className={classes.picContent}>
                <img className={classes.pic} src={item && item.picture} />
              </Grid>
              <Grid item xs={3}>
                <Typography variant="subtitle2" gutterBottom>
                  {item && item.condition} - {item && item.sold_quantity} vendidos
                </Typography>
                <Typography
                  variant="h5"
                  className={classes.location}
                  gutterBottom
                  component={"h1"}
                >
                  {item && item.title}
                </Typography>

                <Box component="div" pt={2} pb={2}>
                  <Typography
                    variant="h4"
                    className={classes.price}
                    gutterBottom
                  >
                    $ {item && item.price.amount}{" "}
                    <Box component="span">{item && item.price.decimals}</Box>
                  </Typography>
                </Box>
                <Button variant="contained" fullWidth color="primary">
                  Comprar
                </Button>
              </Grid>
              <Grid item xs={12} className={classes.description}>
                <Typography
                  variant="h5"
                  gutterBottom
                  component={"h2"}
                  pt={2}
                  pb={2}
                >
                  Descripción del producto
                </Typography>

                <Box component="div" pr={10}>
                  <Typography variant="body1" gutterBottom component={"p"}>
                    {item && item.description}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </>
  );
};


export default Item;