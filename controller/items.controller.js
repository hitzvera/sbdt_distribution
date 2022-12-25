const item1 = require("../sbdt/models").Item;
const item2 = require("../sbdt-2/models").Item;
const getAllItems = async (req, res) => {
  try {
    const items = await item1.findAll();
    const items2 = await item2.findAll();
    return res.json(items.concat(items2));
  } catch (error) {
    return res.json({ error: "awodk" });
  }
};

const addItem = async (req, res) => {
  // sorting berdasarkan rentang harga
  const { name, description, price } = req.body;
  try {
    if (price <= 500000) {
      const newItem = await item1.create({
        name,
        description,
        price,
      });
      return res
        .status(201)
        .json({ success: "Success create new item", newItem });
    } else {
      const newItem = await item2.create({
        name,
        description,
        price,
      });
      return res
        .status(201)
        .json({ success: "Success create new item", newItem });
    }
  } catch (error) {
    console.log(err);
    return res
      .status(500)
      .json({ error: true, message: "failed to create a new item", err });
  }
};

const getItemById = async (req, res) => {
  const itemId = req.params.itemId;
  try {
    const item = await item1.findOne({
      where: {
        uuid: itemId,
      },
    });
    if (item === null) {
      try {
        const mItem2 = await item2.findOne({
          where: {
            uuid: itemId,
          },
        });
        return res.json({ success: true, result: mItem2 });
      } catch (error) {
        return res.json({ success: false, message: error });
      }
    }
    return res.json({ success: true, result: item });
  } catch (error) {
    return res.json({success: false, message: error})
  }
};

const editItemById = async (req, res) => {
  const itemId = req.params.itemId;
  const { name, description, price } = req.body;
  try {
    const item = await item1.update(
      {
        name,
        description,
        price,
      },
      {
        where: {
          uuid: itemId,
        },
      }
    );
    if (item[0] === 0) {
      try {
        const mItem2 = await item2.update(
          {
            name,
            description,
            price,
          },
          {
            where: {
              uuid: itemId,
            },
          }
        );
        return res.json({ success: true, result: mItem2 });
      } catch (error) {
        return res.json({ success: false, error });
      }
    }
    return res.json({ success: true, result: item });
  } catch (error) {
    return res.json(error);
  }
};

const deleteItem = async (req, res) => {
  const itemId = req.params.itemId;
  try {
    const isDestroyed = await item1.destroy({
      where: {
        uuid: itemId,
      },
    });
    if (isDestroyed === 0) {
      try {
        const mItem2 = await item2.destroy({
          where: {
            uuid: itemId,
          },
        });
        return res.json({ success: true, result: mItem2 });
      } catch (error) {
        return res.json({ success: false, error });
      }
    }
    return res.json({ success: true, message: isDestroyed });
  } catch (error) {
    return res.json({ success: false, from: "database1", message: error });
  }
};
module.exports = {
  getAllItems,
  addItem,
  getItemById,
  editItemById,
  deleteItem,
};
