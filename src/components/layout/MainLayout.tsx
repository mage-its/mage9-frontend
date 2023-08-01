import Navbar from '@/components/shared/navbar/Navbar'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='text-custom-purple dark:text-white'>
      <Navbar />
      {children}
    </div>
  )
}
