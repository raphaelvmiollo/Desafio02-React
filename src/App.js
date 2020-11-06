import React, {useState, useEffect} from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(()=>{
    api.get("repositories").then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: `Meu novo repositório ${Date.now()}`,
      url: "http://url.com.br",
    	techs: [ "nodeJs", "CSS", "TypeScript"]
    });
    const repository = response.data;
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(response => {
      const indexDelete = repositories.findIndex(repo =>  (repo.id === id));
      repositories.splice(indexDelete, 1);
      console.log(repositories)
      setRepositories([...repositories]);
    }

    );

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
          <li key={repo.id}>
          {repo.title}
          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
        </li>
        ))}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
