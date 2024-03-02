// 

const Command = require('./command.js');
const Message = require('./message.js');

class Rover {
   constructor(position, mode, generatorWatts = 110) {
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = generatorWatts;
   };
     
     receiveMessage(message) {
      let roverStatus = {};
      let results = [];
      let commands = message.commands
      
      
          for (let i = 0; i < commands.length; i++){
            let completed = {completed: true};
            if(commands[i].commandType === "MODE_CHANGE"){
               results.push(completed);
            };
            if(commands[i].commandType === "STATUS_CHECK"){
               roverStatus.roverStatus = {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position};
               results.push(Object.assign(completed, roverStatus));
              
            };
            if(commands[i].commandType === "MOVE" && this.mode === "NORMAL" && Number.isInteger(commands[i].value) === true){
             this.position = commands[i].value;
             results.push(completed);
            };
            if(commands[i].value === "LOW_POWER"){
               this.mode = commands[i].value;
               completed = {completed: false};
               results.push(completed);
            };
            
         };

      message = {
         message: message.name,
         results: results
      };

      return message;
   };
};



module.exports = Rover;










