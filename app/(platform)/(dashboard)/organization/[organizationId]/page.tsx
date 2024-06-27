import { Separator } from '@/components/ui';
import { Info, BoardList } from './_components';

const OrganizationIdPage = async () => {
  return (
    <div className="w-full mb-20">
      <Info />
      <Separator className='my-4' />
      <div className="px-2 md:px-4">
        <BoardList />
      </div>
    </div>
  );
};
export default OrganizationIdPage;;