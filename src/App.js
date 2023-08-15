import { useEffect, useState } from 'react';
import './App.scss';
import axios from 'axios';

function App() {
  const [personagem, setPersonagem] = useState('')
  const [personagens, setPersonagens] = useState('')
  const timeStamp = 1
  const md5 = 'ee629e82af2f6361f6dd4b595cbbac65'
  const apiKey = '5ab6bf27b33beb412a6d7191c1491786'
  const [hoveredItem, setHoveredItem] = useState(null)



  const handleMouseEnter = (index) => {
    setHoveredItem(index);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  async function Buscar() {
    let url = ''

    if (personagem != '') {
      url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timeStamp}&apikey=${apiKey}&hash=${md5}&limit=10&nameStartsWith=${personagem}&orderBy=name`
      console.log(url)
    }

    else {
      url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timeStamp}&apikey=${apiKey}&hash=${md5}&limit=10&orderBy=name`
    }

    let response = await axios.get(url)
    setPersonagens(response.data.data.results)
  }

  {
    useEffect(() => {
      { Buscar() }
    }, [personagem])
  }

  return (
    <div className="mae">
      <section className='header'>
        <img src='/marvel.png' />
        <div className='header-right-side'>
          <div className='header-menu'>
            <a>Home</a>
            <a>Personagens</a>
            <a>Quadrinhos</a>
            <a>Eventos</a>
            <a>Contatos</a>
          </div>
          <img src='/icon.png' />

        </div>
      </section>

      <section className='mid-content'>
        <div className='mid-content-row'>
          <h1>Personagens da MARVEL</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elementum augue ut ligula malesuada blandit. Quisque tempor ex quis congue malesuada. Pellentesque est eros, aliquam non malesuada et, molestie ut purus.</p>
        </div>
        <div className='mid-content-input'>
          <label>Nome</label>
          <input type='text' placeholder='Insira o personagem' value={personagem} onChange={e => setPersonagem(e.target.value)} />
        </div>
      </section>

      <section className='content'>
        {personagens &&
          personagens.map((item, index) => (
            <div
              key={index}
              className={index === hoveredItem ? 'content-box-hovered' : 'content-box'}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}>
              <img onClick={console.log(item.thumbnail.path + '.' + item.thumbnail.extension)} src={item.thumbnail.path + '.' + item.thumbnail.extension} />
              <h1>{item.name}</h1>
              <p
                key={index}
                className={index === hoveredItem ? 'p-hovered' : 'p-not-hovered'}>
                {item.description}
              </p>
            </div>
          ))}
      </section>
    </div>
  )
}

export default App;
