import { Box, Stack } from '@chakra-ui/react';
import React from 'react';
import Card from './Card';

const Home = () => {
  const checkoutHandler = async (amount) => {
    console.log('Payment Handling here....');
  };

  return (
    <Box>
      <Stack
        h={'100vh'}
        alignItems="center"
        justifyContent={'center'}
        direction={['column', 'row']}
      >
        <Card
          amount={250}
          img="https://m.media-amazon.com/images/I/4125d5RJ+zL.jpg"
          checkoutHandler={checkoutHandler}
        ></Card>
        <Card
          amount={655}
          img="https://m.media-amazon.com/images/I/61N2a92STML._AC_UL480_FMwebp_QL65_.jpg"
          checkoutHandler={checkoutHandler}
        ></Card>
      </Stack>
    </Box>
  );
};

export default Home;
