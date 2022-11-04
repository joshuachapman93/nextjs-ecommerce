import React from 'react'
import { useAppContext } from '../../context/CartContext';

export async function getServerSideProps(context) {
    const { params } = context

    return {
        props: { id: params.id }, // will be passed to the page component as props
    }
}

export default function Description(props) {
    const [size, setSize] = React.useState(null)
    const { id: path } = props
    const { state: { prices } = [], dispatch } = useAppContext()
    const product = prices.filter(val => val.id === path.replace('/', ''))[0]

    if (product === undefined) { return <div className='pt-40 select-none grid place-items-center'>LOADING...</div> }

    const tempSizes = Object.keys(product.product.metadata)
    function setSz(size) {
        return () => setSize(size)
    }
    console.log(size)
    function addToBasket(prod) { //curried function
        console.log('henry', prod.id)

        if (!size) { return }
        return () => {
            setSize(null)
            dispatch({ type: 'add_product', value: [prod.id, size] })
        }
    }

    return (
        <div className='mx-auto w-fit flex flex-wrap justify-center md:gap-6'>
            <img src={product.product.images[0]} alt={product.product.id} style={{ maxHeight: '600px' }} />
            <div className='min-w-min max-w-min whitespace-nowrap'>
                <h1 className='text-sm py-3 font-light tracking-wide text-xl lg:text-3xl '>
                    {product.product.name}
                </h1>
                <div className='max-w-full whitespace-normal text-justify pb-4 font-light'>
                    <p className='text-sm md:text-md'>{product.product.description}</p>
                </div>
                <p className='text-md md:text-xl'>${product.unit_amount / 100}</p>
                <p className='text-sm pt-4 pb-2'>SIZE</p>
                <div className='flex text-sm items-center font-light pb-4 flex-wrap gap-2'>
                    {tempSizes.map((sz, index) => {
                        return <div onClick={setSz(sz)}
                            className={' uppercase border border-solid border-gray-200 w-10 select-none cursor-pointer transition duration-300 hover:bg-slate-100 py-1 grid place-items-center ' + (sz === size ? 'border-black border-2' : '')} key={index}>
                            {sz}
                        </div>
                    })}
                </div>
                <hr />
                <button onClick={addToBasket(product)}
                    className='w-full my-4 p-4 border border-solid border-gray-100 shadow bg-slate-100 text-slate-700 font-light transition duration-300 hover:opacity-50'>
                    Add To Basket
                </button>
            </div>
        </div>
    )
}
