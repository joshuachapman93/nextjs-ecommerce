import Head from 'next/head'
import { useEffect } from 'react'
import Stripe from 'stripe'
import PurchaseCard from '../components/PurchaseCard'
import { useAppContext } from '../context/CartContext'
import styles from '../styles/Home.module.css'

export async function getServerSideProps(context) {
  const stripe = new Stripe(process.env.STRIPE_SECRET ?? '', {
    apiVersion: '2020-08-27'
  })

  const res = await stripe.prices.list({
    limit: 10,
    expand: ['data.product']
  })

  const prices = res.data.filter(price => {
    return price.active
  })

  return {
    props: { prices }, // will be passed to the page component as props
  }
}

export default function Home({ prices }) {
  const { dispatch } = useAppContext()

  useEffect(() => {
    dispatch({
      type: 'set_prices',
      value: prices
    })
  }, [prices])

  return (
    <div className='flex flex-col flex-1'>
      <Head>
        <title>Moonglade Apparel</title>
        <meta name="description" content="Nextjs ecommerce store" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {prices.map((price, index) => {
          return (
            <PurchaseCard key={index} className="border border-solid border-green-200 my-2 h-20" price={price} />
          )
        })}
      </main>

   
    </div>
  )
}
