import Link from 'next/link'
import React from 'react'
import styles from './navbar.module.css'

function Navbar() {
  return (
    <nav className={styles.container}>
      <Link className={styles.logo} href="/">Electronic-repair-revamp</Link>
      <div className={styles.links}>
        <Link href="/about">About</Link>
        <Link href="/repair">Repair</Link>
        <Link href="/sell">Sell</Link>
        <Link href="/dashboard/status">Status</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </nav>
  )
}

export default Navbar
