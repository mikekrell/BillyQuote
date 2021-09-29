
import { useContext } from "react";
import { MachinesContext } from "./Providers/MachinesProvider"
import { MachineEditContext } from './Providers/MachineEditProvider'
import { getDefaultNormalizer } from "@testing-library/react";

function ItemTable(props) {
    const [machineList, setMachines, getMachineBase] = useContext(MachinesContext);
    const [machine, setMachine] = useContext(MachineEditContext);
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    })

    const itemClickHandler = (e, item) => {
        setMachine({...item})
    }

    const removeClickHandler = (e, item) => {
        const machList = [...machineList];
        setMachines(machList.filter(mach=>mach.id !== item.id))
    }

    return (
        <div className="col-span-12 overflow-auto lg:overflow-visible mt-10">
            <table className="table table-report -mt-2">
                <thead>
                    <tr>
                        <th className="whitespace-no-wrap">IMAGES</th>
                        <th className="whitespace-no-wrap">PRODUCT NAME</th>
                        <th className="text-right whitespace-no-wrap">BASE PRICE</th>
                        <th className="text-center whitespace-no-wrap">ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        machineList.map((mach, index) => (
                            <tr className="intro-x" key={index}>
                                <td className="w-20">
                                    <div className="flex">
                                        <div className="w-10 h-10 image-fit zoom-in">
                                            <img alt={mach.name} className="tooltip rounded-full" src={mach.imageUrl} title={mach.name}/>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <a href="" className="text-xl font-medium whitespace-no-wrap">{mach.name}</a>
                                    <div className="text-gray-600 text-m whitespace-no-wrap">{mach.manufacture}</div>
                                </td>
                                <td className="text-right text-xl">{mach.type == "custom" ? formatter.format(mach.total.total) : formatter.format(getMachineBase(mach))}</td>
                                <td className="table-report__action w-56">
                                    <div className="flex justify-center items-center">
                                        {mach.type == "custom" ? <a onClick={(e) => removeClickHandler(e, mach)} style={{ width: '100px' }} className="button text-white bg-theme-6 shadow-md mr-2" href="javascript:;" > <i data-feather="trash-2" className="w-4 h-4"></i>Remove</a> : null}
                                        <a onClick={(e) => itemClickHandler(e, mach)} style={{width:'100px'}} className="button text-white bg-theme-1 shadow-md mr-2" href="javascript:;" > <i data-feather="trash-2" className="w-4 h-4"></i>Add</a>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

        </div>
    )
}

export default ItemTable;
