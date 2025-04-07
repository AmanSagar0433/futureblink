import { SquarePen, UsersRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ENDPOINTS } from '../config/constant';

type ListTalbeItemProps = {
  data: {
    _id: string;
    name: string;
    contactsCount: number;
  }
}

const ListTalbeItem = ({ data }: ListTalbeItemProps) => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-row px-6 border-b py-2 text-muted-foreground">
      <p className="flex-[2]">{data.name}</p>

      <div className="flex-[1] flex items-center justify-end gap-2">
        <UsersRound size={16} />
        <p className="pe-3">{data.contactsCount}</p>
      </div>
      <div className="flex-[1] flex justify-end">
        <SquarePen size={22} className="text-primary me-2" strokeWidth={1.75} onClick={() => {
          navigate(`${ENDPOINTS.EDIT_LIST}/${data._id}`)
        }} />
      </div>
    </div>
  );
}

export default ListTalbeItem