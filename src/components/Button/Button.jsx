import React from 'react';
import { Btn } from './ButtonStyled';
export const Button = ({ incrementPage }) => (
  <Btn onClick={incrementPage}>Load more</Btn>
);
