import Phaser from 'phaser';
import GameScene from '../scenes/GameScene';
import 'jest-expect-subclass';

test('GameScene should be a subclass of Phaser.Scene', () => {
  expect(GameScene).toBeSubclassOf(Phaser.Scene);
});

describe('Game Options', () => {
  test('it should return playerGravity is 900', () => {
    expect(gameOptions.playerGravity).toEqual(900);
  });

  test('it should return jumpForce is 400', () => {
    expect(gameOptions.jumpForce).toEqual(400);
  });

  test('it should return playerStartPosition is 200', () => {
    expect(gameOptions.playerStartPosition).toEqual(150);
  });
});