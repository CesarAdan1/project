import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';
import compose from 'recompose/compose';
import Options from './Options';
import Grid from '@material-ui/core/Grid';
import withWidth from '@material-ui/core/withWidth'
import Badge from '@material-ui/core/Badge';
import { createMuiTheme, MuiThemeProvider, IconButton , 
  Typography, Card, Icon} from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import  cereza  from '../../../images/cereza.png';
import SearchAppBar from './Searchbar';
import Menuopt from './Menuopt';
import AuthService from '../../../Utils/AuthService';
import  LeftLoversBlue  from './../../../images/LeftLoversBlue.svg';
import ResponsiveDrawer from './ResponsiveDrawer';
import SearchIcon from '@material-ui/icons/Search';
import { relative } from 'path';

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#48B2AB',
        
      },
      secondary: {
        main: '#E10050'
      },
    },
  });

  const styl = {
    textTransform: 'none',
    fontSize: '15px',
    textFont: 'arial',
    margin: 'auto',
    color: 'white',
    border: 'none'
}

const Initbutton = {
    textTransform: 'none',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
    fontSize: '15px',
    textFont: 'arial',
    marginLeft: 'auto',
    color: 'white',
    border: 'none'
}

const stilo = {
    margin: '8px',
    color: 'white',
    textTransform: 'none',
    fontSize: '15px',
    textFont: 'arial',
    marginRight: 0
  }

const displaylost = {
    display: 'flex',
    flexDirection: 'rowReverse'
 
}

const lost = {
  display: 'flex',
  justifyContent: 'spaceBetween',
}


const AuthButton = withRouter(({ history }) => (
  // AuthService.isAuthenticated === true
  localStorage.getItem('jwt') !== null
    ? 
    <div style={displaylost}>
      <MuiThemeProvider theme={theme}>
      <Hidden only={['sm', 'xs']}>
      <Button style={stilo} color='secondary' onClick={() => {
      AuthService.signout(() => {
        history.push('/')
      });
    }}>Salir</Button>
    </Hidden>
            <Options/>
            </MuiThemeProvider>
    </div>
    : 
    <div>
      <MuiThemeProvider theme={theme}>
      <div style={ lost }>
        <Hidden only={['sm', 'xs']}>
          <Button style={ styl }  variant="contained" component={Link} to="/Log" color="secondary">
              Únete
          </Button>
        </Hidden>
        <Typography style={ Initbutton } component={ Link } variant="contained" to='/Enter' color="primary">
          Iniciar Sesión
        </Typography>
        </div>
      </MuiThemeProvider>
    </div>
));

const styles = theme => ({
  mainbar:{
    height: '65px',
    
  },
  badge: {
    top: 1,
    right: -15,
    // The border color match the background color.
    border: `2px solid ${
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
    }`,
  },
  center:{
    marginRight: 'auto',
     [theme.breakpoints.only('sm', 'xs')]:{
        marginLeft:'auto',
        marginRight: 'auto'
    },  
      [theme.breakpoints.only('md', 'lg','xl')]:{
      marginLeft:'auto',
      marginRight: 'auto'
  },
  },
  image: {
    width: '30px', 
  },
  logo: {
    width: '80px',
  },
  card: {
    backgroundColor: 'transparent',
    borderStyle: 'none',
  },
  color:{
    color:'ffff'
  },
  cart: {
    marginLeft: 'auto',
    marginTop: '8px',
    marginBottom: '8px'
  },
  flexMenu:{
    marginLeft: 'auto',
    marginRight:0,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'spaceBetween',
    [theme.breakpoints.only('')]:{

    },
},
  searchPosition: {
    position: 'relative'
  }

});


class Header extends Component {
  
    render() {
      const { classes } = this.props;
        return (
            <div>            
               <MuiThemeProvider theme={theme}>
                    <AppBar 
                    className={classes.mainbar} 
                    position='static' 
                    color="primary"
                    >
                        <Toolbar>
                           <Hidden only={['md','lg', 'xl']}>
                             <ResponsiveDrawer/>
                           </Hidden>
                           
                           <div className={classes.center}>
                              <IconButton component={Link} to="/">
                                  <img className={classes.image} 
                                  src={cereza} 
                                  alt="logo"
                                  />
                              </IconButton>
                                  <img 
                                  className={classes.logo} 
                                  src={LeftLoversBlue} 
                                  alt="logo"
                                  />
                            </div>
                              <Hidden only={['xs','sm']}>
                                  <SearchAppBar />
                              </Hidden>
                              {/* <Hidden only={['xs','sm']}>
                                  <Menuopt/>
                              </Hidden> */}
                              <div className={classes.flexMenu}>
                                  <AuthButton />
                              </div>    
                               <IconButton 
                               className={classes.cart} 
                               aria-label="Cart"
                               >
                                  <Badge badgeContent={0}  
                                  classes={{ badge: classes.badge }} 
                                  color="default">
                                      <ShoppingCartIcon color="default"/>
                                  </Badge>
                              </IconButton>                                                    
                      </Toolbar>  
                  </AppBar>
              </MuiThemeProvider>
            </div>
        );
    }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired
};

export default compose(
  withStyles(styles),
  withWidth(),
)(Header);