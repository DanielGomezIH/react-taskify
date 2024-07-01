"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useMobileSidebar } from '@/hooks/use-mobile-sidebar';
import { Button, Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui';
import { Menu } from 'lucide-react';
import { Sidebar } from './sidebar';

export const MobileSidebar = () => {
  const pathName = usePathname();
  const [ isMounted, setIsMounted ] = useState( false );

  const isOpen = useMobileSidebar( ( state ) => state.isOpen );
  const onOpen = useMobileSidebar( ( state ) => state.onOpen );
  const onClose = useMobileSidebar( ( state ) => state.onClose );

  useEffect( () => {
    setIsMounted( true );
  }, [] );

  useEffect( () => {
    onClose();
  }, [ pathName, onClose ] );

  if ( !isMounted ) {
    return null;
  }

  return (
    <>
      <Button
        onClick={ onOpen }
        size='sm'
        variant='ghost'
        className="block md:hidden mr-2 h-8 w-8"
      >
        <Menu className="h-4 w-4" />
      </Button>

      <Sheet open={ isOpen } onOpenChange={ ( open ) => ( open ? onOpen() : onClose() ) }>
        <SheetTitle>
          Sidebar
        </SheetTitle>
        <SheetContent
          side='left'
          className="p-2 pt-10"
        >
          <Sidebar storageKey='t-sidebar-mobile-state' />
        </SheetContent>
      </Sheet>
    </>
  );
};
