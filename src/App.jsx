import React, { useState, useEffect } from 'react';
import ListaTarefas from './components/ListaTarefas';
import FormularioTarefa from './components/FormularioTarefa';
import { hojeLocal } from './utils/datas';
import { carregarTarefas, salvarTarefas } from './utils/armazenamento';
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Id único mesmo para tarefas criadas no mesmo milissegundo (Date.now() sozinho podia repetir)
const gerarId = () =>
  (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function')
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

const TAREFA_VAZIA = {
  titulo: '',
  descricao: '',
  prioridade: 'media',
  dataLimite: '',
};

function App() {
  const [novaTarefa, setNovaTarefa] = useState(TAREFA_VAZIA);

  const [carregamento] = useState(carregarTarefas);
  const [tarefas, setTarefas] = useState(carregamento.tarefas);
  const [armazenamentoDisponivel, setArmazenamentoDisponivel] = useState(carregamento.disponivel);

  useEffect(() => {
    if (!salvarTarefas(tarefas)) setArmazenamentoDisponivel(false);
  }, [tarefas]);

  const [modoEdicao, setModoEdicao] = useState(false);
  const [indiceEditando, setIndiceEditando] = useState(null);
  const [telaAtual, setTelaAtual] = useState('inicio'); // 'inicio', 'adicionar', 'concluidas'

  const [mensagem, setMensagem] = useState('');

  // A mensagem de confirmação some sozinha; o timer é cancelado se outra mensagem chegar antes
  useEffect(() => {
    if (!mensagem) return undefined;
    const timer = setTimeout(() => setMensagem(''), 3000);
    return () => clearTimeout(timer);
  }, [mensagem]);

  // Fechar o formulário sempre descarta a edição em andamento
  const fecharFormulario = () => {
    setNovaTarefa(TAREFA_VAZIA);
    setModoEdicao(false);
    setIndiceEditando(null);
    setTelaAtual('inicio');
  };

  const abrirNovaTarefa = () => {
    setNovaTarefa(TAREFA_VAZIA);
    setModoEdicao(false);
    setIndiceEditando(null);
    setTelaAtual('adicionar');
  };

  // Esc fecha o formulário
  useEffect(() => {
    if (telaAtual !== 'adicionar') return undefined;
    const aoTeclar = (evento) => {
      if (evento.key !== 'Escape') return;
      setNovaTarefa(TAREFA_VAZIA);
      setModoEdicao(false);
      setIndiceEditando(null);
      setTelaAtual('inicio');
    };
    document.addEventListener('keydown', aoTeclar);
    return () => document.removeEventListener('keydown', aoTeclar);
  }, [telaAtual]);

  const adicionarTarefa = () => {
    if (novaTarefa.titulo.trim() === '') return;

    const dataAjustada = novaTarefa.dataLimite || '';

    if (modoEdicao) {
      setTarefas((anteriores) =>
        anteriores.map((t) =>
          t.id === indiceEditando ? { ...t, ...novaTarefa, dataLimite: dataAjustada } : t
        )
      );
      setMensagem('Tarefa atualizada!');
    } else {
      const nova = {
        id: gerarId(),
        ...novaTarefa,
        dataLimite: dataAjustada,
        concluida: false,
      };
      setTarefas((anteriores) => [...anteriores, nova]);
      setMensagem('Tarefa adicionada com sucesso!');
    }

    fecharFormulario();
  };

  const marcarComoConcluida = (id) => {
    setTarefas((tarefasAnteriores) =>
      tarefasAnteriores.map((tarefa) =>
        tarefa.id === id
          ? { ...tarefa, concluida: !tarefa.concluida }
          : tarefa
      )
    );
  };

  const removerTarefa = (id) => {
    const confirmar = window.confirm('Tem certeza que deseja excluir esta tarefa?');
    if (confirmar) {
      setTarefas((tarefasAnteriores) => tarefasAnteriores.filter((t) => t.id !== id));
    }
  };

  const editarTarefa = (id) => {
    const tarefaSelecionada = tarefas.find((t) => t.id === id);
    if (!tarefaSelecionada) return;
    setNovaTarefa({
      titulo: tarefaSelecionada.titulo,
      descricao: tarefaSelecionada.descricao,
      prioridade: tarefaSelecionada.prioridade,
      dataLimite: tarefaSelecionada.dataLimite,
    });
    setIndiceEditando(id);
    setModoEdicao(true);
    setTelaAtual('adicionar');
  };

  // "Hoje" e "atrasada" usam o dia no fuso local (antes era UTC, o que trocava o dia à noite)
  const hoje = hojeLocal();
  const pendentes = tarefas.filter((t) => !t.concluida);
  const atrasadas = pendentes.filter((t) => t.dataLimite && t.dataLimite < hoje);
  const deHoje = pendentes.filter((t) => t.dataLimite === hoje);
  // Tarefas futuras ou sem data antes não apareciam em nenhuma tela
  const proximas = pendentes
    .filter((t) => !t.dataLimite || t.dataLimite > hoje)
    .sort((a, b) => (a.dataLimite || '9999-12-31').localeCompare(b.dataLimite || '9999-12-31'));

  const acoes = { marcarComoConcluida, removerTarefa, editarTarefa };

  return (
    <main className="app-container">
      <h1>Minhas tarefas</h1>
      <p>Organize o dia por prioridade e data-limite.</p>
      {!armazenamentoDisponivel && (
        <p className="aviso-armazenamento" role="status">
          O navegador bloqueou o armazenamento local: as tarefas funcionam, mas não serão mantidas ao recarregar a página.
        </p>
      )}
      <div className="mensagem-area" role="status" aria-live="polite">
        {mensagem && <div className="mensagem">{mensagem}</div>}
      </div>

      <div className="glow-circle" aria-hidden="true"></div>

      {telaAtual === 'inicio' && (
        <div className="tela-inicio">
          <section className="coluna" aria-labelledby="titulo-atrasadas">
            <h2 id="titulo-atrasadas">Atrasadas</h2>
            <ListaTarefas tarefas={atrasadas} vazio="Nenhuma tarefa atrasada." {...acoes} />
          </section>

          <section className="coluna" aria-labelledby="titulo-hoje">
            <h2 id="titulo-hoje">Hoje ({new Date().toLocaleDateString('pt-BR')})</h2>
            <ListaTarefas tarefas={deHoje} vazio="Nada para hoje." {...acoes} />
          </section>

          <section className="coluna" aria-labelledby="titulo-proximas">
            <h2 id="titulo-proximas">Próximas e sem data</h2>
            <ListaTarefas tarefas={proximas} vazio="Nenhuma tarefa futura." {...acoes} />
          </section>
        </div>
      )}

      {telaAtual === 'adicionar' && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) fecharFormulario(); }}>
          <div className="modal-conteudo" role="dialog" aria-modal="true" aria-label={modoEdicao ? 'Editar tarefa' : 'Nova tarefa'}>
            <button type="button" className="fechar-modal" onClick={fecharFormulario} aria-label="Fechar formulário">
              <i className="bi bi-x-lg" aria-hidden="true"></i>
            </button>
            <FormularioTarefa
              novaTarefa={novaTarefa}
              setNovaTarefa={setNovaTarefa}
              adicionarTarefa={adicionarTarefa}
              modoEdicao={modoEdicao}
            />
          </div>
        </div>
      )}

      {telaAtual === 'concluidas' && (
        <section aria-labelledby="titulo-concluidas">
          <h2 id="titulo-concluidas">Tarefas Concluídas</h2>
          <ListaTarefas tarefas={tarefas.filter((t) => t.concluida)} vazio="Nenhuma tarefa concluída ainda." {...acoes} />
        </section>
      )}

      <nav className="menu-inferior" aria-label="Navegação">
        <button
          type="button"
          className={telaAtual === 'inicio' ? 'ativo' : ''}
          aria-current={telaAtual === 'inicio' ? 'page' : undefined}
          onClick={fecharFormulario}
        >
          <div><i className="bi bi-house-door-fill" aria-hidden="true"></i></div>
          <span>Início</span>
        </button>
        <button
          type="button"
          className={telaAtual === 'adicionar' ? 'ativo' : ''}
          onClick={abrirNovaTarefa}
        >
          <div><i className="bi bi-plus-circle" aria-hidden="true"></i></div>
          <span>Adicionar</span>
        </button>
        <button
          type="button"
          className={telaAtual === 'concluidas' ? 'ativo' : ''}
          aria-current={telaAtual === 'concluidas' ? 'page' : undefined}
          onClick={() => { fecharFormulario(); setTelaAtual('concluidas'); }}
        >
          <div><i className="bi bi-check2-circle" aria-hidden="true"></i></div>
          <span>Concluídas</span>
        </button>
      </nav>
    </main>
  );
}

export default App;
