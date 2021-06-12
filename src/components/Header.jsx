import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles(() => ({
  logo: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingTop: '2px',
    paddingRight: '17px'
  },
}));

export default function Header({ children }) {
  const classes = useStyles();
  const iconPath = process.env.PUBLIC_URL + '/images/Logo_ML.png';

  return (
    <AppBar position="sticky" elevation={0} style={{backgroundColor:"#ffe600"}}>
      <Toolbar>
        <Container justify="space-between">
          <Grid container spacing={0}>
            <Grid item xs={1} className={classes.logo} >
            <NavLink to="/">          
                  <img src={iconPath} />
            </NavLink>
            </Grid>
            <Grid item xs={11}>
              {children}
            </Grid>
          </Grid>
        </Container>
      </Toolbar>
    </AppBar>
  );
}