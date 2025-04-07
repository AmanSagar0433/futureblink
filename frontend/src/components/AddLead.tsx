import { Plus } from "lucide-react";
import { memo, useEffect, useState } from "react";
import { NodeProps } from '@xyflow/react';
import { useDispatch } from "react-redux";
import { addNewLead } from "../store/slice/editSequenceSlice";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/shadcn/Dialog";
import { Button } from "./shadcn/Button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./shadcn/DropDownMenu";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./shadcn/Select";
import useList from "../hooks/useList";

const AddLead = memo(({ id, data }: NodeProps) => {
  const dispatch = useDispatch();
  const { position } = data;
  const [list, setList] = useState<List | null>(null)

  const handleListSelected = (list: List) => {
    setList(list)
  }

  return (
    <div className='w-64 place-items-center'>
      <div
        className='px-4'
      // onClick={() => {
      //   dispatch(addNewLead({id:id,position:`${position}`}))
      // }}
      >
        <Dialog>
          <DialogTrigger asChild >
            <div className='border-2 p-3 rounded-md bg-background flex flex-col items-center'>
              <Plus className="text-muted-foreground" />
              <p className='font-medium text-gray-700'>Add Lead Source</p>
              <p className='w-44 mt-1 font-medium text-sm text-gray-700'>Click to add leads from List</p>
            </div>
          </DialogTrigger>
          <DialogContent className="flex items-center flex-col sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Enter New Sequencename</DialogTitle>
            </DialogHeader>
            <div className=" py-14">
              <SelectScrollable onSelected={handleListSelected} />
            </div>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" onClick={() => {
                  if (list)
                    dispatch(addNewLead({ id: id, list: list }))
                }}>
                  SAVE
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

      </div>
    </div>
  );
});

export default AddLead;

type List = {
  _id: string;
  name: string;
  contactsCount: number;
}

type SelectScrollableProps = {
  onSelected?: (list: List) => void
}

export function SelectScrollable({ onSelected }: SelectScrollableProps) {
  const {
    listWithContactsCount,
    callListWithContactsCountApi,
  } = useList()

  useEffect(() => {
    callListWithContactsCountApi()
  }, [])

  const handleSelect = (value: string) => {
    const selectedList = JSON.parse(value)
    onSelected?.(selectedList)
  }

  return (
    <Select onValueChange={handleSelect}>
      <SelectTrigger className="w-[280px] bg-background">
        <SelectValue placeholder="Select List" />
      </SelectTrigger>
      <SelectContent className="bg-background">
        {listWithContactsCount?.data?.map((value) => (
          <SelectItem key={value._id} value={JSON.stringify(value)}>
            {value.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}