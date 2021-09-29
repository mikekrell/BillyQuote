export const subTotal = (machine) => {
    let totalObj = {}
    totalObj.total = baseMachinePrice(machine) + trackShoePrice(machine) + boomPrice(machine) + armPrice(machine) + optionsPrice(machine) + attachmentsPrice(machine) + shippingCost(machine) + installationCost(machine)
    totalObj.margin = parseInt((totalObj.total / ((100 - machine.margin) / 100)) - totalObj.total)
    return totalObj
}

const baseMachinePrice = (machine) => {
    const baseMachine = machine.base_machines.filter(base => base.default == true)
    return baseMachine[0].cost;
}

const trackShoePrice = (machine) => {
    const trackShoes = machine.track_shoes.filter(base => base.default == true);
    return trackShoes[0].cost
}

const boomPrice = (machine) => {
    const boom = machine.excavator_boom.filter(base => base.default == true);
    return boom[0].cost
}

const armPrice = (machine) => {
    const arm = machine.excavator_arm.filter(base => base.default == true);
    return arm[0].cost
}

const optionsPrice = (machine) => {
    const options = machine.options.filter(op => op.selected);

    if (options.length > 0) {
        return options.reduce((acc, option) => acc + option.cost, 0)
    }
    return 0;
}

const attachmentsPrice = (machine) => {

    const attch = machine.attachments.filter(atch => atch.selected);

    if (attch.length > 0) {
        //console.log(attch.reduce((acc, att) => acc + att.cost, 0))
        return attch.reduce((acc, att) => acc + att.cost, 0)
    }

    return 0;
}

const shippingCost = (machine) => {
    return Number.isInteger(machine.shipping) ? machine.shipping : 0
}

const installationCost = (machine) => {
    return Number.isInteger(machine.installation) ? machine.installation : 0
}
