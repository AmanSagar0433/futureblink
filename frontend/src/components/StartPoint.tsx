import { Handle, Position } from "@xyflow/react"

const StartPoint = () => {
  return (
    <div className='w-64 place-items-center'>
      <div className='border-2 py-3 px-5 rounded-md bg-background'>
        <p className='w-40 font-medium text-gray-700'>Sequence Start Point </p>
      </div>
      
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  )
}

export default StartPoint