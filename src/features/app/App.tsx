import {ReactNode} from 'react';
import {Container} from '@mui/material';

interface Props {
  children: ReactNode;
}

const App = ({children}: Props) => (
  <Container maxWidth="lg">{children}</Container>
);

export default App;
