import { NodeProps, Position } from '@xyflow/react'
import { Handle } from '@xyflow/react'
import { Clock, SquarePen, SquareX } from 'lucide-react'
import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { deleteDelay } from '../store/slice/editSequenceSlice';

const Delay = memo(({ id, data }: NodeProps) => {
  const dispatch = useDispatch();
  const { position } = data;
  return (
    <div className='w-64 place-items-center'>
      <div className='border-2 w-min p-3 rounded-md flex flex-row gap-3 bg-background'>

        <div className='border p-3 size-min border-sky-600/60 bg-sky-300/50 rounded-md'>
          <Clock className="text-sky-600" />
        </div>

        <div className='w-36  flex flex-col'>
          <div className='flex flex-row justify-between items-center'>
            <p className='font-bold'>Delay</p>
            <div className='flex flex-row gap-1'>
              <SquareX
                size={18}
                className='text-red-400'
                onClick={() => {
                  dispatch(deleteDelay({ id: id, position: `${position}` }))
                }}
              />
            </div>
          </div>
          <p className='font-medium text-gray-700'>Wait: <span className='text-sky-600'>{`${data.label}`}</span></p>
        </div>
      </div>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  )
})

export default Delay