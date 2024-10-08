import { FOOTER_CONTACT_INFO, FOOTER_LINKS, SOCIALS } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="flexCenter mb-16 mt-20">
      <div className="padding-container max-container flex w-full flex-col gap-14">
        <div className="flex flex-col items-start justify-center gap-[10%] md:flex-row">
          <Link href="/" className="mb-10">
            <Image src="logo.svg" alt="logo" width={74} height={29}/>
          </Link>

          <div className='flex flex-wrap gap-10 sm:justify-between md:flex-1'>
          {FOOTER_LINKS.map((columns, index) => (
            <FooterColumn title={columns.title} key={index}>
              <ul className="text-[14px] font-[400] flex flex-col gap-4 text-gray-30">
                {columns.links.map((link, linkIndex) => (
                  <Link href="/" key={linkIndex}>
                    {link}
                  </Link>
                ))}
              </ul>
            </FooterColumn>
          ))}


            <div className="flex flex-col gap-5">
              <FooterColumn title={FOOTER_CONTACT_INFO.title}>
              {FOOTER_CONTACT_INFO.links.map((link, linkIndex) => (
                <Link href="/" key={linkIndex} className="flex gap-4 md:flex-col lg:flex-row">
                  <p className="whitespace-nowrap">{link.label}:</p>
                  <p className="text-[14px] font-[600] whitespace-nowrap text-blue-70">
                    {link.value}
                  </p>
                </Link>
              ))}
              </FooterColumn>
            </div>

            <div className="flex flex-col gap-5">
              <FooterColumn title={SOCIALS.title}>
                <ul className="text-[14px] font-[400] flex gap-4 text-gray-30">
                {SOCIALS.links.map((link, index) => (
                  <Link href={link.handle} key={index}>
                    <Image src={link.icon} alt="logo" width={24} height={24} />
                  </Link>
                ))}
                </ul>
              </FooterColumn>
            </div>
          </div>
        </div>

        <div className="border bg-gray-20" />
        <p className="text-[14px] font-[400] w-full text-center text-gray-30">2024 @Travel.com | All rights reserved</p>
      </div>
    </footer>
  )
}

type FooterColumnProps = {
  title: string;
  children: React.ReactNode;
}

const FooterColumn = ({ title, children }: FooterColumnProps) => {
  return (
    <div className="flex flex-col gap-5">
      <h4 className="text-[18px] font-[700] whitespace-nowrap">{title}</h4>
      {children}
    </div>
  )
}

export default Footer