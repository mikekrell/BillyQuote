import {useState} from 'react'
import Tabs from './Tabs'
import ItemTable from './ItemTable'
import Ledger from './Ledger'

function POS(props) {

    const [ledgerItems, setLedgerItems] = useState([]);

    const addLedgerItem = (item) => {
        item.slid = Math.floor(Math.random() * Math.floor(10000000));
        setLedgerItems([...ledgerItems, item]);
    }

    const removeLedgerItem = (slid) => {
        setLedgerItems(ledgerItems.filter(item => item.slid !== slid))
    }

    const clearLedgerItems = () => {
        setLedgerItems([])
    }

    return (
        <div className="pos intro-y grid grid-cols-12 gap-5 mt-5">
            <div className="intro-y col-span-12 lg:col-span-8">
                <div className="lg:flex intro-y">
                    <div className="relative text-gray-700 dark:text-gray-300">
                        <input type="text" className="input input--lg w-full lg:w-64 box pr-10 placeholder-theme-13" placeholder="Search item..." />
                        <i className="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0" data-feather="search"></i>
                    </div>
                </div>
                <Tabs />
                <ItemTable/>
            </div>
            <Ledger />
        </div>
    )
}

export default POS
