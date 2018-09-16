/**
 * 18.9.5 ray
 * to load and transform raw data to pinyin
 */
var lineReader = require('line-reader');
var AWS = require('aws-sdk');
AWS.config.update({
    region:'us-east-1',
    endpoint:'http://localhost:8000'
});

var cvs = require('./py_cvs').cvs;
var docClient = new AWS.DynamoDB.DocumentClient();

lineReader.eachLine('out2.txt',function(line,last){
    // console.log(line)
    let Table = 'rhyme';
    let Raw = line;
    let Spell = cvs(Raw);
    
    let params = {
        TableName:Table,
        Item:{
            "raw":Raw,
            "spell":Spell
        }
    };
    docClient.put(params,function(err,data){
        if(err){
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        }else {
            console.log("Added item:", JSON.stringify(line, null, 2));
        }
    });
})