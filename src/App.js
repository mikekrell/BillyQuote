import {useState, useEffect} from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar'
import POS from './POS'
import Modal from './Modal'
import { MachinesProvider} from './Providers/MachinesProvider'
import { MachineEditProvider } from './Providers/MachineEditProvider'
import { LedgerProvider } from './Providers/LedgerProvider'
import './app.css';

function App() {
  const [darkmode,setDarkmode] = useState(false) 
  useEffect(()=>{
    if (darkmode) {
      document.getElementsByTagName('html')[0].classList.add('dark')
    } else {
      document.getElementsByTagName('html')[0].classList.remove('dark')
    }
  }, [darkmode])

  return (
    <div className="App">
      <MachinesProvider>
        
        <LedgerProvider>
        <MachineEditProvider>
          <Modal></Modal>
        <div className="flex">
          <Sidebar />
          <div className="content">
            <TopBar />
            <div className="intro-y flex flex-col sm:flex-row items-center mt-8">
              <h2 className="text-lg font-medium mr-auto">
                Quote Builder
              </h2>
              <div className="w-full sm:w-auto flex mt-4 sm:mt-0">
                <a data-toggle="modal" data-target="#new-order-modal" className="button text-white bg-theme-1 shadow-md mr-2">New Quote</a>
              </div>
            </div>
                <POS />
          </div>
        </div>
        </MachineEditProvider>
        </LedgerProvider>
      </MachinesProvider>
      <div data-url="side-menu-dark-dashboard.html" class="dark-mode-switcher cursor-pointer shadow-md fixed bottom-0 right-0 box dark:bg-dark-2 border rounded-full w-40 h-12 flex items-center justify-center z-50 mb-10 mr-10">
        <div class="mr-4 text-gray-700 dark:text-gray-300">Dark Mode</div>
        <div class={!darkmode ? "dark-mode-switcher__toggle border" : "dark-mode-switcher__toggle border dark-mode-switcher__toggle--active"} onClick={()=>setDarkmode(!darkmode)}></div>
      </div>
    </div>
  );
}

export default App;
