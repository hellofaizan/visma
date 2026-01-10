import React from 'react'

export default function ModelNode( { data }: { data: any } ) {
  return (
    <div className='bg-white rounded-md shadow text-sm'>
        <div className='bg-gray-800 text-white px-2 py-1 font-bold'>
            {data.name}
        </div>

        <div className='p-2 space-y-1'>
            {data.fields.map((f: any) => {
                console.log(f);
                // console.log(f.name && f.type);
                <div key={f.name} className='flex justify-between'>
                    <span>{f.name}</span>
                    <span className='text-gray-500'>{f.type}</span>
                </div>
            })}
        </div>
    </div>
  )
}
