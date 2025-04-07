import { Handle, NodeProps, Position } from '@xyflow/react'
import { Mail, SquarePen, SquareX } from 'lucide-react'
import { memo } from 'react'
import { useDispatch } from 'react-redux'
import { deleteLead } from '../store/slice/editSequenceSlice'

const Lead = memo(({ data, id }: NodeProps) => {
  const dispatch = useDispatch();
  const { position } = data;
  return (
    <div className='w-64 place-items-center'>
      <div className='border-2 w-min p-3 rounded-md bg-background flex flex-row gap-3'>
        <div className='border p-3 size-min border-pink-600/60 bg-pink-300/50 rounded-md'>
          <Mail className="text-pink-600" />
        </div>
        <div className='w-36  flex flex-col'>
          <div className='flex flex-row justify-between items-center'>
            <p className='font-bold'>Leads from</p>
            <div className='flex flex-row gap-1'>
              <SquareX
                size={18}
                className='text-red-400'
                onClick={() => {
                  dispatch(deleteLead({ id: id, position: `${position}` }))

                }}
              />
            </div>
          </div>
          <p className='font-medium text-pink-600'>{`${data.label}`}</p>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  )
})

export default Lead