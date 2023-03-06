import { styled } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';
import logoImage from '../../images/VC.png';

const StyledHeader = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(5, 5, 0),
  },
}));

const Logo = () => {
  return (
    <img src={logoImage} alt="VC.PNG" style={{ width: 40, height: 30, cursor: 'pointer' }} />
  );
};

export default function SimpleLayout() {
  return (
    <>
      <StyledHeader>
        <Logo />
      </StyledHeader>

      <Outlet />
    </>
  );
}
