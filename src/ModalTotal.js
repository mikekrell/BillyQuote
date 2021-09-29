import { useEffect, useState, useRef } from "react"

function ModalTotal(props){
    // const [basePrice, setBasePrice] = useState(0);
    // const [trackShoes, setTrackShoes] = useState(0);
    // const [boom, setBoom] = useState(0);
    // const [arm, setArm] = useState(0);
    // const [options, setOptions] = useState(0);
    // const [attachments, setAttachments] = useState(0);
    // const [shipping, setShipping] = useState(0);
    // const [installation, setInstallation] = useState(0);
    const margin = useRef(null);
    const qty = useRef(null);

    const qtyClick = (item) => {
        let mech = {...item}
        mech.qty = parseInt(qty.current.value);
        props.qtyClickHandler(mech)
    }

    const marginClick = (item) => {
        let mech = { ...item }
        mech.margin = parseInt(margin.current.value);
        props.marginClickHandler(mech)
    }

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    })


    return (
        <div className="box p-5 mt-5">
            <div className="flex">
                <div className="mr-auto">Sub-Total</div>
                <div>{formatter.format(props.total.total)}</div>
            </div>
            <div className="flex mt-4">
                <div className="mr-auto flex" style={{alignSelf:"center"}}>
                    <p>Margin %</p> <p className="ml-3">({formatter.format(props.item.total.margin)})</p>
                </div>
                <div>
                    <input onChange={()=>marginClick(props.item)} ref={margin} type="number" style={{width: "70px"}} defaultValue={props.item.margin} min="0" max="100" step="1" className="input border col-span-4" />
                </div>
            </div>
            <div className="flex mt-4">
                <div className="mr-auto flex" style={{ alignSelf: "center" }}>
                    Qty
                </div>
                <div>
                    <input onChange={() => qtyClick(props.item)} ref={qty} type="number" style={{ width: "70px" }} defaultValue="1" min="1" max="100" step="1" className="input border col-span-4" />
                </div>
            </div>
            <div className="flex mt-4 pt-4 border-t border-gray-200 dark:border-dark-5">
                <div className="mr-auto font-medium text-base">Quote</div>
                <div className="font-medium text-base">{formatter.format((props.total.total + props.total.margin) * props.item.qty)}</div>
            </div>
        </div>
    )
}

export default ModalTotal
