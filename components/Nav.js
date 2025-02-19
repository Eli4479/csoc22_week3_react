/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useAuth } from "../context/auth";
import { useEffect } from 'react'
import React from "react";
import { useState } from "react";
import RegisterForm from "../components/LoginForm"


export default function Nav() {
  const [Render, SetRender] = useState(null);

  const { logout, profileName, avatarImage } = useAuth()

  useEffect(() => {
    if (localStorage.getItem('token') == null || localStorage.getItem('token') == undefined) SetRender(false)

    else SetRender(true)

  }, [logout, profileName, avatarImage, RegisterForm, Nav])
  return (
    <nav className='bg-red-600' style={{ backgroundColor: '#F582AE' }} >
      <ul className='flex items-center justify-between p-5'>
        <ul className='flex items-center justify-between space-x-4' >
          <li>
            <Link href="/" passHref={true}>
              <a>
                <h1 className='font-bold text-xl' style={{ color: '#001858' }}>Todo</h1>
              </a>
            </Link>
          </li>
        </ul>
        <ul className='flex' style={{ display: !Render ? 'flex' : 'none' }}>
          <li className=' mr-2' style={{ color: '#001815' }}>
            <Link href='/login'>Login</Link>
          </li>
          <li className='' style={{ color: '#001858' }}>
            <Link href='/register'>Register</Link>
          </li>
        </ul>
        <div className='inline-block relative w-28' style={{ display: Render ? 'block' : 'none' }}>
          <div className='group inline-block relative'>
            <button className='bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center'>
              <img src={avatarImage} />
              <span className='mr-1'>{profileName}</span>
              <svg
                className='fill-current h-4 w-4'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
              >
                <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
              </svg>
            </button>
            <ul className='absolute hidden text-gray-700 pt-1 group-hover:block'>
              <li className=''>
                <a
                  className='rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap'
                  href='#'
                  onClick={logout}
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </ul>
    </ nav>
  )
}
