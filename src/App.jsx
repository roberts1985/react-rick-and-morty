import { useEffect, useState } from 'react'
import './App.css'

const url = 'https://rickandmortyapi.com/api/character/?name='

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [character, setCharacter] = useState({})

  useEffect(() => {
    
    if (search.trim()==='' || search.length < 4) {
      setIsLoading(false)
      return
    }
    setIsLoading(true)

    fetch(url + search)
      .then(response => response.json())
      .then(data => {
        const { results } = data
        const { name, species, image } = results[0]
        setCharacter({
          nombre: name,
          especie: species,
          imagen: image
        })
      })
  }, [search])

  console.log(search)
  const handleText = (e) => {
    setSearch(e.target.value.toLowerCase())
  }

  return (
    <>
      <div className='container-lg vw-100 vh-100'>
        <div className='row w-100 p-3'>
          <div className='col-md-5 offset-md-4 rounded'>
            <div className='d-flex flex-column'>
              <input onChange={handleText}
                value={search} />
              <button className='mt-3 btn btn-primary'>Agregar</button>
            </div>
          </div>
        </div>

        <div className='row w-100'>
          <div className='col-md-5 offset-md-4'>
            <div className='card'>
              {!isLoading && <p>loading... </p>}
              {console.log(isLoading)}
              {isLoading && (
                <>
                  <img src={character.imagen} className='card-img-top' alt="" />
                  <p className='card-text'>Nombre: {character.nombre}</p>
                  <p className='card-text'>Especie: {character.especie}</p>
                </>
              )}
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
