const Bear = require('../models/Bear');

// Display list of all Authors.
exports.getList = (req, res) => {
    Bear.find((err, bears) => {
        if (err) {
            res.send(err);
        }
        res.json(bears);
    });
};

exports.post = (req, res) => {
    const bear = new Bear();        // create a new instance of the Bear model
    bear.name = req.body.name;      // set the bears name (comes from the request)

    // save the bear and check for errors
    bear.save((err) => {
        if (err) {
            res.send(err);
        }

        res.json({ message: 'Bear created!' });
    });
};

exports.get = (req, res) => {
    Bear.findById(req.params.bear_id, (err, bear) => {
        if (err) {
            res.send(err);
        }
        res.json(bear);
    });
};

exports.put = (req, res) => {
    Bear.findById(req.params.bear_id, (err, bear) => {
        if (err) {
            res.send(err);
        }

        bear.name = req.body.name;

        // save the bear
        bear.save((err) => {
            if (err) {
                res.send(err);
            }

            res.json({ message: 'Bear updated!' });
        });
    });
};

exports.delete = (req, res) => {
    Bear.remove({
        _id: req.params.bear_id,
    }, (err) => {
        if (err) {
            res.json(err);
        }

        res.json({ message: 'Successfully deleted' });
    });
};
