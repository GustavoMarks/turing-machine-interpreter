const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

class TMI {
	constructor() {
		this.fita = [' '];
		this.pos = 0;
		this.estadoAtual = 'q0';
	}

	// Tarefa 1
	lerQuadrupla(quadString) {
		// quadString: string no formato "qn,s,a,qn" onde:
		// - qn é um estado de origem q de número n (ex: q0, q1, q2, etc)
		// - s é um símbolo lido
		// - a é a ação, sendo > e < direções de deslocamento
		// - qn é um estado de destino q de número n (ex: q0, q1, q2, etc)

		const parts = String(quadString).split(',');
		if (parts.length != 4) throw new Error(`Formato incorreto de Quadrupla: formato esperado de 4 argumentos.`);

		const estadoOrigem = parts[0];
		const simbolo = parts[1];
		const acao = parts[2];
		const estadoDestino = parts[3];

		const errorOrigemFormat = new Error(`Formato incorreto para estado de origem.`);
		if (String(estadoOrigem)[0] !== 'q') throw errorOrigemFormat;

		if (String(simbolo).length !== 1) throw new Error(`Formato incorreto para símbolo.`);

		if (String(acao).length !== 1) throw new Error(`Formato incorreto para símbolo.`);

		const errorDestinoFormat = new Error(`Formato incorreto para estado de destino.`);
		if (String(estadoDestino)[0] !== 'q') throw errorDestinoFormat;

		return { estadoOrigem, simbolo, acao, estadoDestino };
	}

	// Tarefa 2
	inicializar(entrada) {
		let novaFita = [...entrada];
		novaFita.unshift(" "); 									// Colocando espaço em branco na primeira posição
		this.fita = novaFita;
	}

	// Tarefa 3
	deslocar_cabeca_direita() {
		if (this.pos === this.fita.length - 1) {
			this.fita.push(' ');
			this.pos = this.pos + 1;
		} else this.pos = this.pos + 1;
	}

	deslocar_cabeca_esquerda() {
		if (this.pos === 0) this.fita.unshift(' ');
		else this.pos = this.pos - 1;
	}

	escrever_caractere(char) {
		this.fita[this.pos] = char;
	}

	// Tarefa 4
	executar(quadString) {
		const { acao, estadoDestino } = this.lerQuadrupla(quadString);
		if (acao === '>') this.deslocar_cabeca_direita();
		else if (acao === '<') this.deslocar_cabeca_esquerda();
		else this.escrever_caractere(acao);
		this.estadoAtual = estadoDestino;
	}

	// Tarefa 5
	executarMT([...quadList], entradaString) {
		this.inicializar(entradaString);

		let findedQuad = quadList.find(item => {
			const { estadoOrigem, simbolo } = this.lerQuadrupla(item);
			if (estadoOrigem === this.estadoAtual && simbolo === this.fita[this.pos]) return true
			return false;
		});

		while (findedQuad) {
			this.executar(findedQuad);
			findedQuad = quadList.find(item => {
				const { estadoOrigem, simbolo } = this.lerQuadrupla(item);
				if (estadoOrigem === this.estadoAtual && simbolo === this.fita[this.pos]) return true
				return false;
			});
		}

		console.log(`Estado final: ${this.estadoAtual}`);
		console.log(`Posição final do cabeçote: ${this.pos}`);
		console.log("Conteúdo da fita");
		console.table(this.fita);
	}

	// Tarefa 6
	async executarMTDebug([...quadList], entradaString) {
		this.inicializar(entradaString);

		let findedQuad = quadList.find(item => {
			const { estadoOrigem, simbolo } = this.lerQuadrupla(item);
			if (estadoOrigem === this.estadoAtual && simbolo === this.fita[this.pos]) return true
			return false;
		});

		const waitResponse = () => new Promise(res => rl.question('Digite enter para continuar: ', () => {
			res();
		}))

		while (findedQuad) {
			this.executar(findedQuad);
			findedQuad = quadList.find(item => {
				const { estadoOrigem, simbolo } = this.lerQuadrupla(item);
				if (estadoOrigem === this.estadoAtual && simbolo === this.fita[this.pos]) return true
				return false;
			});

			console.log(`Estado atual: ${this.estadoAtual}`);
			console.log(`Posição atual do cabeçote: ${this.pos}`);
			console.log("Conteúdo da fita:");
			console.table(this.fita);

			await waitResponse();
		}

		rl.close();
	}

	// Tarefa 7
	async executarMTArq(pathQuadsString, pathEntradaString, debug = false) {
		fs.readFile(pathQuadsString, 'utf8', (err, arqQuadsData) => {
			if (err) throw new Error("Falha ao tentar ler o arquivo de quádruplas");
			const quadList = arqQuadsData.split('\n');

			fs.readFile(pathEntradaString, 'utf8', (err, entradaString) => {
				if (err) throw new Error("Falha ao tentar ler o arquivo de entrada");

				if (debug) return this.executarMTDebug(quadList, entradaString);
				return this.executarMT(quadList, entradaString);
			});
		});
	}

}

module.exports = TMI