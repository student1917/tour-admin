'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBars } from 'react-icons/fa6';
import { HiOutlineGlobeAlt } from 'react-icons/hi';
import { FaTimes } from 'react-icons/fa';
import Button from '@/components/ui/Button';
import { useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const isLoggedIn = false;
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Bài viết', href: '/bai-viet' },
    { label: 'Hành trình', href: '/hanh-trinh' },
  ];

  return (
    <header className="bg-[var(--background)] shadow-sm relative w-full z-50">
      <div className="w-full max-w-screen-2xl mx-auto px-5 sm:px-6 lg:px-14 py-4 flex justify-between items-center relative">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/Logo.svg" alt="Logo" width={150} height={100} />
        </Link>

        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 space-x-6 text-base font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition ${
                pathname === item.href
                  ? 'text-[var(--primary)] font-medium'
                  : 'text-[var(--primary)] font-regular'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="text-gray-500 rounded-full p-2">
            <HiOutlineGlobeAlt size={24} />
          </div>

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>

          {!isLoggedIn && (
            <div className="hidden md:block">
              <Link href="/auth/login">
                <Button variant="outline-primary">Đăng nhập / Đăng ký</Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-md px-6 pb-4 z-40">
          <nav className="flex flex-col space-y-4 mt-2 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`transition ${
                  pathname === item.href
                    ? 'text-[var(--primary)] font-bold'
                    : 'text-[var(--primary)] hover:text-[var(--primary)]'
                }`}
              >
                {item.label}
              </Link>
            ))}
            {!isLoggedIn && (
              <Link
                href="/auth/login"
                onClick={() => setMenuOpen(false)}
                className="mt-2"
              >
                <Button variant="outline-primary" className="w-full">
                  Đăng nhập / Đăng ký
                </Button>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
