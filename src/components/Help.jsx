import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import { BiMenuAltRight } from "react-icons/bi";


export const Help = () => {
  const [activeLink, setActiveLink] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSetActive = (to) => {
    setActiveLink(to);
    setIsMenuOpen(false);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-[90%] bg-color-background mx-auto overflow-hidden max-w-screen-xl font-dm-sans text-white">
      <div>
        <header className="mb-5">
          <nav className="flex h-20 items-center justify-between">
            <a
              className="w-1/2 max-w-[280px] text-3xl font-bold uppercase"
              href="./"
            >
              DEMOCRATIK.
            </a>

            {/*<input className="peer/menu hidden" type="checkbox" id="menu" />*/}
            <input
              className="peer/menu hidden"
              type="checkbox"
              id="menu"
              checked={isMenuOpen}
              onChange={handleMenuToggle}
            />

            <label
              className="w-10 h-10 bg-green-color rounded-lg cursor-pointer transition-transform z-40 md:hidden"
              htmlFor="menu"
            >
              {isMenuOpen ? (
                <IoCloseSharp className="w-full h-full text-black" />
              ) : (
                <BiMenuAltRight className="w-full h-full text-black" />
              )}
            </label>

            {/*     
            <label
              className="w-10 h-10 bg-open-menu bg-cover bg-center bg-green-color rounded-lg cursor-pointer peer-checked/menu:bg-close-menu transition-all z-40 md:hidden"
              htmlFor="menu"
            ></label>
              */}
            <ul className="fixed inset-0 bg-indigo-600 px-[5%] grid gap-6 auto-rows-max content-center justify-items-center clip-circle-0 peer-checked/menu:clip-circle-full transition-[clip-path] duration-500 md:clip-circle-full md:relative md:grid-flow-col md:p-0 md:bg-transparent">
              <li>
                <RouterLink
                  to="/"
                  className={`${activeLink === "/" ? "active" : ""}`}
                  onClick={() => handleSetActive("/")}
                >
                  Inicio
                </RouterLink>
              </li>

              <RouterLink
                className="flex items-center justify-center"
                to="/afiliarme"
              >
                Afiliarme
              </RouterLink>

              <li>
                <RouterLink to="/ayuda">Ayuda</RouterLink>
              </li>
            </ul>
          </nav>
        </header>
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Preguntas frecuentes</h2>
        <div className="grid gap-4">
          <div className="bg-secondary-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">
              Como me afilio a Democratik?
            </h3>
            <p className="text-gray-300 text-sm mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <div className="bg-secondary-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">
              Que datos necesito para registrarme?
            </h3>
            <p className="text-gray-300 text-sm mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <div className="bg-secondary-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">
              Como consulto el estado de mi solicitud?
            </h3>
            <p className="text-gray-300 text-sm mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <div className="bg-secondary-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">
              Donde puedo escribir si tengo problemas?
            </h3>
            <p className="text-gray-300 text-sm mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};


