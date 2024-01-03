const fs = require("fs");

const csvHeader =
  "Mongodb Object ID,Timestamp,Date Created,Name,Publisher ID,Publisher URL\n";
const inputDataArr = require("./data-dump/pb-prod-data.json");
const anomaliesFilePath = "./output/anomalies.csv";
const outputFilePath = "./output/output.csv";

function main() {
  const anomaliesCsv = inputDataArr
    .filter(
      (publisherData) =>
        !publisherData.publisher_url ||
        !publisherData.publisher_url.startsWith("https://") ||
        !publisherData.publisher_url.endsWith("madrid.quintype.io")
    )
    .reduce(reducer, csvHeader);
  const normalCsv = inputDataArr
    .filter(
      (publisherData) =>
        publisherData.publisher_url &&
        publisherData.publisher_url.startsWith("https://") &&
        publisherData.publisher_url.endsWith("madrid.quintype.io")
    )
    .reduce(reducer, csvHeader);
  fs.writeFileSync(outputFilePath, normalCsv);
  fs.writeFileSync(anomaliesFilePath, anomaliesCsv);
}

function reducer(acc, publisherData) {
  const timeStamp = getTimestampFromMongoObjectId(publisherData["_id"]);
  acc += `${publisherData["_id"]},${timeStamp},${new Date(timeStamp)},${
    publisherData.name
  },${publisherData.boldPublisher_id},${publisherData.publisher_url}\n`;
  return acc;
}

function getTimestampFromMongoObjectId(objId) {
  if (!objId || typeof objId !== "string")
    throw new Error(`Object ID '${objId}' is invalid`);
  return parseInt(objId.slice(0, 8), 16) * 1000;
}

main();
