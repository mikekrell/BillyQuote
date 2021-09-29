import {useState, useEffect, useContext, useRef} from 'react'
import {LedgerContext} from './Providers/LedgerProvider'
import {MachinesContext} from './Providers/MachinesProvider'
import { MachineEditContext} from './Providers/MachineEditProvider';

function Ledger(props) {

    const [ledger, setLedger, removeItem] = useContext(LedgerContext)
    const [machineList, setMachines, getMachineBase] = useContext(MachinesContext);
    const [machine, setMachine] = useContext(MachineEditContext)
    const [ledgerTotal, setLedgerTotal] = useState(0)
    const [tax, setTax] = useState(6)
    const [withFinance, setWithFinance] = useState(false)
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    })

    useEffect(()=>{
        let total = 0
        if (ledger.length>0) {
            setLedgerTotal( ledger.reduce((acc, item) => acc + (((item.total.total + item.total.margin) * item.qty) ), 0) )
        }else {
            setLedgerTotal(0)
        }
    }, [ledger])

    const removeLedgerItem = (ledgerItem) => {
        removeItem(ledgerItem)
    }

    const totalPlusTax = () => {
        const getPreTax = withFinance ? plusFinancing() : ledgerTotal
        const taxed = (getPreTax * (parseFloat(tax) / 100)) + getPreTax;
        return parseInt(taxed);
    }

    const plusFinancing = () => {
        const getTax = (ledgerTotal * (parseFloat(3) / 100)) + ledgerTotal
        return parseInt(getTax);
    }

    const financeCheckhandler = (e) => {
        setWithFinance(e.target.checked)
    }

    return (
        <div className="col-span-12 lg:col-span-4">
            <div className="intro-y pr-1">
                <div className="box p-2">
                    <div className="pos__tabs nav-tabs justify-center flex"> <a className="flex-1 py-2 rounded-md text-center active">Quote Ledger</a></div>
                </div>
            </div>
            <div className="pos__ticket box p-2 mt-5">
                {ledger.length > 0 ? 
                    ledger.map((item,index) => (
                        <a key={index} onClick={() => removeLedgerItem(item)}  data-toggle="modal" data-target="#add-item-modal" className="flex items-center p-3 cursor-pointer transition duration-300 ease-in-out bg-white dark:bg-dark-3 hover:bg-gray-200 dark:hover:bg-dark-1 rounded-md intro-x" >
                        <div className="pos__ticket__item-name truncate mr-1">{item.name}</div>
                        <div className="text-gray-600">x {item.qty}</div>
                        <div className="text-gray-600 ml-2 font-sm">({formatter.format(item.total.margin * item.qty)})</div>
                        <i data-feather="edit" className="w-4 h-4 text-gray-600 ml-2"></i>
                        <div className="ml-auto">
                                {formatter.format((item.total.total + item.total.margin) * item.qty)}
                        </div>
                    </a>
                ))
                : <p className="ml-2"> No Items</p>
            }
            </div>
            <div className="box p-5 mt-5">
                <div className="flex">
                    <div className="mr-auto">Subtotal</div>
                    <div>{formatter.format(ledgerTotal)}</div>
                </div>
                <div className="flex mt-4">
                    <div className="mr-auto" style={{alignSelf: 'center'}}>Tax %</div>
                    <div>
                        <input onChange={(e)=>setTax(parseFloat(e.target.value))} type="number" style={{ width: "80px" }} defaultValue={tax} min="1" max="100" step=".01" className="input border col-span-4" />
                    </div>
                </div>
                <div className="flex mt-4">
                    <div className="mr-auto">With Financing ( 3% )</div>
                    <div><input onChange={ (e)=> financeCheckhandler(e)} checked={withFinance} className="input input--switch border" type="checkbox"/></div>
                </div>
                <div className="flex mt-4 pt-4 border-t border-gray-200 dark:border-dark-5">
                    <div className="mr-auto font-medium text-base">Quote</div>
                    <div className="font-medium text-base">{totalPlusTax() ? formatter.format(totalPlusTax()) : formatter.format(0)}</div>
                </div>
            </div>
            <div className="flex mt-5">
                <button className="button w-32 border border-gray-400 dark:border-dark-5 text-gray-600 dark:text-gray-300">Clear Items</button>
                <button className="button w-32 text-white bg-theme-1 shadow-md ml-auto">Send Quote</button>
            </div>
        </div>
    )
}

export default Ledger
