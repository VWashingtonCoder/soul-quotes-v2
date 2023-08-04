import { useState } from 'react';
import './App.css';
import Navbar from './front-end/components/Navbar';

function App() {
  const [page, setPage] = useState("home");

  console.log(page)
  return (
    <>
      <h1>Quotes App</h1>
      <Navbar page={page} changePage={setPage}/>
    </>
  )
}

export default App
