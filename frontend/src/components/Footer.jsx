import React from 'react'
import Header from './Header'

const Footer = () => {
  return (
    <footer className="footer">
      <Header />
      <section className="credits">
        Coded by <a href="https://github.com/stanislavtiryoshin/mern-todo-app">Stanislav Tiryoshin</a>
      </section>
    </footer>
  )
}

export default Footer