
const transactionDb1 = require('../sbdt/models').Transaction
const transactionDb2 = require('../sbdt-2/models').Transaction

const getAllTransactions = async(req,res) => {
    try {   
        const transaction1 = await transactionDb1.findAll()
        const transaction2 = await transactionDb2.findAll()
        return res.json(transaction1.concat(transaction2))
    } catch (error) {
        console.log(error)
        return res.json({success: false, error})
    }
}

const getTransactionByUserId = async(req,res) => {
    const userId = req.params.userId
    try {
        const transactions = await transactionDb1.findAll({where: {userId}})
        const transactions2 = await transactionDb2.findAll({where: {userId}})
        return res.json(transactions.concat(transactions2))
    } catch (error) {
        console.log(error)
        return res.json({success: true, error})
    }
}

const getTransactionByItsId = async(req,res) => {
    const transactionId = req.params.transactionId
    console.log(transactionId)
    try {
        const transaction = await transactionDb1.findOne({where: {uuid: transactionId}})
        const transaction2 = await transactionDb2.findOne({where: {uuid: transactionId}})
        return res.json({success: true, result: transaction || transaction2})
    } catch (error) {
        console.log(error)
        return res.json({success: false, error})
    }
}

module.exports = {
    getAllTransactions,
    getTransactionByItsId,
    getTransactionByUserId
}