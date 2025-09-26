import "./empty.style.css";

const Empty = () => {
  return (
    <section className="empty-container">
      <p>Ainda não tem tarefas cadastradas, adicione para começar!</p>
      <img src="/empty.png" alt="imagem de vazio" />
    </section>
  );
};

export default Empty;
