import React from 'react'
import Image from 'next/image'

const Logo = () => {
  return (
    <div>
      <Image
        src="/assets/delivery-wallet.png"
        alt="logo"
        width={140}
        height={140}
      />
    </div>
  )
}

export default Logo