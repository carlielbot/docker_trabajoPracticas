import './App.css';
import {Queries} from './Query';
import {Filters} from './Filter';
import {useState} from 'react';

function App() {
    const queryInstance = Queries.getInstance();
    const filterInstance = Filters.getInstance();

    const [result, setResult] = useState([]);
    const [region, setRegion] = useState("");
    const [language, setLanguage] = useState("");
    const [minimum, setMinimum] = useState("");
    const [maximum, setMaximum] = useState("");
    const [country, setCountry] = useState("");

    return (
        <div className="app-container">
            <h1>Consultas API REST</h1>
            <br/><br/>
            <header>
                <button onClick={() => queryInstance.toggle('tab')}>Filters</button>
                <a href="http://localhost/" className="btn">See statistics</a>
                <br/><br/>
                <div className="App" id='tab'>
                    <button onClick={() => queryInstance.query('all', setResult)}>Consult all countries</button>
                    <br/><br/>

                    <button onClick={() => queryInstance.toggle('region')}>Filter by region</button>
                    <br/><br/>
                    <div id='region' style={{display: 'none'}}>
                        <select
                            value={region}
                            onChange={(e) => setRegion(e.target.value)}
                        >
                            <option value="">Select a region</option>
                            <option value="asia">Asia</option>
                            <option value="europe">Europe</option>
                            <option value="africa">Africa</option>
                            <option value="americas">America</option>
                            <option value="oceania">Oceania</option>
                        </select>
                        <button onClick={() => filterInstance.filterByRegion(region, setResult)}>
                            Search
                        </button>
                    </div>

                    <button onClick={() => queryInstance.toggle('language')}>Filter by language</button>
                    <br/><br/>
                    <div id='language' style={{display: 'none'}}>
                        <input
                            type="text"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            placeholder="Language (e.g., 'spanish')"
                        />
                        <button onClick={() => filterInstance.filterByLanguage(language, setResult)}>Search</button>
                        <br/><br/>
                    </div>

                    <button onClick={() => queryInstance.toggle('minmax')}>Filter by population</button>
                    <br/><br/>
                    <div id='minmax' style={{display: 'none'}}>
                        <input
                            type="number"
                            value={minimum}
                            onChange={(e) => setMinimum(e.target.value)}
                            placeholder="Minimum population"
                        />
                        <input
                            type="number"
                            value={maximum}
                            onChange={(e) => setMaximum(e.target.value)}
                            placeholder="Maximum population"
                        />
                        <button onClick={() => filterInstance.filterByPopulationRange(minimum, maximum, setResult)}>Search
                        </button>
                        <br/><br/>
                    </div>

                    <button onClick={() => queryInstance.toggle('name')}>Filter by country name</button>
                    <br/><br/>
                    <div id='name' style={{display: 'none'}}>
                        <input
                            type="text"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            placeholder="Country name"
                        />
                        <button onClick={() => filterInstance.filterByCountry(country, setResult)}>Search</button>
                        <br/><br/>
                    </div>

                </div>
                <br/>
            </header>
            <main>
                <div>
                    <h2>Results</h2>
                    {queryInstance.renderCountries(result)}
                </div>
            </main>
        </div>
    );
}

export default App;