import { IconChevronDown } from '@tabler/icons-react'
import { motion } from 'framer-motion'
import { Squash as Hamburger } from 'hamburger-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import style from '@/styles/Navbar.module.css'

import merge from '@/lib/merge'
import useScroll from '@/hooks/useScroll'

import LoginButton from '@/components/buttons/LoginButton'
import Logout from '@/components/buttons/LogoutButton'
import CompetitionMenu from '@/components/DropdownMenu'
import Avatar from '@/components/shared/Avatar'
import ThemeToogle from '@/components/shared/ThemeToogle'

import { auth } from '@/firebase/firebase'

import { complinks, links } from './NavLinks'

export default function Navbar() {
  const scrollPos = useScroll()
  const [blurNavbar, setBlurNavbar] = useState(false)
  const [dropDownCompe, setdropDownCompe] = useState(false)
  const [MobileNav, setMobileNav] = useState(false)

  useEffect(() => {
    if (scrollPos > 0) {
      setBlurNavbar(true)
    } else {
      setBlurNavbar(false)
    }
  }, [scrollPos])

  const sidebar = {
    open: (height = 1000) => ({
      opacity: 1,
      height,
      transition: {
        type: 'easeInOut',
        duration: 0.2,
      },
    }),
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        type: 'easeInOut',
        duration: 0.2,
      },
    },
  }
  const [user] = useAuthState(auth)

  return (
    <nav
      className={merge(
        'fixed left-0 top-0 z-50 px-10 py-5',
        ' inline-flex w-full',
        ' bg-transparent duration-100',
        blurNavbar && 'bg-black/80 backdrop-blur-sm '
      )}
    >
      <div className='z-50 flex w-screen items-center justify-between md:mx-10 lg:w-3/12'>
        <Link href='/'>
          <Image
            alt='Logo Mage9'
            width={60}
            height={60}
            priority={true}
            src='/images/mage-white.svg'
            className='h-auto w-full'
          />
        </Link>
        <div className='flex gap-4 text-white lg:hidden'>
          <Hamburger
            onToggle={() => {
              setMobileNav(!MobileNav)
            }}
          />
          <ThemeToogle />
        </div>
      </div>
      <ul
        className={merge(
          'text-xl font-semibold text-white',
          'flex items-center justify-end gap-10',
          'relative gap-10 max-lg:hidden'
        )}
      >
        {links.map(({ href, label }) => (
          <li
            key={`${href}${label}`}
            className={merge(style['animate-underline'])}
          >
            <Link href={href}>{label}</Link>
          </li>
        ))}
        <li>
          <CompetitionMenu />
        </li>
        <li className='inline-flex items-center gap-10'>
          <ThemeToogle />

          {!user && <LoginButton />}
          {user && (
            <div className='flex flex-row items-center justify-between'>
              <Avatar email={user.email?.toString()} />
              <Logout />
            </div>
          )}
        </li>
      </ul>

      {/* MOBILE NAV */}
      <motion.div
        initial={false}
        animate={MobileNav ? 'open' : 'closed'}
        className='flex cursor-pointer lg:hidden'
      >
        <motion.div
          className='absolute bottom-0 left-0 top-0 min-h-screen w-full bg-gradient-to-b from-violet-950 to-violet-800 pt-28 backdrop-blur-sm'
          style={{ pointerEvents: MobileNav ? 'auto' : 'none' }}
          variants={sidebar}
        >
          <ul className='flex flex-col justify-start gap-6 p-5 text-lg text-white'>
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className={merge(style['animate-underline'])}>
                  {label}
                </Link>
              </li>
            ))}
            <li className='flex flex-col gap-5'>
              <div
                className='inline-flex items-center'
                onClick={() => {
                  setdropDownCompe(!dropDownCompe)
                }}
              >
                Competition
                <IconChevronDown
                  className={merge(
                    'inline-block w-10',
                    !dropDownCompe && '-rotate-90'
                  )}
                />
              </div>
              <div
                className={merge(
                  'flex flex-col gap-2.5 px-5 text-base font-medium',
                  dropDownCompe
                    ? 'animate-fade-in-down block'
                    : 'animate-fade-out-up hidden'
                )}
              >
                {complinks.map(({ href, label }) => (
                  <div key={href} className='rounded-md p-3 hover:bg-white/50'>
                    <Link href={href}>{label}</Link>
                  </div>
                ))}
              </div>
            </li>
            <li className='flex flex-col gap-5 px-8'>
              {!user && <LoginButton />}
              {user && (
                <div className='flex flex-row items-center justify-between'>
                  <Logout />
                </div>
              )}
            </li>
          </ul>
        </motion.div>
      </motion.div>
    </nav>
  )
}
