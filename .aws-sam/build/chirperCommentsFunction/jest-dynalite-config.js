module.exports = {
  tables: [
    {
      TableName: 'chirper',
      KeySchema: [{ AttributeName: 'timestamp', KeyType: 'HASH' }],
      AttributeDefinitions: [
        { AttributeName: 'timestamp', AttributeType: 'S' }
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
      }
    }
  ],
  basePort: 8000
};
