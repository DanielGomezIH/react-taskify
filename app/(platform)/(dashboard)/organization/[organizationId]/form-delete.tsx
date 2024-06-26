"use client";

import { Button } from '@/components/ui';
import { useFormStatus } from 'react-dom';

export const FormDelete = () => {

  const { pending } = useFormStatus();

  return (
    <Button disabled={ pending } size='sm' variant='destructive' type='submit'>
      Delete
    </Button>
  );
};