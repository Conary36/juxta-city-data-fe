import React, {useState, useContext} from "react";
import {useHistory} from 'react-router-dom'
import styled from "styled-components";
import { Link } from "react-router-dom";
import "../App.css";
import Logo from '../assets/logo.png'
import LogoWhite from '../assets/logo-white.png'
import UserContext from '../contexts/UserContext'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import poly from '../assets/polydown.png';
import polyWhite from '../assets/polyWhite.png';
import avatar from '../assets/avatar.png';

const UL = styled.ul`
  width: 65%;
  list-style-type: none;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
`;

const H2 = styled.h2`
  width: 25%;
  margin-left: 50px;
  justify-content: flex-start;
  padding-right: 30px;
`;

const Li = styled.li`
  width: 18%;
  text-decoration: none;
  max-padding: 0 20px;
  margin: 0 15px;
  font-weight: 600;
  text-transform: capitalize;
`;
const NavDiv = styled.div`
  display: flex;
  height: 80px;
  max-height: 80px;
  z-index: 1;
  position: ${ ({ pathname }) => !pathname.includes('/cityview') ? 'relative' : 'sticky; top: 0'};
  max-width: 1280px;
  background: ${ ({ pathname }) => !pathname.includes('/cityview') ? 'white': '#2196F3'};
`;
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 110,
    height: 160,
    zIndex: 3,
    marginTop: 100,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: 4,
    [theme.breakpoints.down('sm')]: {
      right: 16
    }
  },
  avatarBox: {
    display: 'flex',
    alignItems: 'center'
  },
  modalLi: {
    padding: '7px 0',
    textDecoration: 'none',
    listStyleType: 'none',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    '&:hover' : {
      fontWeight: 'bold'
    }
  },
  bakground: {
    position: "absolute",
    zIndex: 2,
    width: 100,
    height: 100,
    background: 'black',
    color: 'red'
  },
  darken : {
    position: 'absolute',
    width:'10000px',
    height: '10000%',
    background: 'rgba(0,0,0,0.5)',
    left: -400,
    top:80,
    transition: 'ease-in-out 2s',
    [theme.breakpoints.down('sm')]: {
      top: 80
    }
  },
  animation: {
      transition: 'ease-in .2s',
      width: 15,
      height: 10
  },
  animation2 : {
    transition: 'ease-in .2s',
    transform: 'rotate(180deg)',
    width: 15,
    height: 10
  }
}));

const NavBar = ({ auth, history, location }) => {
  const classes = useStyles();
  const {userData, setUserData} = useContext(UserContext)
  const [open, setOpen] = useState(false)
  const login = () => {
    auth.login("/dashboard");
  };
  const handleOpen = () => {
    setOpen(!open);

  };
  const logout = () => {
    localStorage.removeItem("okta-token-storage")
    localStorage.removeItem("okta-cache-storage")
    localStorage.removeItem("cityName")
    localStorage.removeItem("userId")
    localStorage.removeItem("okta-pkce-storage")
    setUserData({})
    history.push('/')
  };
  const body = (
    <>
      <div className={classes.darken}></div>
      <div className={classes.paper}>
        <ul className={classes.modalLi}>
          <li className={classes.modalLi} onClick={()=>{history.push('/profile')}}>Profile</li>
          <li className={classes.modalLi} onClick={()=>{history.push('/about')}}>About</li>
          <li className={classes.modalLi} onClick={logout}>Logout</li>
        </ul>
      </div>
    </>
    
  )

 
  let token = localStorage.getItem("okta-token-storage");
  return (
     token ? (
     
      <NavDiv pathname={location.pathname}>
        <H2>
          <Link className="link" to="/">
            <img
              src={location.pathname !== '/cityview' ? Logo : LogoWhite}
              alt='Find Ur City Logo'
            />
          </Link>
        </H2>
        <UL>
          <Li className={classes.avatarBox}>
            <img src={avatar}/>
            <button className="link" onClick={handleOpen}>
              <img className={!open ? classes.animation : classes.animation2} src={location.pathname !== '/cityview' ? poly : polyWhite}/>
            </button>
            
            {open? body : <></>}
          </Li>
        </UL>
      </NavDiv>
    ) : (
      <NavDiv pathname={location.pathname}>
        <H2>
          <Link className="link" to="/">
          <img
            src={location.pathname !== '/cityview' ? Logo : LogoWhite}
            alt='Find Ur City Logo'
          />
          </Link>
        </H2>
        <UL>
          <Li>
            <button className="link" onClick={login} >
              Sign In / Sign Up
            </button>
          </Li>
        </UL>
      </NavDiv>
    )
  );
};

export default NavBar;
