import './App.css';
import {Consultas} from './Consultas';
import {Filtros} from './Filtros';
import React, {useState} from 'react';

function App() {
    const consultasInstance = Consultas.getInstance();
    const filtrosInstance = Filtros.getInstance();

    const [resultado, setResultado] = useState([]);
    const [region, setRegion] = useState("");
    const [idioma, setIdioma] = useState("");
    const [minimo, setMinimo] = useState("");
    const [maximo, setMaximo] = useState("");
    const [pais, setPais] = useState("");

    return (
        <div className="app-container">
            <h1>Consultas API REST</h1>
            <br/><br/>
            <header>
                <button onClick={() => consultasInstance.toggle('pestana')}>Filtros</button>
                <a href="http://localhost/" className="btn">Ver estadisticas</a>
                <br/><br/>
                <div className="App" id='pestana'>
                    <button onClick={() => consultasInstance.consulta('all', setResultado)}>Consultar todos los países
                    </button>
                    <br/><br/>

                    <button onClick={() => consultasInstance.toggle('region')}>Filtrar por Región</button>
                    <br/><br/>
                    <div id='region' style={{display: 'none'}}>
                        <select
                            value={region}
                            onChange={(e) => setRegion(e.target.value)}
                        >
                            <option value="">Seleccionar una región</option>
                            <option value="asia">Asia</option>
                            <option value="europe">Europa</option>
                            <option value="africa">África</option>
                            <option value="americas">Américas</option>
                            <option value="oceania">Oceanía</option>
                        </select>
                        <button onClick={() => filtrosInstance.filtrarRegion(region, setResultado)}>
                            Buscar
                        </button>
                    </div>

                    <button onClick={() => consultasInstance.toggle('idioma')}>Filtrar por idioma</button>
                    <br/><br/>
                    <div id='idioma' style={{display: 'none'}}>
                        <input
                            type="text"
                            value={idioma}
                            onChange={(e) => setIdioma(e.target.value)}
                            placeholder="Idioma (en inglés)"
                        />
                        <button onClick={() => filtrosInstance.filtrarIdioma(idioma, setResultado)}>Buscar</button>
                        <br/><br/>
                    </div>

                    <button onClick={() => consultasInstance.toggle('minmax')}>Filtrar por poblacion</button>
                    <br/><br/>
                    <div id='minmax' style={{display: 'none'}}>
                        <input
                            type="number"
                            value={minimo}
                            onChange={(e) => setMinimo(e.target.value)}
                            placeholder="Población mínima"
                        />
                        <input
                            type="number"
                            value={maximo}
                            onChange={(e) => setMaximo(e.target.value)}
                            placeholder="Población máxima"
                        />
                        <button onClick={() => filtrosInstance.filtrarMinimo(minimo, maximo, setResultado)}>Buscar
                        </button>
                        <br/><br/>
                    </div>

                    <button onClick={() => consultasInstance.toggle('nombre')}>Filtrar por nombre del país</button>
                    <br/><br/>
                    <div id='nombre' style={{display: 'none'}}>
                        <input
                            type="text"
                            value={pais}
                            onChange={(e) => setPais(e.target.value)}
                            placeholder="Nombre del país"
                        />
                        <button onClick={() => filtrosInstance.filtrarPais(pais, setResultado)}>Buscar</button>
                        <br/><br/>
                    </div>

                </div>
                <br/>
            </header>
            <main>
                <div>
                    <h2>Resultados</h2>
                    {consultasInstance.cargarPaises(resultado)}
                </div>
            </main>
        </div>
    );
}

export default App;