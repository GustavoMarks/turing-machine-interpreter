const TMI = require('./turingMachineInterpreter');

const tmi = new TMI();
tmi.executarMTArq('teste.tm', 'entrada.txt', true);