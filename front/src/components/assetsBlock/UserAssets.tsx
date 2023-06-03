import React from 'react'
import AssetsBlocks from './AssetsBlocks';

export type Assets = {
  ticker: string;
  network: string;
  ammount: number;
}

type Props = {
  assets: Assets[];
}

const UserAssets = ({ assets }: Props) => {
  return (
    <div>
      {assets.map((assets, idx) => {
        return (
          <AssetsBlocks
            key={idx}
            ticker={assets.ticker}
            network={assets.network}
            ammount={assets.ammount}
          />
        )
      })}
    </div>
  )
}

export default UserAssets