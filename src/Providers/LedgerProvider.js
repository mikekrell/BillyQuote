import { useState, createContext } from 'react'
import { v4 as uuidv4 } from 'uuid'
export const LedgerContext = createContext();

export const LedgerProvider = (props) => {
    const [ledger, setLedger] = useState([]);

    const removeItem = (item) => {
        setLedger(ledger.filter(ledgerItem => ledgerItem.ledgerId !== item.ledgerId))
    }

    const addItem = (item) => {
        item.ledgerId = uuidv4();
        setLedger([...ledger, JSON.parse(JSON.stringify(item))])
        // const newledger = ledger.filter(ledgerItem => ledgerItem.id == item.id)
        // if (newledger.length>0) {
        //     ledger.map(ledgerItem=>{
        //         if (ledgerItem.id == item.id) {
        //             ledgerItem.qty++
        //         }
        //     })
        //     setLedger([...ledger])
        // }else {
        //     setLedger([...ledger, JSON.parse(JSON.stringify(item))])
        // }
        
    }

    return (
        <LedgerContext.Provider value={[ledger, setLedger, removeItem, addItem]}>
            {props.children}
        </LedgerContext.Provider>
    )
}
