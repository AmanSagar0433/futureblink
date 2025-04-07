import { Handle, NodeProps, Position } from "@xyflow/react";
import { SquarePlus } from "lucide-react";
import { memo, useState } from "react";
import { useDispatch } from "react-redux";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./shadcn/Dialog";
import { Button } from "./shadcn/Button";
import { addDelay, addEmail } from "../store/slice/editSequenceSlice";
import { Input } from "./shadcn/Input"; // assuming you have an Input component
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./shadcn/Select";
import { toast } from "../hooks/use-toast";
import { title } from "process";

type Delay = {
  waitFor: string,
  waitType: string,
}

const Add = memo(({ data, id }: NodeProps) => {
  const dispatch = useDispatch();
  const { position } = data;

  const [delayDialogOpen, setDelayDialogOpen] = useState(false);
  const [delay, setDelay] = useState<Delay | null>(null)



  const handleAddDelay = () => {
    if (delay && delay.waitFor && delay.waitType) {
      dispatch(addDelay({ id, delay: delay }));
      setDelayDialogOpen(false);
    } else {
      toast({
        title: "Please Add Delay"
      })
    }

  };

  return (
    <div className='w-64 place-items-center'>
      <Dialog>
        <DialogTrigger asChild>
          <SquarePlus
            size={40}
            className="text-sky-600"
            strokeWidth={1.5}
          />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add</DialogTitle>
            <DialogDescription>Select what to add</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <div>
                <Button
                  type="button"
                  className="me-9"
                  onClick={() => {
                    setDelayDialogOpen(true);
                  }}
                >
                  Delay
                </Button>

                <Button
                  type="button"
                  onClick={() => {
                    dispatch(addEmail({ id, position: `${position}` }));
                  }}
                >
                  Email
                </Button>
              </div>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delay Time Selection Dialog */}
      <Dialog open={delayDialogOpen} onOpenChange={setDelayDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Select Delay Time</DialogTitle>
            <DialogDescription>Enter delay time in minutes or hours</DialogDescription>
          </DialogHeader>
          <div className="mt-4">

            <p>Delay for</p>
            <Input
              className="mb-8 w-full"
              type="number"
              value={delay?.waitFor}
              onChange={(e) => {
                setDelay({
                  waitType: delay?.waitType || "",
                  waitFor: e.target.value,
                });
              }}
            />

            <p>Delay type</p>
            <Select onValueChange={(value: string) => {
              setDelay({
                waitType: value,
                waitFor: delay?.waitFor || "",
              });
            }}>
              <SelectTrigger className="w-full bg-background">
                <SelectValue placeholder="Select delay type" />
              </SelectTrigger>
              <SelectContent className="bg-background">
                <SelectGroup>
                  <SelectLabel>Wait type</SelectLabel>
                  <SelectItem value="hours">Hours</SelectItem>
                  <SelectItem value="minutes">Minutes</SelectItem>
                  <SelectItem value="days">Days</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>


          </div>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button
                type="button"
                disabled={!delay?.waitFor}
                onClick={handleAddDelay}
              >
                Confirm
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Handle type="target" position={Position.Top} />
    </div>
  );
});

export default Add;
