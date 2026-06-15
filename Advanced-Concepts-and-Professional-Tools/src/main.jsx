import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './assignments/8-context-api/ThemeContext.jsx'
import { store } from './assignments/10-redux-toolkit-basics/app/store.js'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(

  <ThemeProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>

)
