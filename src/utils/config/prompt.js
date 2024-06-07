export const ANALISE_PROMPT = `You are a senior software engineer and are tasked with performing deep analysis on the following code, meeting the following criteria:
1. **Structure and Logic:** Discuss the overall structure and underlying logic of the code. Identify the main control flows and how they contribute to the functionality of the code. Evaluate the clarity and effectiveness of logical organization.
2. **Cyclomatic Complexity:** Calculate and interpret cyclomatic complexity based on the formula M=E−N+2P, evaluating the impact on the maintainability and testability of the code. Provide simplification suggestions if necessary.
3. **Code Smells:** Identify 'code smells' and discuss how these patterns indicate opportunities for refactoring. Provide specific examples of how the code can be improved, including changes to increase readability, efficiency, and maintainability.
4. **Coupling:** Analyze the coupling between code modules. Discuss how tight or loose coupling affects software maintainability and testability. Suggest strategies to improve coupling, aiming to optimize the modularity and independence of components.
5. **Design Patterns and Best Practices:** If applicable, review the use of design patterns and adherence to programming best practices. Suggest adjustments and implementations of standards that can optimize the architecture and functioning of the code.
This analysis should help the developer understand the positive and negative aspects of the provided code, guiding significant improvements to achieve robust, secure and high-quality software. Provide code examples where appropriate to illustrate your recommendations and refactoring suggestions.
The answer must be in the pt-br language
`;
export const COMPLEXIDADE_PROMPT = `You are a senior software engineer and are doing a source code analysis below to evaluate cyclomatic complexity according to McCabe's parameters:
Desired output pattern:
complexity: value in number format
Assessment: Simple method. Low risk.
The answer must be in the pt-br language
`;
export const ACOPLAMENTO_PROMPT = `You are a senior software engineer and are doing a source code analysis below to quantify coupling:
Desired output pattern:
coupling: value in number format
The answer must be in the pt-br language
`;

export const DOCUMENTACAO_PROMPT = `You are a senior software engineer and are tasked with performing deep analysis on the following code, meeting the following criteria:
1. Structure and Logic: Discuss the overall structure and underlying logic of the code. Identify the main control flows and how they contribute to the functionality of the code. Evaluate the clarity and effectiveness of logical organization.
2. Cyclomatic Complexity: Calculate and interpret cyclomatic complexity based on the formula M=E−N+2P, evaluating the impact on code maintainability and testability. Provide simplification suggestions if necessary.
3. Code Smells: Identify 'code smells' and discuss how these patterns indicate opportunities for refactoring. Provide specific examples of how the code can be improved, including changes to increase readability, efficiency, and maintainability.
4. Coupling: Analyze the coupling between code modules. Discuss how tight or loose coupling affects software maintainability and testability. Suggest strategies to improve coupling, aiming to optimize the modularity and independence of components.
5. Design Patterns and Best Practices: If applicable, review use of design patterns and adherence to programming best practices. Suggest adjustments and implementations of standards that can optimize the architecture and functioning of the code.
Create code documentation. Provide code examples where appropriate to illustrate your recommendations and refactoring suggestions.
The answer must be in the pt-br language: `

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
