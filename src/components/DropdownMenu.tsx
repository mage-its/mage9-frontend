import { Menu } from '@headlessui/react'
import { IconChevronDown } from '@tabler/icons-react'
import { useRouter } from 'next/router'

import merge from '@/lib/merge'

import { complinks } from './shared/navbar/NavLinks'

export default function CompetitionMenu() {
  const router = useRouter()
  return (
    <Menu>
      <Menu.Button className='inline-flex items-center gap-2'>
        <span>Competition</span>
        <IconChevronDown />
      </Menu.Button>
      <Menu.Items
        className={merge(
          'flex flex-col',
          'absolute right-64 mt-3  w-56 origin-top-right rounded-md  bg-gray-900/70 p-2.5 shadow-lg ring-1 ring-black ring-opacity-5 backdrop-blur focus:outline-none'
        )}
      >
        {' '}
        {complinks.map((item, i) => {
          return (
            <Menu.Item key={i}>
              <button
                onClick={() => router.push(item.href)}
                className={merge(
                  'whitespace-nowrap rounded-md px-3 py-2 text-base hover:bg-white/50'
                )}
              >
                {item.label}
              </button>
            </Menu.Item>
          )
        })}
      </Menu.Items>
    </Menu>
  )
}
