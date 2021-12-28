const {MongoClient,ObjectId} = require('mongodb')

const DATABASE_URL = 'mongodb+srv://DoThanhPhong:123456789abc@cluster0.e1blu.mongodb.net'
const DATABASE_NAME = 'thanhphong'

async function updateDocument(id, updateValues,collectionName){
    const dbo = await getDatabase();
    await dbo.collection(collectionName).updateOne({_id:ObjectId(id)},updateValues)
}

async function getDatabase() {
    const client = await MongoClient.connect(DATABASE_URL);
    const dbo = client.db(DATABASE_NAME);
    return dbo;
}

async function getDocumentById(id,collectionName){
    const dbo = await getDatabase()
    const result = await dbo.collection(collectionName).findOne({_id:ObjectId(id)})
    return result;
}

//vi du obj la thong tin van insert, collection: ten cua bang can insert-vd Products
async function insertToDB(obj,collectionName){
    const dbo = await getDatabase()
    const result = await dbo.collection(collectionName).insertOne(obj)
    console.log("Gia tri id moi duoc insert la: ", result.insertedId.toHexString());
}

async function findProductsByCategory(category){
    const dbo = await getDatabase()
    const result = await dbo.collection("Products").find({
        "cat": category
    }).toArray()
    return result
}

async function findProductsByProductName(name){
    const dbo = await getDatabase()
    const result = await dbo.collection("Products").find({
        "name": { $regex: new RegExp(name, 'i') }
    }).toArray()
    return result
}

async function getAll(collectionName){
    const dbo = await getDatabase()
    const result = await dbo.collection(collectionName).find({}).toArray()
    return result
}

async function deleteObject(id,collectionName){
    const dbo = await getDatabase()
    await dbo.collection(collectionName).deleteOne({_id:ObjectId(id)})
}

async function checkPrice(min,max,checkprice){
    let minNum = parseFloat(min);
    let maxNum = parseFloat(max);
    let pricecheck = parseFloat(checkprice);
    if(isNaN(minNum) || isNaN(maxNum) || isNaN(pricecheck) ){
        return"Thevalue was not a Number";
    }
    else{
        if(pricecheck < minNum || pricecheck > maxNum){
            return"The value was out of price["+minNum+","+maxNum+"]";
        }
        else {
            return"";
        }
    }
}


module.exports = {insertToDB,getAll,deleteObject,getDocumentById,updateDocument, findProductsByCategory, findProductsByProductName, checkPrice}























































