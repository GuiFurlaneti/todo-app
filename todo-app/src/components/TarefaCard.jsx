// Importa o React para poder usar JSX
import React from 'react';

// Cria o componente de uma tarefa
function TarefaCard(props) {
  return (
    <div className="tarefa-card">
      {/* Checkbox para marcar como feito */}
      <input type="checkbox" />

      {/* Título da tarefa */}
      <span>{props.titulo}</span>

      {/* Botão de deletar */}
      <button className="btn-delete">🗑</button>
    </div>
  );
}

// Exporta o componente para poder usar no App
export default TarefaCard;
