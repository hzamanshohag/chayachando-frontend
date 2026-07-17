import React from "react";
import { Link } from "react-router-dom";
import appstore from "../assets/images/appstore.png";
import logo from "../assets/images/chayachando.png";
import {
  FiDribbble,
  FiFacebook,
  FiInstagram,
  FiLinkedin,
  FiMail,
  FiShoppingCart,
  FiTwitter,
} from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="py-8 bg-slate-800 dark:bg-gray-900">
      <div className="container">
        <footer className="px-3 pt-4 lg:px-9 text-white">
          <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Company Info */}
            <div className="sm:col-span-2">
              <Link to={'/'} className="inline-flex items-center">
                <img src={logo} alt="logo" />
              </Link>
              <div className="mt-6 lg:max-w-xl">
                <p className="text-sm text-white">
                  Chayachando delivers bold, honest journalism—free from fear or
                  favour. We seek truth, challenge power, and amplify unheard
                  voices with integrity, independence, and a deep commitment to
                  public interest.
                </p>
              </div>
            </div>

            {/* Courses & Topics */}
            <div className="flex flex-col gap-2 text-sm">
              <p className="text-base font-bold tracking-wide text-white">
                Trending Topics
              </p>
              <Link to={"/news"} className="hover:text-gray-400">
                সংবাদ
              </Link>
              <Link to={"/opinion"} className="hover:text-gray-400">
                মতামত
              </Link>
              <Link to={"/entertainment"} className="hover:text-gray-400">
                বিনোদন
              </Link>
              <Link to={"/sports"} className="hover:text-gray-400">
                খেলাধুলা
              </Link>
              <Link to={"/interview"} className="hover:text-gray-400">
                সাক্ষাৎকার
              </Link>
              <Link to={"/others"} className="hover:text-gray-400">
                বিবিধ
              </Link>
            </div>

            {/* Downloads & Contact */}
            <div>
              <p className="text-base font-bold tracking-wide text-white">
                ALSO AVAILABLE ON
              </p>
              <div className="flex items-center gap-1 px-2 mt-2 rounded-3xl bg-gray-400">
                <a href="#" className="w-full min-w-xl">
                  <img
                    src="https://mcqmate.com/public/images/icons/playstore.svg"
                    alt="Playstore Button"
                    className="h-10"
                  />
                </a>
                <a href="#" className="w-full min-w-xl">
                  <img
                    src="https://mcqmate.com/public/images/icons/youtube.svg"
                    alt="Youtube Button"
                    className="h-28"
                  />
                </a>
              </div>

              <p className="text-base font-bold tracking-wide text-white mt-4">
                Contacts
              </p>
              <div className="flex items-center mt-2">
                <p className="mr-1 text-white">Email:</p>
                <a href="mailto:support@chayachando.com" className="text-white">
                  support@chayachando.com
                </a>
              </div>
            </div>
          </div>

          {/* Copyright & Policies */}
          <div className="flex flex-col-reverse justify-between pt-5 pb-10 border-t lg:flex-row">
            <p className="text-sm text-white">
              © 2025 Chaya Chando. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </footer>
  );
}
