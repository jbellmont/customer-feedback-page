import {BottomNavigation, BottomNavigationAction} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const ScrollToTopButton = () => {
  return (
    <BottomNavigation
      onChange={() => {
        window.scrollTo(0, 0);
      }}
      showLabels
      sx={{marginBottom: 4, marginTop: 4}}
    >
      <BottomNavigationAction
        icon={<ArrowUpwardIcon />}
        label="Scroll to top"
      />
    </BottomNavigation>
  );
};

export default ScrollToTopButton;
