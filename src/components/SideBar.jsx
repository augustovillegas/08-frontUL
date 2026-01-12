import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoPersonSharp } from "react-icons/io5";
import {
  RiBarChart2Line,
  RiEarthLine,
  RiCalendarTodoLine,
  RiLogoutCircleRLine,
  RiArrowRightSLine,
  RiMenu3Line,
  RiCloseLine,
  RiMessage2Line,
} from "react-icons/ri";

export const SideBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);

  return (
    <>
      <div
        className={`xl:h-[100vh] fixed xl:static w-[65%] md:w-[40%] lg:w-[30%] xl:w-auto h-full top-0 bg-secondary-100 p-4 flex flex-col justify-between z-50 ${
          showMenu ? "left-0" : "-left-full"
        } transition-all`}
      >
        <div>
          <div className="text-center text-2xl font-bold text-white mb-10">
            <Link to="/admin">
              Admin<span className="text-primary text-4xl">.</span>
            </Link>
          </div>
          <ul>
            <li>
              <Link
                to="/admin/analiticas"
                className="flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-900 transition-colors"
              >
                <RiBarChart2Line className="text-primary" /> Analíticas
              </Link>
            </li>

            <li>
              <button
                to="/"
                onClick={() => setShowSubMenu(!showSubMenu)}
                className="w-full flex items-center justify-between py-2 px-4 rounded-lg hover:bg-secondary-900 transition-colors"
              >
                <span className="flex items-center gap-4">
                  <RiEarthLine className="text-primary" /> Marketing
                </span>
                <RiArrowRightSLine
                  className={`mt-1 ${
                    showSubMenu && "rotate-90"
                  } transition-all`}
                />
              </button>
              <ul className={`my-2 ${!showSubMenu && "hidden"} `}>
                <li>
                  <Link
                    to="/admin/mailing"
                    className="py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-primary transition-colors"
                  >
                    Mailing
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/social-statistic"
                    className="py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-gray-500 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-primary transition-colors"
                  >
                    Social Statistic
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/seguidores"
                    className="py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-gray-500 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-primary transition-colors"
                  >
                    Seguidores
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link
                to="/admin/mensajes"
                className="flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-900 transition-colors"
              >
                <RiMessage2Line className="text-primary" />
                Mensajes
              </Link>
            </li>
            <li>
              <Link
                to="/admin/afiliados"
                className="flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-900 transition-colors"
              >
                <IoPersonSharp className="text-primary" />
                Afiliados
              </Link>
            </li>
          </ul>
        </div>
        <nav>
          <Link
            to="/"
            className="flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-900 transition-colors"
          >
            <RiLogoutCircleRLine className="text-primary" />
            Cerrar sesión
          </Link>
        </nav>
      </div>
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="fixed bottom-4 right-4 bg-green-color text-black p-3 rounded-lg cursor-pointer z-50 xl:hidden"
      >
        {showMenu ? <RiCloseLine /> : <RiMenu3Line />}
      </button>
    </>
  );
};
