import { useRouter } from 'next/router'

interface MoreButtonProps {
  readonly link: string
  readonly text: string
}

export default function MoreButton({ link, text }: MoreButtonProps) {
  const router = useRouter()
  return (
    <button
      onClick={() => router.push(link)}
      className=' mx-auto rounded-full border-2 border-custom-purple text-custom-purple hover:bg-custom-purple hover:text-white dark:bg-white dark:hover:bg-custom-purple dark:hover:text-white md:mx-2'
    >
      <h1 className='px-8 py-2 text-center text-sm md:text-lg lg:text-xl '>
        {text}
      </h1>
    </button>
  )
}
