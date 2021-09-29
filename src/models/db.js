const machines = [{
    type: 'machine',
    name: 'SK25SR-6E',
    manufacture: "Kobelco",
    imageUrl: 'https://www.farmersequip.com/assets/Uploads/Kobelco-SK25SR-6E-min.jpg',
    engine: {
        make: "YANMAR 3TNV80F-SXNBV (Tier 4 Compliant)",
        horsepower: `19.7 hp {14.7 kW} / 2,500 RPM (SAE NET)`,
        torque: `48.2 lb-ft {63.9 N・m} / 1,800 RPM (SAE NET)`,
    },
    base_machines: [
        {
            name: 'Base Machine with FOPS/ROPS Canopy & Dozer Blade',
            default: true,
            cost: 42550,
            code: 'SK25SRR'
        },
        {
            name: 'Base Machine with FOPS/ROPS Cab w Heater & Dozer Blade',
            default: false,
            cost: 46500,
            code: 'SK25SRC'
        }
    ],
    track_shoes: [
        {
            name: 'Rubber Tracks 9.05"',
            cost: 0,
            code: '2-13',
            default: true
        }
    ],
    excavator_boom: [
        {
            name: 'Standard Mono Boom',
            cost: 0,
            code: '3-01',
            default: true
        }
    ],
    excavator_arm: [
        {
            name: 'Standard Arm w/Bucket Cylinder',
            cost: 0,
            code: '4-05',
            default: true
        }
    ],
    options: [
        {
            name: 'Auto Decal',
            cost: 740,
            code: '9-50',
            selected: false
        }
    ],
    attachments: [
        {
            name: 'WB 12"',
            cost: 960,
            code: '76MNHD12',
            selected: false,
        },
        {
            name: 'WB 18"',
            cost: 1065,
            code: '76MNHD18',
            selected: false,
        },
        {
            name: 'WB 24"',
            cost: 1240,
            code: '76MNHD24',
            selected: false,
        },
        {
            name: 'WB Pin Grabber Coupler',
            cost: 2160,
            code: 'SLQT-1MN',
            selected: false,
        },
        {
            name: 'WB Hydraulic D-Lock Coupler',
            cost: 5895,
            code: 'HD035-38-5394',
            selected: true,
        }
    ],
    shipping: 0,
    installation: 0,
    margin: 13
},
{
    type: 'machine',
    name: 'SK30SR-6E',
    manufacture: "Doosan",
    imageUrl: 'https://www.farmersequip.com/assets/Uploads/Kobelco-SK25SR-6E-min.jpg',
    engine: {
        make: "YANMAR 3TNV80F-SXNBV (Tier 4 Compliant)",
        horsepower: `19.7 hp {14.7 kW} / 2,500 RPM (SAE NET)`,
        torque: `48.2 lb-ft {63.9 N・m} / 1,800 RPM (SAE NET)`,
    },
    base_machines: [
        {
            name: 'Base Machine with FOPS/ROPS Canopy & Dozer Blade',
            default: false,
            cost: 45550,
            code: 'SK25SRR'
        },
        {
            name: 'Base Machine with FOPS/ROPS Cab w Heater & Dozer Blade',
            default: true,
            cost: 46500,
            code: 'SK25SRC'
        }
    ],
    track_shoes: [
        {
            name: 'Rubber Tracks 9.05"',
            cost: 0,
            code: '2-13',
            default: true
        }
    ],
    excavator_boom: [
        {
            name: 'Standard Mono Boom',
            cost: 0,
            code: '3-01',
            default: true
        }
    ],
    excavator_arm: [
        {
            name: 'Standard Arm w/Bucket Cylinder',
            cost: 0,
            code: '4-05',
            default: true
        }
    ],
    options: [
        {
            name: 'Auto Decal',
            cost: 740,
            code: '9-50',
            selected: false
        }
    ],
    attachments: [
        {
            name: 'WB 12"',
            cost: 960,
            code: '76MNHD12',
            selected: false,
        },
        {
            name: 'WB 18"',
            cost: 1065,
            code: '76MNHD18',
            selected: false,
        },
        {
            name: 'WB 24"',
            cost: 1240,
            code: '76MNHD24',
            selected: false,
        },
        {
            name: 'WB Pin Grabber Coupler',
            cost: 2160,
            code: 'SLQT-1MN',
            selected: false,
        },
        {
            name: 'WB Hydraulic D-Lock Coupler',
            cost: 5895,
            code: 'HD035-38-5394',
            selected: true,
        }
    ],
    shipping: 0,
    installation: 0,
    margin: 13
}
]

export default machines
