import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Navigation } from './components/Navigation';
import { Home } from './routes/Home'
import { SellItem } from './routes/SellItem'

function App() {
  return (
    <div className='grid max-w-screen max-h-screen font-rubik'>
      <Navigation />

      <div className='m-6'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/sell-item' element={<SellItem />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
