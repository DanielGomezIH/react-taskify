import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs';
import { Plus } from 'lucide-react';
import { MobileSidebar } from './mobile-sidebar';
import { FormPopover } from '@/components/form';

export const Navbar = () => {



  return (
    <nav className='fixed z-50 top-0 px-4 w-full h-14 border-b shadow-sm bg-white flex items-center'>

      <MobileSidebar />

      <div className='flex items-center gap-x-0 md:gap-x-4'>

        <div className='hidden: md:flex'>
          <Logo />
        </div>

        <FormPopover align='start' side='bottom' sideOffset={ 18 }>
          <Button size='sm' variant='primary' className='rounded-sm hidden md:block h-auto py-1.5 px-2'>
            Create
          </Button >
        </FormPopover>

        <FormPopover align='start' side='bottom' sideOffset={ 18 }>
          <Button size='sm' variant='primary' className='rounded-sm p-0 md:hidden h-8 w-8 flex items-center justify-center'>
            <Plus className='h-4 w-4' />
          </Button>
        </FormPopover>
      </div>

      <div className='ml-auto flex items-center gap-x-2'>
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl='/organization/:id'
          afterSelectOrganizationUrl='/organization/:id'
          afterLeaveOrganizationUrl='/select-org'
          appearance={ {
            elements: {
              rootBox: "flex items-center justify-center h-8",
              organizationSwitcherTrigger: "h-full py-0",
              avatarBox: "h-8 w-8",
              organizationPreviewMainIdentifier: "font-bold"
            }
          } }
        />
        <UserButton
          afterSignOutUrl='/'
          appearance={ {
            elements: {
              avatarBox: "w-8 h-8"
            }
          } }
        />
      </div>
    </nav>
  );
};