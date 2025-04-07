import { useNavigate } from "react-router-dom";
import { ENDPOINTS } from "../config/constant";

type SequenceTableItemProps = {
  data: {
    _id: string;
    name: string;
  }
}

const SequenceTableItem = ({ data }: SequenceTableItemProps) => {
  const navigate = useNavigate()
  return (
    <div
      className="w-full flex flex-row px-6 border-b py-2 text-muted-foreground hover:bg-muted"
      onClick={() => {
        navigate(`${ENDPOINTS.EDIT_SEQUENCE}/${data._id}`)
      }}
    >
      <p >{data.name}</p>
    </div>
  );
}

export default SequenceTableItem