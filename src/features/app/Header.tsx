import {AppBar, Box, Container, Typography} from '@mui/material';

const Header = () => {
  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static" sx={{justifyContent: 'center', height: 64}}>
        <Container maxWidth="lg">
          <Typography variant="h6" component="span" sx={{flexGrow: 1}}>
            Checkout.com
          </Typography>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Header;
