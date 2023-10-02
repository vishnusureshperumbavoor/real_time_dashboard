import Image from 'next/image'
import styles from './page.module.css'
import Dashboard from './Dashboard/Dashboard'

export default function Home() {
  const mainStyle = {
    padding: 0, 
  };

  return (
    <main className={styles.main} style={mainStyle}>
      <Dashboard/>
    </main>
  )
}
