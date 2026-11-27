// As tarefas ficam apenas no navegador (localStorage), sem servidor.
// A leitura e a escrita toleram dados corrompidos e armazenamento bloqueado
// (modo privado, cookies desativados): nesses casos o app continua funcionando em memória.

const CHAVE = 'tarefas';
const PRIORIDADES = ['baixa', 'media', 'alta'];

function normalizarTarefa(item, indice) {
  if (!item || typeof item !== 'object' || typeof item.titulo !== 'string' || item.titulo.trim() === '') return null;
  return {
    id: typeof item.id === 'number' || typeof item.id === 'string' ? item.id : Date.now() + indice,
    titulo: item.titulo,
    descricao: typeof item.descricao === 'string' ? item.descricao : '',
    prioridade: PRIORIDADES.includes(item.prioridade) ? item.prioridade : 'media',
    dataLimite: typeof item.dataLimite === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(item.dataLimite) ? item.dataLimite : '',
    concluida: item.concluida === true,
  };
}

// Retorna { tarefas, disponivel }; `disponivel` é false quando o navegador bloqueia o armazenamento.
export function carregarTarefas() {
  let bruto;
  try {
    bruto = window.localStorage.getItem(CHAVE);
  } catch {
    return { tarefas: [], disponivel: false };
  }
  if (!bruto) return { tarefas: [], disponivel: true };
  try {
    const dados = JSON.parse(bruto);
    if (!Array.isArray(dados)) return { tarefas: [], disponivel: true };
    return { tarefas: dados.map(normalizarTarefa).filter(Boolean), disponivel: true };
  } catch {
    return { tarefas: [], disponivel: true };
  }
}

// Retorna false se não foi possível salvar (armazenamento bloqueado ou cheio).
export function salvarTarefas(tarefas) {
  try {
    window.localStorage.setItem(CHAVE, JSON.stringify(tarefas));
    return true;
  } catch {
    return false;
  }
}
