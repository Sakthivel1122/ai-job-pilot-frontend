"use client";

import React from "react";
import Link from "next/link";
import { IoCloseOutline } from "react-icons/io5";
import styles from "./sidebar.module.scss";
import { TSidebarNavItem } from "@/types/sidebar";

export interface ISidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: TSidebarNavItem[];
  activePath?: string;
  side?: "left" | "right";
  className?: string;
  onItemClick?: (item: TSidebarNavItem) => void;
}

const Sidebar: React.FC<ISidebarProps> = ({
  isOpen,
  onClose,
  items,
  activePath = "",
  side = "right",
  className = "",
  onItemClick,
}) => {
  const handleItemClick = (item: TSidebarNavItem) => {
    onItemClick?.(item);
    onClose();
  };

  const sideClass = side === "left" ? styles.left : styles.right;

  return (
    <>
      {isOpen && (
        <div
          className={styles.Sidebar_overlay}
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={`${styles.Sidebar} ${sideClass} ${isOpen ? styles.open : ""} ${className}`}
        aria-hidden={!isOpen}
      >
        <button
          className={styles.Sidebar_close}
          onClick={onClose}
          aria-label="Close menu"
          type="button"
        >
          <IoCloseOutline />
        </button>
        <nav aria-label="Sidebar navigation">
          <ul className={styles.Sidebar_links}>
            {items.map((item) => (
              <li key={item.id}>
                <Link
                  className={`${styles.Sidebar_link} ${
                    activePath === item.link ? styles.active : ""
                  }`}
                  href={item.link}
                  onClick={() => handleItemClick(item)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
