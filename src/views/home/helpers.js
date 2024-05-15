export const PROMPT = `Você é um engenheiro de software sênior e está encarregado de realizar uma análise profunda no código a seguir abordando os seguintes critérios:

1. **Estrutura e Lógica:** Discorra sobre a estrutura geral e a lógica subjacente do código. Identifique os fluxos de controle principais e como eles contribuem para as funcionalidades do código. Avalie a clareza e a eficácia da organização lógica.

2. **Complexidade Ciclomática:** Calcule e interprete a complexidade ciclomática, avaliando o impacto na manutenibilidade e testabilidade do código. Forneça sugestões para simplificação, se necessário.

3. **Code Smells:** Identifique 'code smells' e discuta como esses padrões indicam oportunidades para refatoração. Forneça exemplos específicos de como o código pode ser melhorado, incluindo alterações para aumentar a legibilidade, eficiência e manutenibilidade.

4. **Acoplamento:** Analise o acoplamento entre os módulos do código. Discuta como o alto ou baixo acoplamento afeta a manutenibilidade e a capacidade de teste do software. Sugira estratégias para melhorar o acoplamento, visando otimizar a modularidade e a independência dos componentes.

5. **Padrões de Design e Melhores Práticas:** Caso possua, analise o uso de padrões de design e a aderência às melhores práticas de programação. Sugira ajustes e implementações de padrões que possam otimizar a arquitetura e o funcionamento do código.

Esta análise deve ajudar o desenvolvedor a compreender tanto os aspectos positivos quanto os negativos do código fornecido, orientando melhorias significativas para alcançar um software robusto, seguro e de alta qualidade. Forneça exemplos de código sempre que apropriado para ilustrar suas recomendações e sugestões de refatoração.`;

export const C_PROMPT = `Você é um engenheiro de sofware sênior e está fazendo uma análise de código fonte abaixo para avaliar a complexidade ciclomática de acordo com os parâmetros de McCabe:

Padrão de saída desejado:
complexidade: 3
Avaliação: Método simples. Baixo risco.

`;
export const ACOPLAMENTO_PROMPT = `Você é um engenheiro de sofware sênior e está fazendo uma análise de código fonte abaixo para quantificar o acoplamento:

Padrão de saída desejado:
acoplamento: 3

`;

export const extrairComplexidade = (textoJson, setSetComplexidade) => {

  const regexComplexidade = /complexidade\s*:\s*(\d+)/;
  const regexAvaliacao = /avaliação\s*:\s*(.+)/;
  const complexidadeMatch = textoJson.match(regexComplexidade);
  const avaliacaoMatch = textoJson.match(regexAvaliacao);

  return setSetComplexidade({
    complexidade: complexidadeMatch && complexidadeMatch[1],
    avaliacao: avaliacaoMatch && avaliacaoMatch[1],
  });
};

export const extrairAcoplamento = (textoJson, setAcoplamento) => {

  const regexAcoplamento = /acoplamento\s*:\s*(\d+)/;
  const acoplamentoMatch = textoJson.match(regexAcoplamento);

  return setAcoplamento({
    acoplamento: acoplamentoMatch && acoplamentoMatch[1],
  });
};

export const getFileName = (path) => {
  return path.split(/[/\\]/).pop();
};
