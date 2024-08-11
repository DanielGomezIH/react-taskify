"use client";

import { updateBoard } from '@/actions';
import { FormInput } from '@/components/form';
import { Button } from '@/components/ui';
import { useAction } from '@/hooks/use-action';
import { Board } from '@prisma/client';
import { ElementRef, useRef, useState } from 'react';
import { toast } from 'sonner';

interface BoardTitleFormProps {
  data: Board;
}

export const BoardTitleForm = ( { data }: BoardTitleFormProps ) => {

  const formRef = useRef<ElementRef<"form">>( null );
  const inputRef = useRef<ElementRef<"input">>( null );

  const [ title, setTitle ] = useState<string>( data.title );
  const [ isEditing, setIsEditing ] = useState<boolean>( false );

  const { execute } = useAction( updateBoard, {
    onSuccess: ( data ) => {
      toast.success( `Board "${ data.title }" updated!` );
      setTitle( data.title );
      disableEditing();
    },
    onError: ( error ) => {
      toast.error( error );
    }
  } );

  const enableEditing = () => {
    setTimeout( () => {
      formRef.current?.focus();
      inputRef.current?.select();
    } );

    setIsEditing( true );
  };

  const disableEditing = () => {
    setIsEditing( false );
  };

  const onSubmit = ( formData: FormData ) => {
    const title = formData.get( 'title' ) as string;
    execute( {
      title,
      id: data.id
    } );
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  if ( isEditing ) {
    return (
      <form
        ref={ formRef }
        action={ onSubmit }
        className="flex items-center gap-x-2">
        <FormInput
          ref={ inputRef }
          id='title'
          onBlur={ onBlur }
          defaultValue={ title }
          className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
        />
      </form>
    );
  }

  return (
    <Button
      onClick={ enableEditing }
      variant='transparent'
      className="font-bold text-lg h-auto w-auto p-1 px-2">
      { title }
    </Button>
  );
};