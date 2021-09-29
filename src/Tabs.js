function Tabs() {
    const tabs = [
        {
            name: 'Machines',
            active: false
        },
        {
            name: 'Thumbs',
            active: false
        },
        {
            name: 'Buckets',
            active: false
        },
        {
            name: 'Add-ons',
            active: false
        },
    ]
    return (
        <div className="grid grid-cols-12 gap-5 mt-5">
            {
                tabs.map((tab, index)=>
                    (<div key={index} className="col-span-12 sm:col-span-4 xxl:col-span-3 box p-5 cursor-pointer zoom-in">
                        <div className="font-medium text-base">{tab.name}</div>
                    </div>)
                )
            }

        </div>
    )
}

export default Tabs;
