import { Box, Stack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Card from './Card';

const Home = () => {
  const checkoutHandler = async (amount) => {
    console.log('Payment Handling here....');
  };

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <Box>
      <Stack
        h={'100vh'}
        alignItems="center"
        justifyContent={'center'}
        direction={['column', 'row']}
      >
        {products.map((product) => (
          <Card
            key={product.id}
            amount={product.amount}
            img={product.image}
            checkoutHandler={checkoutHandler}
          ></Card>
        ))}
      </Stack>
    </Box>
  );
};

export default Home;
