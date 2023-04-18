'use strict';

const AWS = require('aws-sdk');
const uuid = require('uuid');

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const send = (body, sc) => {
  return {
    statusCode: sc,
    body: JSON.stringify(body),
  };
};

module.exports.createPlayer = async (event, context, cb) => {
  const { name, tier, team } = JSON.parse(event.body);
  try {
    const player = {
      playerId: uuid.v4(),
      name,
      tier,
      team,
    };
    const params = {
      TableName: process.env.PLAYER_TABLE,
      Item: player,
    };

    await dynamoDB.put(params).promise();

    cb(null, send(player, 200));
  } catch (e) {
    cb(null, send(e, 500));
  }
};

module.exports.updatePlayer = async (event, context, cb) => {
  let playerId = event.pathParameters.id;
  let data = JSON.parse(event.body);
  const team = data.team;

  try {
    const params = {
      TableName: process.env.PLAYER_TABLE,
      Key: { playerId },
      UpdateExpression: 'set #team = :team, #tier = :tier',
      ExpressionAttributeNames: {
        '#team': 'team',
        '#tier': 'tier',
      },
      ExpressionAttributeValues: {
        ':team': data.team,
        ':tier': data.tier,
      },
      ConditionExpression: 'attribute_exists(playerId)',
    };
    await dynamoDB.update(params).promise();

    cb(null, send(data, 200));
  } catch (e) {
    cb(null, send(e, 500));
  }
};

module.exports.deletePlayer = async (event, context, cb) => {
  let playerId = event.pathParameters.id;
  try {
    const params = {
      TableName: process.env.PLAYER_TABLE,
      Key: { playerId },
      ConditionExpression: 'attribute_exists(playerId)',
    };
    await dynamoDB.delete(params).promise();

    cb(null, send(player, 200));
  } catch (e) {
    cb(null, send(e, 500));
  }
};

module.exports.getAllPlayers = async (event, context, cb) => {
  try {
    const params = {
      TableName: process.env.PLAYER_TABLE,
    };
    const player = await dynamoDB.scan(params).promise();

    cb(null, send(player, 200));
  } catch (e) {
    cb(null, send(e, 500));
  }
};
