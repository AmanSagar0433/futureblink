import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Pencil } from "lucide-react";
import { Button } from "../components/shadcn/Button";
import { ScrollArea } from "../components/shadcn/ScrollArea";
import EditListTalbeItem from "../components/EditListTalbeItem";
import { ENDPOINTS } from "../config/constant";
import { useEffect, useState } from "react";
import useList from "../hooks/useList";
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

const EditListPage = () => {
  const { listId } = useParams();
  const navigate = useNavigate();


  const { list, callListByIdApi, callUpdateListNameApi, callCreateContactsApi } = useList()
  const [editListName, setEditListName] = useState("");
  const [newContact, setNewContact] = useState({
    name:"",
    email:"",
    number:""
  });

  useEffect(() => {
    if (listId) {
      callListByIdApi(listId)
    }
  }, [])

  useEffect(() => {
    if (list) setEditListName(list.data.name)
  }, [list])

  if (!list) return <></>

  return (
    <div className="flex-1 min-h-0">
      <div className="size-full flex flex-col">

        <div className="border-b pb-4 flex justify-between flex-row w-full">

          <p className="text-muted-foreground font-bold text-xl flex flex-row items-center gap-3">
            <ArrowLeft onClick={() => {
              navigate(ENDPOINTS.TAB_LIST, { replace: true });
            }} />
            Edit List
          </p>

          <Dialog>
            <DialogTrigger asChild>
              <Button>Add Contact</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md flex flex-col items-center">
              <DialogHeader>
                <DialogTitle>Add Contact</DialogTitle>
              </DialogHeader>
              <Input
                value={newContact.name}
                onChange={(e) => {
                  setNewContact({
                    ...newContact,
                    name: e.target.value
                  })
                }}
                placeholder="Enter name"
              />
              <Input
                value={newContact.email}
                onChange={(e) => {
                  setNewContact({
                    ...newContact,
                    email: e.target.value
                  })
                }}
                type="email"
                placeholder="Enter email"
              />
              <Input
                value={newContact.number}
                onChange={(e) => {
                  setNewContact({
                    ...newContact,
                    number: e.target.value
                  })
                }}
                placeholder="Enter number"
              />
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button type="button" onClick={() => {
                    callCreateContactsApi(`${listId}`,[{
                      name:newContact.name,
                      email:newContact.email,
                      number:newContact.number
                    }])
                    setNewContact({
                      name:"",
                      email:"",
                      number:""
                    })
                  }}>
                    ADD
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex justify-between flex-row mt-4">
          <p className="text-muted-foreground font-medium text-lg flex flex-row items-center gap-3">
            {list.data.name}
            <Dialog>
              <DialogTrigger asChild>
                <Pencil size={18} />
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Edit List Name</DialogTitle>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                  <div className="grid flex-1 gap-2">
                    <Input
                      value={editListName}
                      onChange={(e) => {
                        setEditListName(e.target.value)
                      }}
                      placeholder="Edit List name"
                    />
                  </div>
                </div>
                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <Button type="button" onClick={() => {
                      callUpdateListNameApi(`${listId}`, editListName)
                    }}>
                      EDIT
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </p>
        </div>
        <p className="text-muted-foreground font-bold text-sm mt-4">Contacts</p>


        {(list.data.contacts.length === 0) ? (
          <div className="w-full flex-1 border rounded-md mt-2 flex justify-center items-center">
            <p className="font-bold text-muted-foreground text-xl">No List</p>
          </div>
        ) : (
          <div className="w-full flex-1 min-h-0 pt-2">
            <div className="size-full border rounded-md flex flex-col">

              <div className="w-full flex flex-row px-6 border-b py-4">
                <p className="flex-[1] ">Name</p>
                <p className="flex-[2] ms-1">Email</p>
                <p className="flex-[1] text-end pe-4">Number</p>
              </div>

              <div className="w-full flex-1 min-h-0">
                <ScrollArea className="size-full overflow-auto ">
                  {list.data.contacts.map((value) => (
                    <EditListTalbeItem key={value._id} data={value} />
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

export default EditListPage