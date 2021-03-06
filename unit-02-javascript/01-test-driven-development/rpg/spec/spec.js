import { Character } from './../src/character.js';

describe('Character', function() {
  var newCharacter;
  var newEnemy;

  beforeEach(function() {
    newCharacter = new Character('John', 'player', 10, 10, 5);
    newEnemy = new Character('Enemy', 'enemy', 10, 10, 5);
  });

  it('should create a character with player inputs', function() {
    newCharacter;
    expect(newCharacter.name).toEqual('John');
    expect(newCharacter.strength).toEqual(10);
    expect(newCharacter.dexterity).toEqual(10);
    expect(newCharacter.intelligence).toEqual(5);
  });

  it('should add starting health and inventory to character', function() {
    expect(newCharacter.health).toEqual(100);
    expect(newCharacter.inventory).toEqual(['bandage', 'bat', 'bandage']);
  });

  it('should update player x-coordinate by one unit to the right when moving across x-axis', function() {
    newCharacter.xCoord = 0;
    newCharacter.yCoord = 0;
    newCharacter.movePlayer("right");
    expect(newCharacter.xCoord).toEqual(1);
    expect(newCharacter.yCoord).toEqual(0);
  });

  it('should update player x-coordinate by one unit to the left when moving across x-axis', function() {
    newCharacter.xCoord = 2;
    newCharacter.yCoord = 0;
    newCharacter.movePlayer("left");
    expect(newCharacter.xCoord).toEqual(1);
    expect(newCharacter.yCoord).toEqual(0);
  });

  it('should update player y-coordinate by one unit upward when moving across y-axis', function() {
    newCharacter.xCoord = 0;
    newCharacter.yCoord = 1;
    newCharacter.movePlayer("up");
    expect(newCharacter.xCoord).toEqual(0);
    expect(newCharacter.yCoord).toEqual(0);
  });

  it('should update player y-coordinate by one unit downward when moving across y-axis', function() {
    newCharacter.xCoord = 0;
    newCharacter.yCoord = 0;
    newCharacter.movePlayer("down");
    expect(newCharacter.xCoord).toEqual(0);
    expect(newCharacter.yCoord).toEqual(1);
  });

  it('should generate a random number between 0 - 1 with each character move', function(){
    newCharacter.xCoord = 0;
    newCharacter.movePlayer('right');
    expect(newCharacter.encounter).toBeGreaterThan(0);
    expect(newCharacter.encounter).toBeLessThan(1);
  });

  it('should initiate battle encounter when random number is less than 0.2', function() {
    newCharacter.encounter = 0.19;
    let boolean = newCharacter.encounterCheck();
    expect(boolean).toEqual(true);
  });

  it('should generate a random number for hit or miss function', function() {
    let randomNumber = newCharacter.genRandomNumber();
    expect(randomNumber).toBeGreaterThan(0);
    expect(randomNumber).toBeLessThan(1);
  });

  it('should determine player hit or miss based on random number', function() {
    let hitTrue = newCharacter.hitMiss(0.25);
    let hitFalse = newCharacter.hitMiss(0.24);
    expect(hitTrue).toEqual(true);
    expect(hitFalse).toEqual(false);
  });

  it('should calculate damage points when player hits', function(){
    let damageAmt = newCharacter.damageCalc(true);
    expect(damageAmt).toEqual(25);
  });

  it('should deal player\'s damage to enemy health', function() {
    newCharacter.attack(newEnemy, true)
    expect(newEnemy.health).toEqual(75);
  });

  it('should kill enemy when enemy health reaches 0', function(){
    newEnemy.health = 25;
    newCharacter.attack(newEnemy, true);
    expect(newEnemy.status).toEqual('dead');
  });

  it('should award player XP when enemy dies', function() {
    newEnemy.health = 25;
    newCharacter.attack(newEnemy, true);
    expect(newCharacter.currentExp).toEqual(100);
  });

  it('should end combat after enemy dies', function() {
    newEnemy.health = 25;
    newCharacter.attack(newEnemy, true);
    expect(newCharacter.inCombat).toEqual(false);
  });

  it('should not end combat if enemy is alive', function() {
    newCharacter.inCombat = true;  newCharacter.attack(newEnemy, true);
    expect(newCharacter.inCombat).toEqual(true);
  });

  it('should be attacked by enemy', function() {
    newEnemy.attack(newCharacter, true);
    expect(newCharacter.health).toEqual(75);
  });

  it('should end game if player health reaches 0 or falls below it', function(){
    newCharacter.health = 25;
    newEnemy.attack(newCharacter, true);
    expect(newCharacter.gameStatus).toEqual('game over');
  });

  it('should add level-up attribute points to corresponding player attributes', function() {
    newCharacter.attributePts = 3;
    newCharacter.assignAttrPoint("str");
    newCharacter.assignAttrPoint("dex");
    newCharacter.assignAttrPoint("int");
    expect(newCharacter.strength).toEqual(11);
    expect(newCharacter.dexterity).toEqual(11);
    expect(newCharacter.intelligence).toEqual(6);
  });

  it('should not assign attribute points if character has no unusued points', function() {
    newCharacter.attributePts = 1;
    newCharacter.assignAttrPoint("str");
    newCharacter.assignAttrPoint("dex");
    newCharacter.assignAttrPoint("int");
    expect(newCharacter.strength).toEqual(11);
    expect(newCharacter.dexterity).toEqual(10);
    expect(newCharacter.intelligence).toEqual(5);
  });

  it('should add health to player when a bandage is used', function() {
    newCharacter.health = 50;
    newCharacter.useItem('bandage');
    expect(newCharacter.health).toEqual(100);
  });

  it('should add health to player, but not exceed max health, when a bandage is used', function() {
    newCharacter.health = 75;
    newCharacter.useItem('bandage');
    expect(newCharacter.health).toEqual(100);
  });

  it ('should remove one item from the inventory after each use', function() {
    newCharacter.useItem('bandage');
    expect(newCharacter.inventory).toEqual(['', 'bat', 'bandage']);
  });

  it('should increase player level when XP cap is reached', function() {
    newCharacter.currentExp = 100;
    newCharacter.checkXP();
    expect(newCharacter.level).toEqual(2);
  });

  it('should reset player XP after leveling up and add remainder XP over previous cap', function(){
    newCharacter.currentExp = 110;
    newCharacter.checkXP();
    expect(newCharacter.currentExp).toEqual(10);
  });

  it('should increase level XP requirement after level up', function() {
    newCharacter.currentExp = 110;
    newCharacter.checkXP();
    expect(newCharacter.levelExp).toEqual(120);
  });

  it('should increase max health after level up', function() {
    newCharacter.currentExp = 110;
    newCharacter.checkXP();
    expect(newCharacter.maxHealth).toEqual(120);
  });

  it('should add three unused attribute points after level up', function() {
    newCharacter.currentExp = 110;
    newCharacter.checkXP();
    expect(newCharacter.attributePts).toEqual(3);
  });

  it('should continuously level up character if current XP exceeds max XP', function() {
    newCharacter.currentExp = 300;
    newCharacter.checkXP();
    expect(newCharacter.level).toEqual(3);
    expect(newCharacter.attributePts).toEqual(6);
    expect(newCharacter.currentExp).toEqual(80);
  });

});
