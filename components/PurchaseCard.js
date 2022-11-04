import React from 'react'
import Router from 'next/router'

export default function PurchaseCard(props) {
    const { price } = props

    return (
        <div onClick={() => Router.push(`/${price.id}`)}
            className='w-60 h-80 shadow-md border border-solid border-gray-100 cursor-pointer transition hover:opacity-50 bg-white'>
            {price.product.images && (
                <div className='h-60 object-contain'>
                    <img src={price.product.images[0]} alt={price.product.name} />
                </div>
            )}
            <h1 className='text-sm text-center py-3 font-light tracking-wide'>
                {price.product.name}
            </h1>
            <p className='text-center text-sm font-extralight'>${price.unit_amount / 100}</p>
        </div>
    )
}
