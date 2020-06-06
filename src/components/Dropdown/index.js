import React from 'react';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
////import { userLogout } from './../../common/utils';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    fontSize: '18px',
  },
  appbar: {
    backgroundColor: '#263238',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade('#c0c0c0', 0.15),
    '&:hover': {
      backgroundColor: fade('#c0c0c0', 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
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
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    minWidth: '100px',
    maxWidth: '300px',
    [theme.breakpoints.up('sm')]: {
      width: '300px',
      '&:focus': {
        width: '300px',
      },
    },
  },
  avatar: {
    width: '35px',
    height: '35px',
  },
  drawLine: {
    margin: '0.1rem 1rem',
  },
}));

export default function ProfileDropdown(props) {
  console.log(sessionStorage);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = (event) => {
    event.preventDefault();
    props.userLogout(); // clear all the session token
    props.history.push('/'); // back to home
  };

  return (
    <div>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircleIcon aria-label="recipe" className={classes.avatar} />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Link to="/profile" style={{ textDecoration: 'none' }}>
            My Profile
          </Link>
        </MenuItem>
        <hr className={classes.drawLine} />
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
