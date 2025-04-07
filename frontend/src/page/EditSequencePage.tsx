import '@xyflow/react/dist/style.css';
import {
  ReactFlow,
  Controls,
} from '@xyflow/react';
import { Button } from '../components/shadcn/Button'
import { ArrowLeft, Pencil } from 'lucide-react'
import Email from '../components/Email'
import Delay from '../components/Delay';
import StartPoint from '../components/StartPoint';
import AddLead, { SelectScrollable } from '../components/AddLead';
import Add from '../components/Add';
import { useEffect, useState } from 'react';
import Lead from '../components/Lead';


import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { useNavigate, useParams } from 'react-router-dom';
import useSequence from '../hooks/useSequence';
import { setDefault, setEdges, setFlowchart, setNodes } from '../store/slice/editSequenceSlice';
import { ENDPOINTS } from '../config/constant';
import { Provider, useSelector } from 'react-redux';
import { EditSequencePageRootState, editSequencePageStore } from '../store/editSequencePageSore';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../components/shadcn/Dialog';
import { DateTimePickerForm } from '../components/shadcn/DateTimePickerForm';
import { Flowchart } from '../types/types';


const nodeTypes = {
  lead: Lead,
  email: Email,
  delay: Delay,
  startPoint: StartPoint,
  addLead: AddLead,
  add: Add
};

const EditSequencePage = () => {
  const { sequenceId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { sequence, callGetSequencesByIdApi, callUpdateSequenceApi, callUpdateSequenceAndScheduleApi } = useSequence()

  const nodes = useSelector((state: EditSequencePageRootState) => state.eidtSequence.nodes)
  const edges = useSelector((state: EditSequencePageRootState) => state.eidtSequence.edges)
  const eidtSequence = useSelector((state: EditSequencePageRootState) => state.eidtSequence)

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (sequenceId) {
      callGetSequencesByIdApi(sequenceId)
    }
  }, [])

  useEffect(() => {
    if (sequence) {
      dispatch(setNodes(sequence.flowchart.nodes))
      dispatch(setEdges(sequence.flowchart.edges))
      dispatch(setDefault(
        {
          h: sequence.flowchart.h,
          w: sequence.flowchart.w,
          lastEdge: sequence.flowchart.lastEdge
        }
      ))
    }
  }, [sequence])

  const handleSaveAsPause = () => {
    if (sequence) {
      callUpdateSequenceApi({
        sequence: {
          ...sequence,
          flowchart: eidtSequence as Flowchart
        }
      })
    }
  }

  const handleDateChange = (scheduledAt: string) => {
    console.log("Selected ISO date:", scheduledAt);
    if (sequence) {
      callUpdateSequenceAndScheduleApi({
        scheduledAt: scheduledAt,
        sequence: {
          ...sequence,
          flowchart: eidtSequence as Flowchart
        }
      })
    }
    setIsDialogOpen(false);
  };

  if (!sequence) return <></>

  return (
    <div className='h-screen p-3'>
      <div className='size-full flex flex-col'>

        <div className='py-3 flex justify-between'>
          <div className='flex flex-row gap-2 items-center'>
            <ArrowLeft onClick={() => {
              navigate(ENDPOINTS.TAB_SEQUENCE, { replace: true });
            }} />
            <p>{sequence.name}</p>

          </div>
          <div className='flex flex-row gap-2 items-center'>
            <Button onClick={handleSaveAsPause}>save as paused</Button>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild >
                <Button onClick={() => setIsDialogOpen(true)}>save and schedule</Button>
              </DialogTrigger>
              <DialogContent className="flex items-center flex-col sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Enter New Sequencename</DialogTitle>
                </DialogHeader>
                <div className=" py-14">
                  <p className='text-muted-foreground mb-1'>Scheduled at</p>

                  <DateTimePickerForm onDateChange={handleDateChange} />
                </div>
                {/* <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <Button type="button" onClick={() => {
                      // if (list)
                      //   dispatch(addNewLead({ id: id, list: list }))
                    }}>
                      SAVE
                    </Button>
                  </DialogClose>
                </DialogFooter> */}
              </DialogContent>
            </Dialog>

          </div>
        </div>

        <div className='w-full flex-1 border-2 rounded-md'>
          <div className='size-full bg-[#f2f2f2]'>
            <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes}>
              <Controls />
            </ReactFlow>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EditSequencePageWithProvider() {
  return (
    <Provider store={editSequencePageStore}>
      <EditSequencePage />
    </Provider>
  );
};