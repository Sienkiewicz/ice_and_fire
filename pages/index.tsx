import { MainLayout } from '../layouts/MainLayout'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <MainLayout title='Home page'>
      <div className={styles.grid}>
        <Link href='/characters'>
          <a className={styles.card}>
            <h3>Characters</h3>
            <p>Find every characters from movies or books</p>
          </a>
        </Link>
      </div>
    </MainLayout>
  )
}
