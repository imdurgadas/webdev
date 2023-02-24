import { Box, Stack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Card from './Card';
import axios from 'axios';

const Home = () => {
  const checkoutHandler = async (amount) => {
    console.log('Payment Handling here....');
    const { data } = await axios.post('/api/payments/checkout', {
      amount,
      currency: 'INR',
    });

    var options = {
      key: 'rzp_test_I8tVAe8LGxChDU', // Enter the Key ID generated from the Dashboard
      amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: 'INR',
      name: 'Web Development', //your business name
      description: 'Workshop Course',
      image:
        'https://cdn.hashnode.com/res/hashnode/image/upload/v1675013183704/WDAIbjSKk.JPG?w=400&h=400&fit=crop&crop=faces&auto=compress,format&format=webp',
      order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: '/api/payments/verify',
      prefill: {
        name: 'John doe', //your customer's name
        email: 'johndoe@email.com',
        contact: '9000090000',
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#3399cc',
      },
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
  };

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
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
