"use client";

import Link from 'next/link';
import { Plus } from 'lucide-react';
import { useLocalStorage } from 'usehooks-ts';
import { useOrganization, useOrganizationList } from '@clerk/nextjs';

import { Button, Separator, Skeleton, Accordion } from '@/components/ui';
import { NavItem, Organization, } from './nav-item';

interface SidebarProps {
  storageKey?: string;
}

export const Sidebar = ( { storageKey = 't-sidebar-state' }: SidebarProps ) => {

  const [ expanded, setExpanded ] = useLocalStorage<Record<string, any>>( storageKey, {} );

  // * Objeto con todas las propiedades de la organización activa
  // * Estado actual de carga de la organización: true | false

  const {
    organization: activeOrganization,
    isLoaded: isLoadedOrg
  } = useOrganization();

  // * Objeto con todas las propiedades (data, métodos...) de la organizaciones del usuario
  // * Estado actual de carga de la organización: true | false

  const {
    userMemberships,
    isLoaded: isLoadedOrgList
  } = useOrganizationList( {
    userMemberships: {
      infinite: true
    }
  } );

  //* Crea un arreglo con las llaves o keys del objeto expanded
  //* Itera sobre cada key del arreglo y por cada key revisa si su valor es true
  //* Si el valor es true, lo inserta al final del arreglo nuevo mediante .push
  //* Finalmente retorna el nuevo arreglo

  const defaultAccordionValue: string[] = Object.keys( expanded )
    .reduce( ( acc: string[], key: string ) => {
      if ( expanded[ key ] ) {
        acc.push( key );
      }

      return acc;
    }, [] );

  // const expanded = {
  //   section1: true,
  //   section2: false,
  //   section3: true,
  //   section4: false
  // }; => ['section1', 'section3']


  // * Crea un nuevo objeto con el valor invertido de la propiedad computada [id] y lo establece en el nuevo estado, para saber si el sideBar está expandido o no

  const onExpand = ( id: string ) => {

    setExpanded( ( curr ) => ( {
      ...curr,
      [ id ]: !expanded[ id ]
    } ) );
  };

  if ( !isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading ) {
    return (
      <>
        <div className="flex items-center justify-between mb-2 ">
          <Skeleton className="h-10 w-[50%]" />
          <Skeleton className="h-10 w-10" />
        </div>

        <div className="space-y-2">
          <NavItem.Skeleton />
          <NavItem.Skeleton />
          <NavItem.Skeleton />
        </div>
      </>
    );
  }

  return (
    <>
      <div className='font-medium text-base flex items-center  p-1.5 justify-between'>

        <span>
          Workspaces
        </span>

        <Button
          asChild
          type='button'
          size='icon'
          variant='ghost'
          className='w-8 h-8'
        >
          <Link href='/select-org'>
            <Plus className='h-4 w-4' />
          </Link>
        </Button>
      </div>

      <Accordion
        type='multiple'
        defaultValue={ defaultAccordionValue }
        className='space-y-2'
      >
        { userMemberships.data.map( ( organization ) => (
          <NavItem
            key={ organization.id }
            isActive={ activeOrganization?.id === organization.organization.id }
            isExpanded={ expanded[ organization.organization.id ] }
            organization={ organization.organization as Organization }
            onExpand={ onExpand }
          />

        ) ) }
      </Accordion>
    </>
  );
};