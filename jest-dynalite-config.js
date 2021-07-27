module.exports = {
    tables: [{
        TableName: "chirper",
        KeySchema: [{ AttributeName: "username", KeyType: "HASH" }],
        AttributeDefinitions: [
                { AttributeName: "username", AttributeType: "S" }
            ],
        ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
        },
    }]
};