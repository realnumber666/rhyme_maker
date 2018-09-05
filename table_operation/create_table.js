/**
 * 18.9.5 ray
 * to create local rhyme table
 */
var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-east-1",
    endpoint: "http://localhost:8000"
});

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "rhyme",
    KeySchema: [
        {AttributeName: "spell",KeyType: "HASH"},
        {AttributeName: "raw",KeyType: "RANGE"}
    ],
    AttributeDefinitions: [
        {AttributeName: "spell", AttributeType: "S"},
        {AttributeName: "raw", AttributeType: "S"}
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};

dynamodb.createTable(params, function(err,data){
    if(err){
        console.error("Failed to create rhyme table.Error JSON:",JSON.stringify(err, null, 2));
    } else{
        console.log("Suc to create rhyme table.Table description JSON:",JSON.stringify(data, null, 2));
    }
});