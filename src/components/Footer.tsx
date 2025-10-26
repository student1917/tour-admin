'use client';

import { HiOutlineLocationMarker, HiOutlinePhone, HiOutlineMail } from 'react-icons/hi';


export default function Footer() {
  return (
    <footer className="bg-[var(--background)] text-[var(--gray-2)] text-sm">
      <div className="w-full max-w-screen-2xl mx-auto px-5 sm:px-6 lg:px-14 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-6">
          <div>
            <h4 className="font-semibold mb-3">Explore program</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Cashback</a></li>
              <li><a href="#" className="hover:underline">Corporate</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">DUDI SOFTWARE</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">About us</a></li>
              <li><a href="#" className="hover:underline">Contact us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <HiOutlineLocationMarker className="mt-1 shrink-0" />
                <span>
                  232 Nguyen Thi Minh Khai Street,<br />
                  Vo Thi Sau Ward, District 3, HCM City
                </span>
              </li>
              <div className="flex gap-6 items-start flex-wrap">
                <li className="flex items-center gap-2">
                  <HiOutlinePhone className="shrink-0" />
                  <span>(+84) 909 163 821</span>
                </li>
                <li className="flex items-center gap-2">
                  <HiOutlineMail className="shrink-0" />
                  <span>contact@dudisoftware.com</span>
                </li>
              </div>
            </ul>
          </div>
        </div>

        <hr className="border-gray-300 my-6" />

        <div className="flex flex-col md:flex-row justify-between items-center text-xs space-y-2 md:space-y-0 text-gray-500">
          <p>© 2023 DuDi Software. All rights reserved.</p>
          <div className="flex flex-wrap gap-3 justify-center md:justify-end text-gray-500 font-regular">
            <a href="#" className="hover:underline">Privacy</a>
            <span>•</span>
            <a href="#" className="hover:underline">Terms</a>
            <span>•</span>
            <a href="#" className="hover:underline">Payment methods</a>
            <span>•</span>
            <a href="#" className="hover:underline">Check-in</a>
            <span>•</span>
            <a href="#" className="hover:underline">Change & refund</a>
            <span>•</span>
            <a href="#" className="hover:underline">eCommerce</a>
            <span>•</span>
            <a href="#" className="hover:underline">Dispute Resolution</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
