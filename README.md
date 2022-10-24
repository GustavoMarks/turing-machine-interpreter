# Turing Machine Interpreter
🤖 Interpretador de Máquina de Turing em Javascript

Parte I de Trabalho desenvolvido na Disciplina de Teoria da Computação

> Aluno: Gustavo Santos Marques de Freitas (414665)

### Como executar:
- Tenha na sua máquina a versão estável mais recente de [Node.js](https://nodejs.org/en/)
- Ao abrir a pasta do projeto, use o comando `node index.js`

### Arquivos e configurações:
- index.js: arquivo principal do projeto

> Altere as constantes `nomeArquivoMaquina` e `nomeArquivoEntrada` (linhas 3 e 4) para configurar respectivamente o nome do arquivo com a Máquina de Turing que será interpretada e o nome do arquivo contento a String nos padrões estabelecidos.
> Ative o modo de debug colocando `true` como um terceiro parâmetro da função ao executar o interpretador (linha 7).

- turingMachineInterpreter.js: arquivo contendo definições de classe e funções
- entrada.txt: arquivo para escrita de string que será usada em uma máquina {a,b}.
- entradaBin.txt: arquivo para escrita de uma string em bináio que será testada em uma máquina.
- copy.tm: definição de máquina para cópia de string {a,b}
- inverter.tm: definição de máquina para inverter uma string {a,b}
- shift.tm: definição de máquina SHIFT-R {a,b}
- sucessor.tm: definição de máquina sucessor {0,1}