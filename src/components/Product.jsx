import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { useHistory } from "react-router-dom";



const useStyles = makeStyles((theme) => ({
  pic: {
    width: "100%",
    maxHeight:"100%",
    cursor:'pointer'
  },
  link: {
    fontWeight: "normal",
    textDecoration: "none",
  },
  title: {
    fontWeight: 400,
    cursor:'pointer'
  },
  location: {
    fontWeight: 400,
    float: 'right',
  },
}));

export default function Product({product, categories}) {
  const {
    id,
    picture,
    title,
    price,
    condition,
    address,
    free_shipping,
  } = product;
  const iconPath = process.env.PUBLIC_URL + '/images/ic_shipping.png';
  const classes = useStyles();
  const history = useHistory();

  const handleItem = () => {
    history.push(`/items/${id}`,{categories});
};

// console.log(categories)
  return (
    <Box
      p={3}
      borderColor="grey.100"
      border={1}
      borderTop={0}
      borderLeft={0}
      borderRight={0}
    >
      <Grid container spacing={4}>
        <Grid item md={2} sm={2} xs={4}onClick={handleItem}>
            <img className={classes.pic} src={picture} />
        </Grid>
        <Grid item md={10} sm={8} xs={8}>
          <Grid container spacing={0}>
            <Grid item xs={10}>
              <Typography variant="h5" gutterBottom component={"span"}>
                {price.currency == "ARS" && "$"} {price.amount}{" "}
                {free_shipping && <img src={iconPath} />}
              </Typography>
                <Typography
                  variant="h6"
                  gutterBottom
                  className={classes.title}
                  component={"h2"}
                  onClick={handleItem}
                >
                  {title}
                </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="subtitle2" className={classes.location} gutterBottom>
                {address}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}