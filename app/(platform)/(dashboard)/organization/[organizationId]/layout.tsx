import { auth } from '@clerk/nextjs/server';
import { OrgControl } from './_components/org-control';
import { startCase } from 'lodash';

export const generateMetadata = async () => {
  const { orgSlug } = auth();

  return {
    title: startCase( orgSlug || 'Organization' )
  };
};

const OrganizationIdLayout = ( { children }: { children: React.ReactNode; } ) => {
  return (
    <>
      <OrgControl />
      { children }
    </>
  );
};
export default OrganizationIdLayout;