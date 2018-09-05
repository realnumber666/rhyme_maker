/**
 * 18.9.5 ray
 * a router to search skr rhyme
 */
var express = require('express');
var router = express.Router();
var cvs = require('../table_operation/py_cvs').cvs;
var AWS = require("aws-sdk");
AWS.config.update({
    region:"us-east-1",
    endpoint:"http://localhost:8000"
  });
var docClient = new AWS.DynamoDB.DocumentClient();

router.get('/',function(req, res, next){
    let to_search_raw = req.query.rhyme;
    let to_search = cvs(to_search_raw);

    let params = {
        TableName: "rhyme",
        KeyConditionExpression:"#spell = :spell",
        ExpressionAttributeNames:{
            "#spell":"spell"
        },
        ExpressionAttributeValues:{
            ":spell":to_search
        }
    }
    docClient.query(params, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            console.log("Query succeeded.");
            //res.send(data.Items);
            //res.send(data.Items[0].raw);
            let print = '';
            data.Items.forEach(function(result) {
                print += result.raw +'  ';
                //console.log(book.book_id,book.type,book.lend_time);
            });
            res.send(print)
        }
      });
    //res.send(to_search_raw+' '+to_search);
    
})

module.exports = router;