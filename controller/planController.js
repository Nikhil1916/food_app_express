const planModel = require("../models/planModel");
module.exports.getAllPlans = async function (req, res) {
  try {
    const allPlans = await planModel.find();
    if (!allPlans.length) {
      res.json({
        msg: "no plans found"
      })
    }
    res.json({
      msg: "plan list",
      allPlans
    })
  } catch (err) {
    res.json({
      err: err
    })
  }
}

module.exports.getPlan = async function (req, res) {
  try {
    let id = req.params.id;
    const plan = await planModel.findById(id);
    if (plan) {
      res.json({
        msg: "plan found",
        plan
      })
    } else {
      res.json({
        msg: "no plan found"
      })
    }
  } catch (err) {
    res.json({
      msg: err.message
    })
  }
}

module.exports.createPlan = async function (req, res) {
  try {
    const plan = req.body;
    const planCreate = await planModel.create(plan);
    res.json({
      msg: "plan created",
      planCreate
    })

  } catch (err) {
    res.json({
      err: err.message
    })
  }
}

module.exports.updatePlan = async function (req, res) {
  try {
    const id = req.params.id;
    const dataToBeUpdated = req.body;
    let keys = [];
    for (let key in dataToBeUpdated) {
      keys.push(key);
    }
    const plan = await planModel.findById(id);
    for (let i = 0; i < keys.length; i++) {
      plan[keys[i]] = dataToBeUpdated[keys[i]];
    }
    await plan.save();
    res.json({
      msg: "plan updated",
      plan
    })
  } catch (err) {
    res.json({
      msg: err.message
    })
  }
}

module.exports.deletePlan = async function (req, res) {
  let id = req.params.id;
  try {
    let plan = await planModel.findByIdAndDelete(id);
    if (plan) {
      res.json({
        message: "plan deleted",
        query: req.params.id
      });
    } else {
      res.json({
        msg: "plan not there in db"
      })
    }
  } catch (err) {
    res.json({
      err: err.message
    })
  }
}

module.exports.top3Plans = async function (req, res) {
  try {
    const plans = await planModel.find().sort({ ratingsAverage: -1 }).limit(3);
    res.json({
      msg: 'top 3 acc. to rating average',
      plans
    })
  } catch (err) {
    res.json({
      msg: err.message
    })
  }
}
