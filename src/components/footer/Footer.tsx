import React from 'react'
import Link from 'next/link';
import styles from './footer.module.css'

function Footer() {
  const todaysYear:string = new Date().getFullYear().toString();

  return (
    <div className={styles.footerContainer}>
      <hr className={styles.line} />
      <div className={styles.footerList}>
        <Link href="/careers">Careers</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </div>
      ©{todaysYear} Electronic-repair-revamp. All Rights Reserved
    </div>
  )
}

export default Footer
