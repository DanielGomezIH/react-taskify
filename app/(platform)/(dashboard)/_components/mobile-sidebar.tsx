"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useMobileSidebar } from '@/hooks/use-mobile-sidebar';
import { Button, Sheet, SheetContent } from '@/components/ui';
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
        className="block md:hidden mr-2">
        <Menu className="h-4 w-4" />

        <Sheet open={ isOpen } onOpenChange={ onClose }>
          <SheetContent
            side='left'
            className="p-2 pt-10"
          >
            <Sidebar storageKey='t-sidebar-mobile-state' />
          </SheetContent>
        </Sheet>
      </Button>
    </>
  );
};