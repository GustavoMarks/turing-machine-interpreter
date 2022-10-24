const TMI = require('./turingMachineInterpreter');

const nomeArquivoMaquina = 'copy.tm';
const nomeArquivoEntrada = 'entrada.txt';

const tmi = new TMI();
tmi.executarMTArq(nomeArquivoMaquina, nomeArquivoEntrada);