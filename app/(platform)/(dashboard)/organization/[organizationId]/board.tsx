import { deleteBoard } from '@/actions';
import { Button } from '@/components/ui';
import { FormDelete } from './form-delete';

interface BoardProps {
  title: string,
  id: string;
}

export const Board = ( { id, title }: BoardProps ) => {

  const deleteBoardWithId = deleteBoard.bind( null, id );

  return (
    <form action={ deleteBoardWithId } className="flex items-center gap-x-2">
      <p>
        { title }
      </p>
      <FormDelete />
    </form>
  );
};