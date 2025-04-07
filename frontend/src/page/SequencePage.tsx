import { Button } from "../components/shadcn/Button";
import { ScrollArea } from "../components/shadcn/ScrollArea";
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
import SequenceTableItem from "../components/SequenceTableItem";
import useSequence from "../hooks/useSequence";

const SequencePage = () => {
  
  const [newSequence, setNewSequence] = useState("");

  const {
    sequences,
    callSequencesByUserIdApi,
    callCreateSequenceApi
  } = useSequence()

  useEffect(() => {
    
    callSequencesByUserIdApi()
  }, [])

  if (!sequences) return <></>

  return (
    <div className="flex-1 min-h-0">
      <div className="size-full flex flex-col">

        <div className="flex justify-between flex-row w-full">
          <p className="text-muted-foreground font-bold text-xl flex flex-col me-5">
            Sequences
            <span className="text-xs">
              Create/Manage your sequences with automated emails & timely tasks.
            </span>
          </p>
          <Dialog>
            <DialogTrigger asChild onClick={()=>{
              setNewSequence("");
            }}>
              <Button>Create New Sequence</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Enter New Sequencename</DialogTitle>
              </DialogHeader>
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <Input
                    value={newSequence??''}
                    onChange={(e) => {
                      setNewSequence(e.target.value)
                    }}
                    placeholder="New Sequence name"
                  />
                </div>
              </div>
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button type="button" onClick={() => {
                    callCreateSequenceApi(newSequence);
                    setNewSequence("");
                  }}>
                    SAVE
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {(sequences.data.sequences.length === 0) ? (
          <div className="w-full flex-1 border rounded-md mt-4 flex justify-center items-center">
            <p className="font-bold text-muted-foreground text-xl">No Sequence</p>
          </div>
        ) : (
          <div className="w-full flex-1 min-h-0 pt-4">
            <div className="size-full border rounded-md flex flex-col">

              <div className="w-full flex flex-row px-6 border-b py-4">
                <p>Name</p>
              </div>

              <div className="w-full flex-1 min-h-0">
                <ScrollArea className="size-full overflow-auto ">
                  {sequences.data.sequences.map((value) => (
                    <SequenceTableItem
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

export default SequencePage;