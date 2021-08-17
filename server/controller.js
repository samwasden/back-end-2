const houses = require('./db.json')

module.exports = {
    getHouses: (req, res) => {
        res.status(200).send(houses)
    },

    createHouse: (req, res) => {
        let { address, price, imageURL } = req.body
        let newHouse = {
            id: +houses[houses.length-1].id + 1,
            address,
            price: +price,
            imageURL
        }
        houses.push(newHouse)
        res.status(200).send(houses)
    },

    updateHouse: (req, res) => {
        let {id} = req.params;
        let {type} = req.body;

        let index = houses.findIndex(elem => elem.id === +id)

        if (houses[index].price <= 0 && type === 'minus') {
            res.status(400).send('You cannot lower the price of this unit anymore.')
        } else if (houses[index].price <= 10000 && type === 'minus') {
            houses[index].price = 0;
            res.status(200).send(houses)
        } else if (type === 'plus') {
            houses[index].price += 10000;
            res.status(200).send(houses)
        } else if (type === 'minus') {
            houses[index].price -= 10000;
            res.status(200).send(houses)
        } else {
            res.status(400).send('Something bad happened')
        }
    },

    deleteHouse: (req, res) => {
        let {id} = req.params;
        let index = houses.findIndex(elem => elem.id === +id)
        houses.splice(index, 1)
        res.status(200).send(houses);
    }


}