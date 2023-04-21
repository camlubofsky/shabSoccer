'use strict';

const AWS = require('aws-sdk');
const uuid = require('uuid');

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const send = (body, sc) => {
  return {
    statusCode: sc,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(body),
  };
};

module.exports.createPlayer = async (event, context, cb) => {
  const { name, tier } = JSON.parse(event.body);
  try {
    const player = {
      playerId: uuid.v4(),
      name,
      tier,
      team: null,
      playing: false,
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

  try {
    const params = {
      TableName: process.env.PLAYER_TABLE,
      Key: { playerId },
      UpdateExpression: 'set #team = :team, #tier = :tier, #playing = :playing',
      ExpressionAttributeNames: {
        '#team': 'team',
        '#tier': 'tier',
        '#playing': 'playing',
      },
      ExpressionAttributeValues: {
        ':team': data.team,
        ':tier': data.tier,
        ':playing': data.playing,
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
