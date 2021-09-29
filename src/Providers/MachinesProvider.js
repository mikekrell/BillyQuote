import {useState, createContext, useEffect} from 'react'
import machines from '../models/db'

export const MachinesContext = createContext();
export const MachinesProvider = (props) => {
    const [machineList, setMachines] = useState([...machines])

    const getMachineBase = (machine) => {
        const baseMachine = machine.base_machines.filter(base => base.default == true)
        return baseMachine[0].cost;
    }

    return (
        <MachinesContext.Provider value={[machineList, setMachines, getMachineBase]}>
            {props.children}
        </MachinesContext.Provider>
    )
}
