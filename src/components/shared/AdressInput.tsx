'use client';

import React from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface Props {
  onChange?: (value?: string) => void;
}

export const AdressInput: React.FC<Props> = ({ onChange }) => {
  return (
    <AddressSuggestions
      token="a32d82bbb382c0d87bed006a0a11241119eb31a7"
      onChange={(data) => onChange?.(data?.value)}
    />
  );
};
