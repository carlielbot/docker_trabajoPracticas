import axios from 'axios';

export class Queries {
    static #instance = null;

    constructor() {
        if (Queries.#instance !== null) {
            throw new Error("Queries is a singleton class. Use Queries.getInstance() to get the instance.");
        }
        Queries.#instance = this;
    }

    toggle(id) {
        let tab = document.getElementById(id);
        if (tab.style.display === "none") {
            tab.style.display = "block";
        } else {
            tab.style.display = "none";
        }
    }

    static getInstance() {
        if (Queries.#instance === null) {
            Queries.#instance = new Queries();
        }
        return Queries.#instance;
    }

    async sendData(data) {
        try {
            const response = await axios.post('http://localhost/api/queries', data, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                console.log('Data sent successfully');
                return response.data;
            }
        } catch (error) {
            console.error('Error sending data:', error);
            throw error;
        }
    };

    parse(endpoint) {
        let queryType = '';
        let found = false;
        let concat = '';
        for (let i = 0; !found && i < endpoint.length; i++) {
            if ((concat = endpoint.substring(i, i + 1)) === ('/')) {
                found = true;
            } else {
                queryType = queryType.concat(concat);
            }
        }
        return queryType;
    }

    async query(endpoint, updateResult) {
        try {
            // Query restcountries.com
            const url = `https://restcountries.com/v3.1/${endpoint}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("No country found.");
            }
            const json = await response.json();
            updateResult(json);
            this.toggle('tab');

            // Prepare data to send to our statistics server.
            const queryType = this.parse(endpoint);
            let param = endpoint.substring(queryType.length + 1);

            const data = {
                queryType: queryType,
                paramUsed: param ? param : 'General query',
                dateTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
                ip: (await axios.get('https://api.ipify.org?format=json')).data.ip
            }

            // Send data to the server.
            await this.sendData(data);

        } catch (error) {
            alert(error.message);
        }
    }

    renderCountries(countries) {
        return countries.map((country) => (
            <div className="country" key={country.name.common}>
                <h4>{country.name.common}</h4>
                <img src={country.flags.png} alt={`${country.name.common} flag`} className='flag'/>
                <p>Capital: {country.capital ? country.capital[0] : 'N/A'}</p>
                <p>Region: {country.region}</p>
                <p>Subregion: {country.subregion}</p>
                <p>Population: {country.population.toLocaleString()} inhabitants</p>
            </div>
        ));
    }
}