import { FiSearch } from 'react-icons/fi'
import { useState } from 'react'

import './BuscarCEP.css'

import api from './services/api'

function BuscarCEP() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({});

  async function handleSearch() {

    if (input === '') {
      alert("Preencha algum cep");
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");

    } catch {
      alert("erro ao buscar CEP");
      setInput("")
    }

  }

  return (

    <div className="container">

      <h1 className='title'>Buscador CEP</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu CEP..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#000" />
        </button>

      </div>


      {/**Acessando a useState cep e verificando se tem alguma coisa dentro desse objeto */}
      {Object.keys(cep).length > 0 && (

        <main className="main">
          <h2>CEP: {cep.cep}</h2>

          <span>Rua: {cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>Cidade: {cep.localidade} - {cep.uf}</span>

        </main>

      )}


    </div>

  )
}

export default BuscarCEP
