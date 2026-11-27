// Datas-limite são guardadas como 'AAAA-MM-DD' (valor do <input type="date">).
// Todas as comparações usam o dia no fuso local do navegador: `new Date('AAAA-MM-DD')`
// e `toISOString()` trabalham em UTC e deslocavam a data em um dia no Brasil.

const doisDigitos = (n) => String(n).padStart(2, '0');

// Dia de hoje no fuso local, no mesmo formato do campo de data.
export function hojeLocal(agora = new Date()) {
  return `${agora.getFullYear()}-${doisDigitos(agora.getMonth() + 1)}-${doisDigitos(agora.getDate())}`;
}

// Converte 'AAAA-MM-DD' para um Date à meia-noite local (ou null se inválida).
export function paraDataLocal(texto) {
  const partes = /^(\d{4})-(\d{2})-(\d{2})$/.exec(texto || '');
  if (!partes) return null;
  const data = new Date(Number(partes[1]), Number(partes[2]) - 1, Number(partes[3]));
  return Number.isNaN(data.getTime()) ? null : data;
}

export function formatarDataLonga(texto) {
  const data = paraDataLocal(texto);
  if (!data) return '';
  return data.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

// Comparação por texto funciona porque o formato é fixo (AAAA-MM-DD).
export function estaAtrasada(tarefa, hoje = hojeLocal()) {
  return Boolean(tarefa.dataLimite) && !tarefa.concluida && tarefa.dataLimite < hoje;
}
