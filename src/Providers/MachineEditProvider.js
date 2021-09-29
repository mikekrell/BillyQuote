import { useState, createContext} from 'react'

export const MachineEditContext = createContext();

export const MachineEditProvider = (props) => {
    const [machine, setMachine] = useState(false);

    return (
        <MachineEditContext.Provider value={[machine, setMachine]}>
            {props.children}
        </MachineEditContext.Provider>
    )
}
