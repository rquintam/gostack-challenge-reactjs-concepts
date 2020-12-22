import React, { useEffect, useState } from "react"
import api from './services/api'
import "./styles.css"

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      'title': 'My first API',
      'url': 'http://github.com/rquintam',
      'techs': [
        'Node.js', 'HTML', 'Javascript'
      ]
    })

    const repository = response.data

    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
    setRepositories(repositories.filter(
      repository => repository.id !== id
    ))
  }

  return (
    <div>
      <button onClick={handleAddRepository}>Adicionar</button>
      <ul data-testid="repository-list">
        {repositories.map(repository => <li key={repository.id}>
          {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>)}
      </ul>
    </div>
  )
}

export default App
