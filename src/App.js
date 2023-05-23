import { useState, useEffect } from "react";

import './App.css';

const MyForm = () => {
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:8080/?id=crawl/${name}`)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Enter website name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <input type="submit" />
    </form>
  )
}

const App = () => {
  const [screenShotList, setScreenShotList] = useState([])
  const [spinner, setSpinner] = useState(false)

  useEffect(() => {
    fetch('http://localhost:8080/?id=fileprint')
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message)
        setScreenShotList(data.message)
        setSpinner(true)
      })
  }, [])

  const fetch_api = (props) => {
    console.log(props)
    setSpinner(false)
    fetch(`http://localhost:8080/?id=crawl/${props}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.message === true) setSpinner(true)
      })
  }

  const delete_img = (index, value) => {
    fetch(`http://localhost:8080/?id=delete_img/${index}%${value}`)
  }

  return (
    <div className="App">
      <MyForm />
      <div className="navbar">
        <button className="button" onClick={() => (fetch_api('webhallen.se'))}>Fetch webhallen</button>
        <button className="button" onClick={() => (fetch_api('prisjakt.se'))}>Fetch prisjakt</button>
      </div>

      {spinner ?
        <div className="img_container">
          {screenShotList.map((value, index) => {
            try {
              return (
                <img key={index} src={"http://localhost:8000/screenshots/" + value} alt={value} width={250} onClick={() => delete_img(index, value)} />
              );
            } catch (e) {
              console.error(e)
              return null;
            }
          })}
        </div>
        :
        <p>Loading...</p>
      }

    </div>
  );
}

export default App;
