"use client";

import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface MenuExpansibleProps {
  children: React.ReactNode;
  open: boolean;
  onClick: () => void;
  logo?: React.ReactNode;
}

interface MenuExpansibleItemProps {
  href?: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  active?: boolean;
  withSubItems?: boolean;
  forceClosed?: boolean;
  children?: React.ReactNode;
}

export function MenuExpansible({
  children,
  open,
  logo,
  onClick,
}: MenuExpansibleProps) {
  return (
    <aside
      className={`flex flex-col justify-start transition-all ${
        open ? "w-52" : "w-16"
      } border-r border-[hsl(var(--border))] bg-[hsl(var(--background))] min-h-screen`}
    >
      <div>
       <div className="flex flex-row justify-between items-center p-4">
        {open ? <div className="flex">{logo}</div> : <span className='text-xl leading-none pl-[9px] text-[hsl(var(--primary))]'>P</span>}
        <button
          onClick={onClick}
          className={`flex items-center gap-2 bg-[hsl(var(--card))] mb-1 ${
            !open
              ? "absolute left-[20px] top-[98%] transform -translate-y-1/2"
              : ""
          }`}
        >
          {open ? <ChevronLeftIcon className="w-5 h-5"/> : <ChevronRightIcon className="w-5 h-5"/>}
        </button>
       </div>
       {children}
      </div>
    </aside>
  );
}

export function MenuExpansibleItem({
  href,
  label,
  icon,
  active,
  withSubItems = false,
  forceClosed = false,
  children,
}: MenuExpansibleItemProps) {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  if (!withSubItems) {
    return (
      <Link
        href={href}
        className={`flex items-center gap-5 px-2 py-2 rounded-md transition-colors ${
          active
            ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"
            : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--foreground))]"
        }`}
      >
        {icon}
        <span className="flex-1">{label}</span>
      </Link>
    );
  }

  return (
    <>
      <button
        onClick={toggleOpen}
        className={`flex items-center gap-5 px-2 py-2 rounded-md transition-colors ${
          active
            ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"
            : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--foreground))]"
        }`}
      >
        {icon}
        <span className="flex-1">{label}</span>
        {open ? <ChevronUpIcon className="w-5 h-5"/> : <ChevronDownIcon className="w-5 h-5"/>}
      </button>
      {open && !forceClosed && (
        <div className="flex flex-col pl-4 gap-1">
          {children}
        </div>
      )}
    </>
  );
}

export function MenuExpansibleContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-col w-full px-3 gap-1">{children}</div>;
}

export function MenuExpansibleLogo({ logo }: { children: React.ReactNode }) {
  return ;
}

export function MenuExpansibleContentHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex relative p-4">{children}</div>;
}
