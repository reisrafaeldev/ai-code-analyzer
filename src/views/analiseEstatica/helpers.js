export const PROMPT = `Você recebeu um trecho de código-fonte como entrada. Por favor, analise este código detalhadamente com base nos seguintes critérios:

1. **Erros e Avisos:** Identifique e explique quaisquer erros sintáticos ou lógicos presentes no código. Além disso, aponte avisos que possam não ser erros per se, mas que podem levar a comportamentos inesperados ou ineficiências.

2. **Complexidade Ciclomática:** Calcule e interprete a complexidade ciclomática do código. A complexidade ciclomática é uma medida da quantidade de caminhos de execução independentes dentro do código. Explique como essa métrica pode afetar a manutenibilidade e testabilidade do código.

3. **Code Smells:** Identifique quaisquer 'code smells' presentes. Code smells são padrões no código que podem indicar problemas mais profundos ou uma oportunidade para refatoração. Exemplos incluem métodos muito longos, duplicação de código, classes com muitas responsabilidades, etc.

4. **Sugestões de Melhoria:** Com base na sua análise, forneça sugestões concretas para melhorar a qualidade do código. Isso pode incluir refatorações para reduzir a complexidade, corrigir erros, eliminar code smells ou melhorar a legibilidade e a manutenibilidade do código.

5. **Boas Práticas:** Avalie o código em relação às boas práticas de programação conhecidas na linguagem em questão. Isso inclui, mas não se limita a, convenções de nomenclatura, uso adequado de padrões de projeto, e aderência a princípios de programação sólidos (SOLID, por exemplo).

6. **Análise de Segurança:** Examine o código para identificar potenciais vulnerabilidades de segurança. Isso pode incluir, mas não se limita a, injeção de SQL, XSS (Cross-Site Scripting), CSRF (Cross-Site Request Forgery) e outros riscos de segurança comuns. Forneça recomendações para mitigar esses riscos.

7. **Performance:** Avalie o código quanto à eficiência e performance. Identifique áreas onde o código pode ser otimizado para melhorar a velocidade de execução, reduzir o uso de memória ou otimizar consultas ao banco de dados.

8. **Aderência a Padrões Específicos da Linguagem:** Discuta como o código se alinha com os padrões e convenções específicos da linguagem de programação utilizada. Isso pode incluir o uso eficaz de características da linguagem, bibliotecas padrão e frameworks.

9. **Uso de Recursos:** Analise como o código gerencia recursos como conexões de rede, arquivos e threads. Forneça sugestões para gerenciar recursos de maneira mais eficaz e evitar vazamentos de recursos.

10. **Compatibilidade:** Comente sobre a compatibilidade do código com diferentes ambientes, sistemas operacionais, navegadores (se aplicável) ou versões da linguagem de programação. Identifique quaisquer potenciais problemas de compatibilidade e sugira correções.

Por favor, apresente sua análise em uma resposta estruturada, detalhando cada um dos pontos acima com exemplos específicos do código quando aplicável. Sua resposta ajudará o desenvolvedor a entender os aspectos positivos e negativos do código fornecido, além de orientar melhorias significativas. Responda em português Brasil `;

export const C_PROMPT = `Você é um engenheiro de sofware sênior e está fazendo uma análise de código fonte abaixo para avaliar a complexidade ciclomática de acordo com os parâmetros de McCabe:

Padrão de saída desejado:
complexidade: 3
Avaliação: Método simples. Baixo risco.

`
export const options = {
    plugins: {
      legend: {
        labels: {
          color: '#e53d00' ,
        }
      },
      title: {
        display: true,
        text: 'Complexidade Ciclomática',
        color: '#e53d00' // Define a cor da fonte do título para verde
      }
    },

  };
export const optionsAc = {
    plugins: {
      legend: {
        labels: {
          color: '#e53d00' ,
        }
      },
      title: {
        display: true,
        text: 'Acoplamento',
        color: '#e53d00' // Define a cor da fonte do título para verde
      }
    },

  };