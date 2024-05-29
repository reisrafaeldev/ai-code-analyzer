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
