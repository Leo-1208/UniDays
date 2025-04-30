"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import Button from '@/components/Button';
import SearchBox from '@/components/SearchBox';
import { NAV_LINKS } from "@/constants/index";
import { useProfile } from '@/components/ProfileContext'

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [OpenMenu, SetOpenMenu] = useState(false);
  const [OpenNav2, SetOpenNav2] = useState(false);
  const navbar2Ref = useRef<HTMLDivElement>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>("/user_icon.svg");
  const { open: openProfile } = useProfile()

  // Fetch login state on mount
  useEffect(() => {
    fetch("/api/auth/check")
      .then((res) => res.json())
      .then((data) => {
        setIsLoggedIn(data.isLoggedIn);
        if (data.user?.avatar) {
          setAvatarUrl(data.user.avatar);
        }
      })
      .catch(() => {
        setIsLoggedIn(false);
        setAvatarUrl("/user_icon.svg");
      });
  }, []);

  // Menu toggles...
  const Togglemenu = () => SetOpenMenu(!OpenMenu);
  const ToggleNav2 = () => SetOpenNav2((s) => !s);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navbar2Ref.current && !navbar2Ref.current.contains(event.target as Node)) {
        SetOpenNav2(false);
      }
    };
    document.addEventListener("mouseup", handleClickOutside);
    return () => document.removeEventListener("mouseup", handleClickOutside);
  }, []);

  return (
    <div className="w-full flex justify-center">
      <nav className="flex items-center justify-between max-container padding-conatiner z-30 py-3 px-5 fixed top-0 w-full bg-white">
        <Link href="/" className='hidden lg:flex'>
          <Image src="/logo.svg" alt="logo" width={63} height={63}/>
        </Link>

        <Image
          src="/menu_icon.svg"
          alt="menu"
          width={32}
          height={32}
          onClick={Togglemenu}
          className="inline-block cursor-pointer lg:hidden"
        />
        
        <div className="flex gap-12 items-center">
          <ul className="hidden lg:flex gap-12">
            {NAV_LINKS.map((link) => (
              <Link
                href={link.href}
                key={link.key}
                className="text-gray-600 flexCenter cursor-pointer pt-2 transition-all hover:font-bold"
              >
                {link.label}
              </Link>
            ))}
          </ul>

          <button onClick={ToggleNav2} className="text-gray-600 flexCenter cursor-pointer pt-2 transition-all hover:font-bold">
            <Image src="/search_icon.svg" alt="search" width={35} height={35}/>
          </button>
        </div>

        {/* ← Here is the change: */}
        <div className="hidden lg:flex gap-2">
          {isLoggedIn ? (
          <button onClick={openProfile}           // ← this now slides the profile panel in
          className="relative w-12 h-12 rounded-full border-white overflow-hidden ">
          <Image
            src={avatarUrl}
            alt="Profile"
            fill
            className="rounded-full object-cover border-2 border-green-200 hover:scale-110 transition-transform duration-300 ease-in-out shadow-sm"
          />
        </button>
            
          ) : (
            <>
              <Button title="Signup" icon="/signup_icon.svg" variant="btn_gray" link="/signup"/>
              <Button title="Login"  icon="/user_icon.svg"   variant="btn_teal" link="/signin"/>
            </>
          )}
        </div>

        {isLoggedIn ? (<button onClick={openProfile}           // ← this now slides the profile panel in
          className="relative w-9 h-9 rounded-full border-white overflow-hidden lg:hidden">
          <Image
            src={avatarUrl}
            alt="Profile"
            fill
            className="rounded-full object-cover border-2 border-green-200 hover:scale-110 transition-transform duration-300 ease-in-out shadow-sm"
          />
        </button>):(
          <Link href="/" className=' lg:hidden'>
          <Image src="/logo.svg" alt="logo" width={48} height={48}/>
        </Link>
          )}

        {/* Mobile menu overlay */}
        <div className={`fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center transition-opacity ${OpenMenu ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
          <div className="bg-white p-8 rounded-2xl relative w-11/12 max-w-sm">
            <button onClick={Togglemenu} className="absolute top-2 right-3 text-3xl hover:font-bold">
              &times;
            </button>
            <nav>
              <ul className="flex flex-col items-center space-y-4">
                {NAV_LINKS.map((link) => (
                  <li key={link.key}>
                    <Link
                      href={link.href}
                      onClick={Togglemenu}
                      className="text-xl text-gray-800 underline hover:font-semibold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex flex-col gap-2 mt-8">
              
              {!isLoggedIn && (
                <>
                  <Button title="Signup" icon="/signup_icon.svg" variant="btn_gray" link="/signup"/>
                  <Button title="Login"  icon="/user_icon.svg"   variant="btn_teal" link="/signin"/>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {OpenNav2 && (
        <div ref={navbar2Ref} className="flexCenter rounded-full bg-gradient-to-r from-pink-300 to-green-200 opacity-40 fixed w-full max-container padding-conatiner border-2 border-gray-600 z-30 py-5 px-5 transition-transform duration-300 ease hover:opacity-100">
          <SearchBox/>
        </div>
      )}
    </div>
  )
}
