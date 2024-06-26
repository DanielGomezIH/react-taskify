"use client";

import { Button } from '@/components/ui';
import { useFormStatus } from 'react-dom';

export const FormButton = () => {

  const { pending } = useFormStatus();

  return (
    <Button
      type='submit'
      disabled={ pending }
    >
      Submit
    </Button>
  );
};