export function calcularComplexidadeCiclomatica(codigo) {
    // Contar o número de nós e arestas
    const linhasDeCodigo = codigo.split('\n');
    let numNodos = 1; // Começa com 1 para representar o ponto de entrada
    let numArestas = 0;

    for (const linha of linhasDeCodigo) {
        const trimmedLine = linha.trim();

        // Ignorar linhas em branco e comentários
        if (trimmedLine === '' || trimmedLine.startsWith('//')) {
            continue;
        }

        // Contar instruções que podem alterar o fluxo (if, else, for, while, switch, case, break)
        if (/^(if|else|for|while|switch|case|break)\b/.test(trimmedLine)) {
            numArestas += 2; // Cada instrução adiciona 2 arestas
        }
    }

    // Calcular a complexidade ciclomática usando a fórmula: M = E - N + 2P
    const complexidadeCiclomatica = numArestas - numNodos + 2;

    return complexidadeCiclomatica;
}