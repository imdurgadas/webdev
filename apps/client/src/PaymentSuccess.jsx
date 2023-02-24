import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

const PaymentSuccess = () => {
  const searchQuery = useSearchParams()[0];
  const paymentId = searchQuery.get('payment_id');
  console.log('payment success');
  return (
    <Box>
      <VStack h="100vh" justifyContent={'center'} alignContent="center">
        <Heading textTransform={'uppercase'}> Order Successfull</Heading>
        <Text>PaymentId: {paymentId}</Text>
      </VStack>
    </Box>
  );
};

export default PaymentSuccess;
