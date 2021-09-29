
import {useEffect, useContext, useState, useRef} from "react"
import { v4 as uuidv4 } from 'uuid'
import { MachinesContext } from './Providers/MachinesProvider'
import { MachineEditContext } from "./Providers/MachineEditProvider"
import { LedgerContext } from './Providers/LedgerProvider'
import ModalTotal from './ModalTotal'
import { subTotal } from './util/machineCalc'

function Modal(props) {
    const [machineList, setMachines] = useContext(MachinesContext)
    const [ machine, setMachine] = useContext(MachineEditContext);
    const [ledger, setLedger, removeItem, addItem] = useContext(LedgerContext)
    const [localMachine, setLocalMachine] = useState(false)

    const shippingCost = useRef(null);
    const installCost = useRef(null);
    const margin = useRef(null);
    const qty = useRef(null)

    useEffect(() => {
        if (machine) {
            machine.total = subTotal(machine);
            setLocalMachine(JSON.parse(JSON.stringify({ ...machine, qty: machine.qty ? machine.qty : 1 })))
        }
    }, [machine])

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    })

    function selectBaseOptions(event, item) {
        let mach = {...localMachine};
        mach.base_machines.map(item=>{
            debugger;
        })
    }

    function selectOptions(e, item) {
        let mach = {...localMachine}
        mach.options.map(option=>{
            if (option.code == item.code) {
                option.selected = e.target.checked
            }
        })
        mach.total = subTotal(mach);
        setLocalMachine(mach)
    }

    function selectAttachments(e, item) {
        let mach = { ...localMachine }
        mach.attachments.map(attachment => {
            if (attachment.code == item.code) {
                attachment.selected = e.target.checked
            }
        })
        mach.total = subTotal(mach);
        setLocalMachine(mach)
    }

    const getMachineBase = (machine) => {
        const baseMachine = machine.base_machines.filter(base => base.default == true)
        return baseMachine[0].cost;
    }

    const toggleModal = () => {
        setLocalMachine(false)
        setMachine(false)
    }

    const qtyClickHandler = (item) => {
        item.total = subTotal(item);
        setLocalMachine(item);
    }

    const marginClickHandler = (item) => {
        item.total = subTotal(item);
        setLocalMachine(item)
    }

    const addMachine = () => {
        addItem(localMachine);
        setLocalMachine(false)
        setMachine(false)
    }

    const saveMachine = () => {
        //copy local machine
        const mach = {...localMachine}
        mach.qty = 1;
        if (mach.type === "custom") {
            let machList = [...machineList]
            let newMachList = []
            machList.map(mach1=>{
                if (mach1.id == mach.id){
                    mach1 = mach
                }
                newMachList.push(mach1)
            })
            setMachines(newMachList)
        }else {
            mach.type = "custom";
            mach.total = subTotal(mach)
            mach.id = uuidv4()
            setMachines([...machineList, mach])
        }
        
        setLocalMachine(false)
    }


    const onShippingChange = () => {
        const mach = { ...localMachine }
        mach.shipping = parseInt(shippingCost.current.value)
        mach.total = subTotal(mach);
        setLocalMachine(mach)
    }

    const onInstallationChange = () => {
        const mach = { ...localMachine }
        mach.installation = parseInt(installCost.current.value)
        mach.total = subTotal(mach);
        setLocalMachine(mach)
    }

    return (
        localMachine ? 
            <div className={localMachine ? "modal show" : "modal"} id="new-order-modal">
                <div style={{ width: "1000px" }} className="modal__content modal__content--xl p-5">
                <div className="flex items-center px-5 py-5 sm:py-3 border-b border-gray-200 dark:border-dark-5">
                    <h2 className="font-medium text-base mr-auto">
                        {localMachine.name}
                    </h2>
                    <h2>
                        {localMachine.manufacture}
                    </h2>
                </div>
                <div className="container flex flex-row">
                    <div className="flex flex-col mt-5">
                        <div className="flex flex-col sm:flex-row items-center mt-5">
                            <label className="w-full sm:w-40 sm:text-right sm:mr-5 font-medium">Engine</label>
                            <div className="flex flex-col mt-5">
                                <p className="w-full flex-1" >{localMachine.engine.make}</p>
                                <p className="w-full flex-1" >{localMachine.engine.horsepower}</p>
                                <p className="w-full flex-1" >{localMachine.engine.torque}</p>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center mt-5">
                            <label className="w-full sm:w-40 sm:text-right sm:mr-5 font-medium">Base Machine</label>
                                <div style={{width: "370px", paddingRight: "15px"}}>
                                {localMachine.base_machines.map((lmachine, index) => (
                                    <div key={index} className="flex items-center text-gray-700 dark:text-gray-500 mt-2"> <input type="radio" name="base-machine-radio" value={lmachine.code} defaultChecked={lmachine.default} className="input border mr-2" id="vertical-checkbox-chris-evans" onChange={(event) => selectBaseOptions(event, lmachine)} /> <label className="cursor-pointer select-none" htmlFor="vertical-checkbox-chris-evans">{lmachine.name} - <strong>{formatter.format(getMachineBase(localMachine))}</strong></label> </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center mt-5">
                            <label className="w-full sm:w-40 sm:text-right sm:mr-5 font-medium" >Track Shoes</label>
                            <div>
                                {localMachine.track_shoes.map((shoes, index) => (
                                    <div key={index} className="flex items-center text-gray-700 dark:text-gray-500 mt-2">
                                        <input type="radio" name="track-shoes-radio" value={shoes.code} defaultChecked={shoes.default} className="input border mr-2" id="vertical-checkbox-chris-evans" /> <label className="cursor-pointer select-none" htmlFor="vertical-checkbox-chris-evans">{shoes.name} - <strong>{shoes.cost > 0 ? formatter.format(shoes.cost) : `(included)`}</strong></label> </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center mt-5">
                            <label className="w-full sm:w-40 sm:text-right sm:mr-5 font-medium">Excavator Boom</label>
                            <div>
                                {localMachine.excavator_boom.map((boom, index) => (
                                    <div key={index} className="flex items-center text-gray-700 dark:text-gray-500 mt-2"> <input type="radio" name="booms-radio" className="input border mr-2" value={boom.code} defaultChecked={boom.default} id="vertical-checkbox-chris-evans" /> <label className="cursor-pointer select-none" htmlFor="vertical-checkbox-chris-evans">{boom.name} - <strong>{boom.cost > 0 ? formatter.format(boom.cost) : `(included)`}</strong></label> </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center mt-5">
                            <label className="w-full sm:w-40 sm:text-right sm:mr-5 font-medium">Excavator Arm</label>
                            <div>
                                {localMachine.excavator_arm.map((arm, index) => (
                                    <div key={index} className="flex items-center text-gray-700 dark:text-gray-500 mt-2"> <input type="radio" name="arms-radio" className="input border mr-2" id="vertical-checkbox-chris-evans" value={arm.code} defaultChecked={arm.default} /> <label className="cursor-pointer select-none" htmlFor="vertical-checkbox-chris-evans">{arm.name} - <strong>{arm.cost > 0 ? formatter.format(arm.cost) : `(included)`}</strong></label> </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center mt-5">
                            <label className="w-full sm:w-40 sm:text-right sm:mr-5 font-medium">Options</label>
                            <div>
                                {localMachine.options.map((option, index) => (
                                    <div key={index} className="flex items-center text-gray-700 dark:text-gray-500 mt-2">
                                        <input onChange={(e) => selectOptions(e, option)} defaultChecked={option.selected} type="checkbox" name="options-checkbox" className="input border mr-2" id="vertical-checkbox-chris-evans" /> <label className="cursor-pointer select-none" htmlFor="vertical-checkbox-chris-evans">{option.name} - <strong>{option.cost > 0 ? formatter.format(option.cost) : `(included)`}</strong></label> </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center mt-5">
                            <label className="w-full sm:w-40 sm:text-right sm:mr-5 font-medium">Attachments</label>
                            <div>
                                {localMachine.attachments.map((attachment, index) => (
                                    <div key={index} className="flex items-center text-gray-700 dark:text-gray-500 mt-2">
                                        <input onChange={(e) => selectAttachments(e, attachment)} type="checkbox" defaultChecked={attachment.selected} name="options-checkbox" className="input border mr-2" id="vertical-checkbox-chris-evans" /> <label className="cursor-pointer select-none" htmlFor="vertical-checkbox-chris-evans">{attachment.name} - <strong>{attachment.cost > 0 ? formatter.format(attachment.cost) : `(included)`}</strong></label> </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center mt-5">
                            <label className="w-full sm:w-40 sm:text-right sm:mr-5 font-medium">Shipping</label>
                            <div className="relative">
                                    <div className="absolute rounded-l w-10 h-full flex items-center justify-center bg-gray-100 dark:bg-dark-1 dark:border-dark-4 border text-gray-600">$</div> <input ref={shippingCost} onChange={onShippingChange} type="text" className="input pl-12 w-full border col-span-4" placeholder="Shipping cost" defaultValue={localMachine.shipping}/>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center mt-5">
                            <label className="w-full sm:w-40 sm:text-right sm:mr-5 font-medium">Installation</label>
                            <div className="relative">
                                    <div className="absolute rounded-l w-10 h-full flex items-center justify-center bg-gray-100 dark:bg-dark-1 dark:border-dark-4 border text-gray-600">$</div> <input ref={installCost} type="text" className="input pl-12 w-full border col-span-4" placeholder="Installation cost" onChange={onInstallationChange} defaultValue={localMachine.installation}/>
                            </div>
                        </div>
                    </div>
                        <div className="intro-y flex mt-10 ml-12 item-center">
                        <div className="col-span-12 lg:col-span-4">
                            <div className="pr-1">
                                    <div className="box p-2 bg-theme-1 text-white font-medium" style={{ width: '300px' }}>
                                    <div className="pos__tabs nav-tabs justify-center flex"> <a className="flex-1 py-2 rounded-md text-center ">Machine Breakdown</a></div>
                                </div>
                            </div>
                                <ModalTotal marginClickHandler={marginClickHandler} qtyClickHandler={qtyClickHandler} total={localMachine.total} item={localMachine}></ModalTotal>
                        </div>
                    </div>
                </div>
                <div className="px-5 py-3 text-right border-t border-gray-200 dark:border-dark-5 mt-5">
                    <button onClick={toggleModal} type="button" data-dismiss="modal" className="button w-32 border dark:border-dark-5 text-gray-700 dark:text-gray-300 mr-1">Cancel</button>
                        <button onClick={saveMachine} type="button" className="button mr-1 w-32 bg-theme-1 text-white">Save</button>
                    <button onClick={addMachine} type="button" className="button w-32 bg-theme-1 text-white">Add</button>
                </div>
            </div>
        </div> : null
    )
}

export default Modal
