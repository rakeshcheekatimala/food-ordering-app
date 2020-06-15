import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import ProfileDropdown from './../Dropdown';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  appbar: {
    backgroundColor: '#222D32',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    //backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
     // backgroundColor: fade(theme.palette.common.white, 0.25),
      borderBottomColor: theme.palette.common.white,
    },

    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
   // color: 'inherit',
   '&:after':{
    borderBottom: '2px solid white',
  },
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  button: {
    color: '#222D32',
    backgroundColor: '#fff',
    [theme.breakpoints.down('sm')]: {
      margin: '16px 0',
    },
  },
}));

export default function Header(props) {
  const classes = useStyles();
  let { history, showSearch } = props;
  let isLoggedIn = props.isUserLoggedIn;

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={() => {
              history.push('/');
            }}
          >
            <FastfoodIcon />
          </IconButton>

          {showSearch ? (
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <Input
                placeholder="Search by Restaurant Name"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={props.onChangeHandler}
                
              />
     
            </div>
          ) : null}
          {isLoggedIn ? (
            <ProfileDropdown history={history} userLogout={props.userLogout} />
          ) : (
            <Button
              variant="contained"
              className={classes.button}
              startIcon={<AccountCircleIcon />}
              onClick={props.onLoginClickHandler}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

Header.defaultProps = {
  showSearch: false,
};

Header.propTypes = {
  showSearch: PropTypes.bool,
};
