import React from 'react'
import { Ethereum, Polygon, USDC, USDT } from '../icons';

type Prop = {
  ticker: string;
}

const IconByToken = ({ ticker }: Prop) => {
  if (ticker === 'ETH')
    return (
      <div>
        <Ethereum className='' />
      </div>
    )
  else if (ticker === 'MATIC') 
    return (
      <div>
        <Polygon className='' />
      </div>
    ) 
  else if (ticker === 'USDC')
    return(
       <div>
        <USDC className='' />
      </div>
  ) 
  else if (ticker === 'USDT')
    return (
      <div>
        <USDT className='' />
      </div>
    )
  return (
    <div>Nothing</div>
  )
}

export default IconByToken