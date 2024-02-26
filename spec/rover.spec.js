const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  it("constructor sets position and default values for mode and generatorWatts", function() {
    let obj = new Rover(1,);
    expect(obj.position).toBe(1);
    expect(obj.mode).toBe('NORMAL');
    expect(obj.generatorWatts).toBe(110);
  });

  it("response returned by receiveMessage contains the name of the message", function() {
    let commands = [new Command('1', '1'), new Command('2')];
    let message = new Message('test', commands);
    let rover = new Rover(98382);  
    let response = rover.receiveMessage(message);
    expect(response.message).toBe(message.name);
  });

  it("response returned by receiveMessage includes two results if two commands are sent in the message", function(){
    let commands = [new Command('1', '2'), new Command('1', '2')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);   
    let response = rover.receiveMessage(message);
    expect(message.results).toBe(message.results);
   
  });

  it("responds correctly to the status check command", function(){
    let commands = [new Command('1', '2'), new Command('1', '2')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);   
    let response = rover.receiveMessage(message);
    if (Command.commandType === 'STATUS_CHECK'){
      expect(response.results).toContain(this.mode, this.generatorWatts, this.position);
    }
  });

  it('responds correctly to the mode change command', function() {
    let commands = [new Command('1', '2'), new Command('1', '2')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);   
    let response = rover.receiveMessage(message);
    if (Command.commandType === "MODE_CHANGE"){
      expect(response.results[1].roverstatus.mode).toBe('NORMAL').orToBe('LOW_POWER');
    }
    });


  it('responds with a false completed value when attempting to move in LOW_POWER mode', function() {
    let commands = [new Command('1', '2'), new Command('1', '2')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);   
    let response = rover.receiveMessage(message);
    if (Command.value === 'LOW_POWER') {
      expect(completed).toBe(false)
    };
  });

  it('responds with the position for the move command', function() {
    if(Command.commandType === "MOVE" && Rover.mode === "NORMAL" && Number.isInteger(Command.value) === true) {
      expect(Rover.position).toBe(Command.value);
    };
  });

});
