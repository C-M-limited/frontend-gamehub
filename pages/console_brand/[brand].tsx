import { useRouter } from 'next/router';
import React from 'react';
import StyledBanner from '../../components/template/StyledBanner';

const ConsoleBrand = () => {
  const router = useRouter()

  console.log(router.query)

  return (
    <>
      <p>{router.query.brand}</p>
    </>
  )
};

export default ConsoleBrand;
