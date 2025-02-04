import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { DataProvider } from './storage/DataContext.tsx'
createRoot(document.getElementById('root')!).render(
    <DataProvider>
      <App />
    </DataProvider>

)
