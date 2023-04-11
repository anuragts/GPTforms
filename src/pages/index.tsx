// import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className='text-4xl flex justify-center mt-[40vh]'>
     <div className='font-semibold'>
       Hello World  from GPTforms.
      </div> 
    </main>
  )
}
