addLayer("n1", {
    name: "Class -1", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C-1", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#BBBBBB",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "wins", // Name of prestige currency
    baseResource: "skill", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('n1', 13)) mult = mult.times(upgradeEffect('n1', 13))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},

    upgrades: {
        11: {
            title: "The First Difficulty I",
            description: "Start gaining Skill.",
            cost: new Decimal(1),
        },

        12: {
            title: "The First Difficulty II",
            description: "2x Skill gain.",
            cost: new Decimal(2),
        },

        13: {
            title: "The First Difficulty III",
            description: "Skill boosts itself.",
            cost: new Decimal(3),
            effect() {
                return Decimal.log10(player.points.add(20)).pow(0.9);
            }
        },
    }
})
