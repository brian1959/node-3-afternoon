const swag = require('../models/swag');

module.exports = {

    addSwag: (req, res, next) => {
      const { id } = req.query; 
      let {cart} =req.session.user;
      
      const index = cart.findIndex( swag => swag.id == id) ;
      const selectedSwag = swag.find(swag => swag.id ==id);

      if(index===-1) {
          cart.push(selectedSwag);
          req.session.user.total += selectedSwag.price;
      } else {
          alert(`A ${selectedSwag.title} is already in your cart.`)
      }

      res.status(200).send(req.session.user);
    },

    deleteSwag: (req, res, next) => {
        const { id } = req.query; 
        let {cart} =req.session.user;

        const selectedSwag = swag.find(swag => swag.id ==id);
      
        if(selectedSwag) {
            const i = cart.findIndex( swag => swag.id == id);
            cart.splice(i, 1);
            req.session.user.total -= selectedSwag.price;
        }
       
        res.status(200).send(req.session.user);
    },

    checkOut: (req, res, next) => {

        const {user} = req.session;
        user.cart = [];
        user.total = 0;

        res.status(200).send(req.session.user);

    }
}