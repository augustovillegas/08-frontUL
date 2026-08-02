import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { AiTwotoneEdit } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import { GrDocumentUser, GrDocumentConfig } from "react-icons/gr";

export default function DropDownActions({ onDoc, onEdit, onDelete }) {
  return (
    <Menu>
      <MenuButton className="inline-flex items-center rounded-full py-1.5 px-3 font-semibold text-white focus:outline-none data-[hover]:bg-black data-[open]:bg-black data-[focus]:outline-1 data-[focus]:outline-white">
        <GrDocumentConfig className="text-[20px] fill-white" />
      </MenuButton>

      <MenuItems
        transition
        anchor="bottom start"
        className="w-52 origin-top-right rounded-xl border border-white/5 bg-black p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
      >
        <MenuItem>
          <button
            onClick={onDoc}
            className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
          >
            <GrDocumentUser className="size-4 fill-white/60" />
            Documentación
            <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">⌘D</kbd>
          </button>
        </MenuItem>
        <MenuItem>
          <button
            onClick={onEdit}
            className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
          >
            <AiTwotoneEdit className="size-4 fill-white/60" />
            Editar
            <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">⌘E</kbd>
          </button>
        </MenuItem>
        <MenuItem>
          <button
            onClick={onDelete}
            className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10 text-red-400"
          >
            <RiDeleteBinLine className="size-4" />
            Borrar
            <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">⌘B</kbd>
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
