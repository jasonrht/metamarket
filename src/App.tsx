import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Navigation } from './components/Navigation';
import { Home } from './routes/Home'
import { SellItem } from './routes/SellItem'
import { MyPurchases } from './routes/MyPurchases';
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='grid max-w-screen max-h-screen font-rubik'>
        <Navigation />

        <div className='m-6'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/sell-item' element={<SellItem />} />
            <Route path='/my-purchases' element={<MyPurchases />} />
          </Routes>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
