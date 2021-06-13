import React, { useState,useEffect } from "react";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useParams } from "react-router-dom";
import services from "../api/services";
import Home from './Home'

const useStyles = makeStyles(() => ({
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
  const classes = useStyles();
  const [item, setItem] = useState(null)
  const id = useParams().id
  let categories
  if (props.location.state && props.location.state.categories) {
     categories = props.location.state.categories
}
const decimales = item &&  item.price.decimals !== 0 ? item.price.decimals : "00"

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


  return (
    <Home categories={categories}>
      <Container>
        <Paper elevation={0}  style={{marginBottom:"3%"}}>
          <Box
            component="div"
            p={4}
            borderColor="grey.100"
            border={1}
            borderBottom={0}
          >
            <Grid container spacing={4}>
              <Grid item md={9} sm={12} className={classes.picContent}>
                <img className={classes.pic} src={item && item.picture} style={{maxWidth:"100%"}}/>
              </Grid>
              <Grid item md={3} sm={12}>
                <Typography variant="subtitle2" gutterBottom>
                  {item && item.condition != 'new' ? 'Usado' : 'Nuevo' } - {item && item.sold_quantity} vendidos
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
                    <Box component="span">{decimales}</Box>
                  </Typography>
                </Box>
                <Button variant="contained" fullWidth color="primary">
                  Comprar
                </Button>
              </Grid>
              <Grid item md={8} sm={10} className={classes.description}>
                <Typography
                  variant="h5"
                  gutterBottom
                  component={"h2"}
                  pt={2}
                  pb={2}
                >
                  Descripción del producto
                </Typography>
                  <Typography variant="body1" gutterBottom component={"p"}>
                    {item && item.description}
                  </Typography>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Home>
  );
};


export default Item;