import React from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';
import styled from 'styled-components';

const LoaderWrap = styled.div`
  text-align: center;
`;

export const Loader = () => (
  <LoaderWrap>
    <MagnifyingGlass
      visible={true}
      height="50"
      width="50"
      ariaLabel="MagnifyingGlass-loading"
      wrapperStyle={{}}
      wrapperClass="MagnifyingGlass-wrapper"
      glassColor="#c0efff"
      color="#e15b64"
    />
  </LoaderWrap>
);
