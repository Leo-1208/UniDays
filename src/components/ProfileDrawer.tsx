'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { USER } from '@/constants/index'
import { useProfile } from './ProfileContext'
import {
  FaCheckCircle,
  FaUserEdit,
  FaUsers,
  FaClipboardList,
  FaHistory,
  FaPhone,
  FaInfoCircle,
  FaSignOutAlt,
  FaTrashAlt,
  FaSquareFull,
  FaPlusSquare,
  FaGooglePlusSquare,
  FaPlus,
} from 'react-icons/fa'
import { useRouter } from "next/navigation"

export default function ProfileDrawer() {
  const { isOpen, close } = useProfile()
  const [avatarUrl, setAvatarUrl] = useState("/user_icon.svg")
  const [userData, setUserData] = useState<{ name: string, email: string, phone?: string }>({name: "John", email:"abc@king.com", phone:"+12345678"})
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/check")
      .then((res) => res.json())
      .then((data) => {
        if (data?.isLoggedIn) {
          setAvatarUrl(data.user?.avatar || "/user_icon.svg")
          setUserData({
            name: data.user.name,
            email: data.user.email,
            phone: data.user.phone || '',
          })
        }
      })
      .catch(() => {
        setAvatarUrl("/user_icon.svg")
      });
  }, [])

  return (
    <>
      {/* backdrop */}
      <div
        onClick={close}
        className={`fixed inset-0 bg-black bg-opacity-20 z-40 transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-full md:w-[400px] bg-white shadow-xl transform transition-transform z-50 overflow-y-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <header className="relative h-40 bg-peach-200 rounded-b-3xl">
          <button
            onClick={close}
            className="absolute top-3 left-3 p-2 bg-white rounded-full shadow"
          >
            ←
          </button>
          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-32px]">
            <div className="relative w-24 h-24 rounded-full border-4 border-white overflow-hidden">
              <Image
                src={avatarUrl}
                alt="User Avatar"
                fill
                className="object-cover"
              />
            </div>
            <FaCheckCircle className="text-green-500 absolute bottom-0 right-0 bg-white rounded-full shadow" />
          </div>
        </header>

        <div className="mt-16 px-4 space-y-2">
          <h2 className="text-xl font-semibold">{userData.name}</h2>
          <p className="text-sm text-gray-600">{userData.email}</p>
          <p className="text-sm text-gray-600">{userData.phone}</p>

          {/* Verify
          <button className="w-full flex items-center justify-between bg-white shadow rounded-lg px-4 py-3 mt-4">
            <span>Verify Yourself</span>
            {USER.verified && <FaCheckCircle className="text-green-500" />}
          </button> */}

          {/* Menu groups */}
          <ul className="mt-4 space-y-1">
            <li>
              <button className="w-full flex items-center gap-3 bg-white shadow rounded-lg px-4 py-3">
                <FaUserEdit /> Edit personal information
              </button>
            </li>
            <li>
              <button onClick={()=>{router.push("/plan-a-trip")}} className="w-full flex items-center gap-3 bg-white shadow rounded-lg px-4 py-3">
                <FaPlusSquare /> Create new Plan
              </button>
            </li>
            <li>
              <button className="w-full flex items-center gap-3 bg-white shadow rounded-lg px-4 py-3">
                <FaClipboardList /> Your Plans
              </button>
            </li>
          </ul>

          <ul className="mt-4 space-y-1">
            <li>
              <button className="w-full flex items-center gap-3 bg-white shadow rounded-lg px-4 py-3">
                <FaHistory /> Past Trips and Plans
              </button>
            </li>
            {/* <li>
              <button className="w-full flex items-center gap-3 bg-white shadow rounded-lg px-4 py-3">
                <FaPhone /> Contact Us
              </button>
            </li> */}
            <li>
              <button onClick={()=>{router.push("/about_us")}} className="w-full flex items-center gap-3 bg-white shadow rounded-lg px-4 py-3">
                <FaInfoCircle /> About Us
              </button>
            </li>
          </ul>

          <ul className="mt-4 space-y-1">
            <li>
              <button onClick={()=>{router.push("/signout")}} className="w-full flex items-center gap-3 bg-white shadow rounded-lg px-4 py-3">
                <FaSignOutAlt /> Logout
              </button>
            </li>
            {/* <li>
              <button className="w-full flex items-center gap-3 bg-white shadow rounded-lg px-4 py-3 text-red-600">
                <FaTrashAlt /> Delete Account
              </button>
            </li> */}
          </ul>
        </div>
      </aside>
    </>
  )
}
