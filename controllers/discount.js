const Discount = require('../models/discountSchema');

getdiscountDetails = function (req, res) {
    Discount.find().then(function (discounts) {
        res.json(discounts);
    });
}
deleteCoupon = function (req, res) {
    console.log('delete discount');
    console.log(req.params._coupon);
    Discount.remove({ referralCode: req.params._coupon }, function (err, doc) {
        if (err)
            res.status(404).send(err);
        res.status(200).send(doc);
    });
}
module.exports = {
    getdiscountDetails,
    deleteCoupon
}