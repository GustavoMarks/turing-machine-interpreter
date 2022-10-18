class TMI {
	constructor() {
		this.fita = [' '];
		this.pos = 0;
		this.estadoAtual = 'q0';
	}

	// Tarefa 1
	lerQuadrupla(linha = 0, quadString) {
		// linha: iterador do arquivo
		// quadString: string no formato "qn,s,a,qn" onde:
		// - qn é um estado de origem q de número n (ex: q0, q1, q2, etc)
		// - s é um símbolo lido
		// - a é a ação, sendo > e < direções de deslocamento
		// - qn é um estado de destino q de número n (ex: q0, q1, q2, etc)

		const parts = String(quadString).split(',');
		if (parts.length != 4) throw new Error(`Formato incorreto de Quadrupla: formato esperado de 4 argumentos. Linha ${linha}`);

		const estadoOrigem = parts[0];
		const simbolo = parts[1];
		const acao = parts[2];
		const estadoDestino = parts[3];

		const errorOrigemFormat = new Error(`Formato incorreto para estado de origem. Linha ${linha}`);
		if (String(estadoOrigem).length !== 2) throw errorOrigemFormat;
		if (String(estadoOrigem)[0] !== 'q') throw errorOrigemFormat;
		if (isNaN(String(estadoOrigem)[1])) throw errorOrigemFormat;

		if (String(simbolo).length !== 1) throw new Error(`Formato incorreto para símbolo. Linha ${linha}`);

		if (String(acao).length !== 1) throw new Error(`Formato incorreto para símbolo. Linha ${linha}`);

		const errorDestinoFormat = new Error(`Formato incorreto para estado de destino. Linha ${linha}`);
		if (String(estadoDestino).length !== 2) throw errorDestinoFormat;
		if (String(estadoDestino)[0] !== 'q') throw errorDestinoFormat;
		if (isNaN(String(estadoDestino)[1])) throw errorDestinoFormat;

		return { estadoOrigem, simbolo, acao, estadoDestino };
	}

	// Tarefa 2
	inicializar(entrada) {
		let novaFita = String(entrada).split(); // Trasformando a string em uma lista com cada posição sendo um caractere
		novaFita.unshift(" "); // Colocando espaço em branco na primeira posição
		this.fita = novaFita;
	}
}

module.exports = TMI;