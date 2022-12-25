const userDb1 = require("../sbdt/models").User;
const userDb2 = require("../sbdt-2/models").User;

const transaction1 = require("../sbdt/models").Transaction;
const transaction2 = require("../sbdt-2/models").Transaction;

const item1 = require("../sbdt/models").Item;
const item2 = require("../sbdt-2/models").Item;

const getAllUser = async (req, res) => {
  try {
    const user1 = await userDb1.findAll();
    const user2 = await userDb2.findAll();
    return res.json({ success: true, result: user1.concat(user2) });
  } catch (error) {
    return res.json({ success: false, error });
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.userId;
  try {
    const item = await userDb1.findOne({
      where: {
        uuid: userId,
      },
    });
    if (item === null) {
      try {
        const mItem2 = await userDb2.findOne({
          where: {
            uuid: userId,
          },
        });
        return res.json({ success: true, result: mItem2 });
      } catch (error) {
        return res.json({ success: false, message: error });
      }
    }
    return res.json({ success: true, result: item });
  } catch (error) {
    return res.json({ success: false, message: error });
  }
};

const addUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  if (role === "user") {
    try {
      const user1 = await userDb1.create({
        name,
        email,
        password,
        role,
      });
      return res.status(201).json({
        error: false,
        message: "user has been created",
        user1,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        error: true,
        message: error.errors[0].message,
      });
    }
  } else {
    try {
      const user2 = await userDb2.create({
        name,
        email,
        password,
        role,
      });
      return res.json({ success: true, message: user2 });
    } catch (error) {
      console.log(error);
      return res.json({ success: false, error });
    }
  }
};

const checkout = async (req, res) => {
  const { total_price, destination, userId } = req.body;
  if (total_price <= 500000) {
    try {
      const transaction = await transaction1.create({
        userId,
        total_price,
        kode_bayar:
          new Date().getTime().toString(36) +
          Math.random().toString(36).slice(2),
        status: "pending",
        destination,
      });
      const item = await item1.findAll({
        where: { id: 1 },
      });
      await transaction.addItem(item);
      const result = await transaction1.findOne({
        where: { uuid: transaction.uuid },
        include: ["items"],
      });
      return res.status(201).json({
        error: false,
        message: "success create transaction",
        result,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: true,
        message: err,
      });
    }
  } else {
    try {
      const transaction = await transaction2.create({
        userId,
        total_price,
        kode_bayar:
          new Date().getTime().toString(36) +
          Math.random().toString(36).slice(2),
        status: "pending",
        destination,
      });
      const item = await item1.findAll({
        where: { id: 1 },
      });
      await transaction.addItem(item);
      const result = await transaction2.findOne({
        where: { uuid: transaction.uuid },
        include: ["items"],
      });
      return res.status(201).json({
        error: false,
        message: "success create transaction",
        result,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: true,
        message: err,
      });
    }
  }
};

const payment = async (req, res) => {
  const transactionId = req.params.transactionId;
  try {
    const transaction = await transaction1.update(
      {
        status: "paid",
      },
      {
        where: { uuid: transactionId },
      }
    );
    return res.json({
      success: true,
      message: "thank you transaction has been paid",
      transaction,
    });
  } catch (error) {
    console.log(error);
    return res.json({ error: true, message: "payment failed" });
  }
};

const editUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const userId = req.params.userId;
  try {
    if (role === "user") {
      const user = await userDb1.update(
        {
          name,
          email,
          password,
        },
        {
          where: { uuid: userId },
        }
      );
      if (user[0] === 1)
        return res.json({ error: false, message: "success update the data" });
      return res.json({ error: false, message: "nothing is updated" });
    } else {
      const user = await userDb2.update(
        {
          name,
          email,
          password,
        },
        {
          where: { uuid: userId },
        }
      );
      if (user[0] === 1)
        return res.json({ error: false, message: "success update the data" });
      return res.json({ error: false, message: "nothing is updated" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: true,
      message: "failed edit the data",
      errorMessage: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.userId;
  console.log(userId)
  try {
    const isDeleted = await userDb1.destroy({where: {uuid: userId}})
    if(isDeleted === 0){
        try {
            const isDeleted2 = await userDb2.destroy({where: {uuid: userId}})
            if(isDeleted2 === 0){
                return res.json({success: true, result: "not data found"})
            }
            return res.json({success: true, result: isDeleted2})
        } catch (error) {
            return res.json({success: false, error})
        }
    }
    return res.json({success: true, result: isDeleted})
  } catch (error) {
    return res.json({ success: false, message: error });
  }
};

module.exports = {
  getAllUser,
  addUser,
  getUserById,
  checkout,
  payment,
  editUser,
  deleteUser,
};
