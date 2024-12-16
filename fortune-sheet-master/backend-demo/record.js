// const { MongoClient } = require("mongodb");

// const RecordCollectionName = "record";
// const RecordUri = "mongodb://localhost:27017";
// const RecordClient = new MongoClient(RecordUri);

async function record(collection, data) {
  const recorddata = {
    record: data,
    createtime: new Date(),
  };
  await collection.insertOne(recorddata);
}

function getRecord(collection) {
  // const collection =
  //   RecordClient.db(RecordCollectionName).collection(RecordCollectionName);
  const data = collection.find().toArray();
  // data.forEach((record) => {
  //   if (!_.isUndefined(sheet._id)) delete sheet._id;
  // });
  return data;
}

module.exports = {
  record,
  getRecord,
};
