import React from 'react';
import './FormularioTarefa.css';

function FormularioTarefa({ novaTarefa, setNovaTarefa, adicionarTarefa, modoEdicao }) {
  return (
    <div className="form-tarefa">
      <input
        type="text"
        placeholder="Título da tarefa"
        value={novaTarefa.titulo}
        onChange={(e) => setNovaTarefa({ ...novaTarefa, titulo: e.target.value })}
      />

      <textarea
        placeholder="Descrição (opcional)"
        value={novaTarefa.descricao}
        onChange={(e) => setNovaTarefa({ ...novaTarefa, descricao: e.target.value })}
      />

      <select
        value={novaTarefa.prioridade}
        onChange={(e) => setNovaTarefa({ ...novaTarefa, prioridade: e.target.value })}
      >
        <option value="baixa">Baixa</option>
        <option value="media">Média</option>
        <option value="alta">Alta</option>
      </select>

      <input
        type="datetime-local"
        value={novaTarefa.dataLimite ? new Date(novaTarefa.dataLimite).toISOString().slice(0, 16) : ''}
        onChange={(e) => {
          const d = new Date(e.target.value);
          d.setHours(23, 59, 59, 999); // sempre final do dia
          setNovaTarefa({ ...novaTarefa, dataLimite: d.toISOString() }); // SALVA como ISO completo
        }}
      />

      <button onClick={adicionarTarefa}>
        {modoEdicao ? 'Salvar Edição' : 'Adicionar'}
      </button>
    </div>
  );
}

export default FormularioTarefa;
