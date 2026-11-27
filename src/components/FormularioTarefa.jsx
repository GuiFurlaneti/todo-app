import React from 'react';
import './FormularioTarefa.css';

function FormularioTarefa({ novaTarefa, setNovaTarefa, adicionarTarefa, modoEdicao }) {
  // Enter no título envia; o botão continua sendo o caminho principal
  const aoEnviar = (evento) => {
    evento.preventDefault();
    adicionarTarefa();
  };

  return (
    <form className="form-tarefa" onSubmit={aoEnviar}>
      <input
        type="text"
        placeholder="Título da tarefa"
        aria-label="Título da tarefa"
        required
        autoFocus
        value={novaTarefa.titulo}
        onChange={(e) => setNovaTarefa({ ...novaTarefa, titulo: e.target.value })}
      />

      <textarea
        placeholder="Descrição (opcional)"
        aria-label="Descrição (opcional)"
        value={novaTarefa.descricao}
        onChange={(e) => setNovaTarefa({ ...novaTarefa, descricao: e.target.value })}
      />

      <select
        aria-label="Prioridade"
        value={novaTarefa.prioridade}
        onChange={(e) => setNovaTarefa({ ...novaTarefa, prioridade: e.target.value })}
      >
        <option value="baixa">Prioridade baixa</option>
        <option value="media">Prioridade média</option>
        <option value="alta">Prioridade alta</option>
      </select>

      <input
        type="date"
        aria-label="Data-limite (opcional)"
        value={novaTarefa.dataLimite || ''}
        onChange={(e) => setNovaTarefa({ ...novaTarefa, dataLimite: e.target.value })}
      />

      <button type="submit">
        {modoEdicao ? 'Salvar Edição' : 'Adicionar'}
      </button>
    </form>
  );
}

export default FormularioTarefa;
