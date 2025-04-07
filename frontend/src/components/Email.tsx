import { Handle, NodeProps, Position } from '@xyflow/react'
import { Mail, SquarePen, SquareX } from 'lucide-react'
import { memo } from 'react'
import { useDispatch } from 'react-redux';
import { deleteEmail } from '../store/slice/editSequenceSlice';

const Email = memo(({ id, data }: NodeProps) => {
  const dispatch = useDispatch();
  const { position } = data;
  return (
    <div className='w-64 place-items-center'>
      <div className='border-2 w-min p-3 rounded-md flex flex-row gap-3 bg-background'>

        <div className='border p-3 size-min border-purple-600/60 bg-purple-300/50 rounded-md'>
          <Mail className="text-purple-600" />
        </div>

        <div className='w-36  flex flex-col'>
          <div className='flex flex-row justify-between items-center'>
            <p className='font-bold'>Email</p>
            <div className='flex flex-row gap-1'>
              <SquareX
                size={18}
                className='text-red-400'
                onClick={() => {
                  dispatch(deleteEmail({ id: id, position: `${position}` }))
                }}
              />
            </div>
          </div>
          <p className='font-medium text-gray-700'>Template:</p>
          <p className='font-medium text-purple-600'>{`Hello world(default)`}</p>
        </div>
      </div>

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  )
})

export default Email