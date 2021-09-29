import { types } from "mobx-state-tree"

export const BaseMachine = types
    .model('BaseMachine', {
        name: '',
        default: true,
        cost: 0,
        code: ''
    })
export const TrackShoes = types
    .model('TrackShoes', {
        name: '',
        cost: 0,
        code: '',
        default: true
    })
export const ExcavatorBoom = types
    .model('ExcavatorBoom', {
        name: '',
        cost: 0,
        code: '',
        selected: true
    })
export const ExcavatorArm = types
    .model('ExcavatorArm', {
        name: '',
        cost: 0,
        code: '',
        selected: true
    })
export const Options = types
    .model('Options', {
        name: '',
        cost: 0,
        code: '',
        selected: true
    })
export const Attachments = types
    .model('Attachments', {
        id: types.identifier,
        name: '',
        cost: 0,
        code: '',
        selected: true
    })

export const Machine = types
    .model('Machine', {
        type: types.string,
        name: types.string,
        id: types.identifier,
        manufacture: types.string,
        imageUrl: types.string,
        base_machines: types.array(BaseMachine),
        track_shoes: types.array(TrackShoes),
        excavator_boom: types.array(ExcavatorBoom),
        excavator_arm: types.array(ExcavatorArm),
        options: types.array(Options),
        attachments: types.array(Attachments),
    })
    .views(self=>({
        getDefaultCost() {
            const baseMachine = self.base_machines.filter(base => base.default == true)
            return baseMachine[0].cost;
        }
    }))

export const LedgerItem = types
    .model('LedgerItem', {
        qty: 0,
        item: types.union(Machine, Attachments)
    })
    .views(self=>({
        total() {
            return self.item.cost * self.qty
        }
    }))

export const MachineStore = types
    .model('MachineStore', {
        machines: types.array(Machine, [])
    })
    .actions(self => ({
        addMachine(machine) {
            self.machines = [...self.machines, machine];
        } 
    }
    ))

export const Ledger = types
    .model('Ledger', {
        items: types.array(LedgerItem, [])
    })
    .actions(self => ({
        addItem(ledgerItem) { self.items = [...self.items, ledgerItem] } 
    }))
    .views( self => ({
        getTotal() {
            return 0
        }
    }))

export const MachineModal = types
    .model("MachineModal", {
        machine: types.maybe(Machine, {})
    })
    .actions( self => ({
        loadMachine (machine) {
            self.machine = machine
        },
    }))




