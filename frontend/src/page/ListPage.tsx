import { Button } from "../components/shadcn/Button";
import { ScrollArea } from "../components/shadcn/ScrollArea";
import ListTalbeItem from "../components/ListTalbeItem";
import useList from "../hooks/useList";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/shadcn/Dialog";
import { Input } from "../components/shadcn/Input";

const ListPage = () => {
  const [newList, setNewList] = useState("");

  const {
    listWithContactsCount,
    callListWithContactsCountApi,
    callCreateListApi
  } = useList()

  useEffect(() => {
    callListWithContactsCountApi()
  }, [])

  if (!listWithContactsCount) return <></>

  return (
    <div className="flex-1 min-h-0">
      <div className="size-full flex flex-col">

        <div className="flex justify-between flex-row w-full">
          <p className="text-muted-foreground font-bold text-xl flex flex-col me-5">
            Lists
            <span className="text-xs">
              Lists contain uploaded leads along with custom data.
            </span>
          </p>
          <Dialog>
            <DialogTrigger asChild onClick={()=>{
              setNewList("");
            }}>
              <Button>New List</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Enter New List name</DialogTitle>
              </DialogHeader>
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <Input
                    value={newList??''}
                    onChange={(e) => {
                      setNewList(e.target.value)
                    }}
                    placeholder="New List name"
                  />
                </div>
              </div>
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button type="button" onClick={() => {
                    callCreateListApi(newList);
                    setNewList("");
                  }}>
                    SAVE
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {(listWithContactsCount.data.length === 0) ? (
          <div className="w-full flex-1 border rounded-md mt-4 flex justify-center items-center">
            <p className="font-bold text-muted-foreground text-xl">No List</p>
          </div>
        ) : (
          <div className="w-full flex-1 min-h-0 pt-4">
            <div className="size-full border rounded-md flex flex-col">

              <div className="w-full flex flex-row px-6 border-b py-4">
                <p className="flex-[2]">Name</p>
                <p className="flex-[1] text-end">Contact</p>
                <p className="flex-[1] text-end">Action</p>
              </div>

              <div className="w-full flex-1 min-h-0">
                <ScrollArea className="size-full overflow-auto ">
                  {listWithContactsCount.data.map((value) => (
                    <ListTalbeItem
                      key={value._id}
                      data={value}
                    />
                  ))}
                </ScrollArea>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListPage