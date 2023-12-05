import React from 'react'
import style from './Home.module.css'

export default function Home() {
  return (
    <div className={style.home} style={{ background: ` url('images/homepage.webp')` }}>
      <div className={style.hometext}>
        <div>
          <h1> أهلا بكم في تجربة مثيرة في عالم النبات</h1>
          <p>
            في هذه الرحلة، ستكتشفون عجائب وتنوع عالم النباتات وسحر الطبيعة,هيا بنا </p>
        </div>
      </div>
    </div>
  )
}
