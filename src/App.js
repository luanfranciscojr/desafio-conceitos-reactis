import React, { useEffect, useState } from "react";

import "./styles.css";
import api from "./services/api";

function App() {

  const [repositories, setRepositories] = useState([])
  async function handleAddRepository() {
    const repository = await api.post('/repositories', {
      title: `Novo Repository ${Date.now()} `,
      url: 'teste.url',
      techs: ['luan'],
    });
    setRepositories([...repositories, repository.data]);
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`).then(() => {
      console.log('teste');
      const index = repositories.findIndex(repositorie => repositorie.id === id);
      if (index !== -1) {
        const repositoriesCopy = [...repositories];
        repositoriesCopy.splice(index, 1);
        setRepositories(repositoriesCopy);
      }
    });

  }

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })

  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => <li key={repository.id}>
          {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
