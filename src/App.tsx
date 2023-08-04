import { useState } from 'react';
import './App.css';
import Navbar from './front-end/components/Navbar';

function App() {
  const [page, setPage] = useState("home");

  console.log(page)
  return (
    <>
      <header className='app-header'>
        <Navbar page={page} changePage={setPage}/>
      </header>
    </>
  )
}

export default App
