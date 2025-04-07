import { ContactResponse } from '../types/response.types';


type EditListTalbeItemProp = {
  data: ContactResponse
}

const EditListTalbeItem = ({ data }: EditListTalbeItemProp) => {
  
  return (
    <div className="w-full flex flex-row px-6 border-b py-2 text-muted-foreground">
      <p className="flex-[1]">{data.name}</p>
      <p className="flex-[2]">{data.email}</p>
      <p className="flex-[1] text-end">{data.number}</p>
    </div>
  );
}

export default EditListTalbeItem;