import axios from 'axios';
/**
 * Class Consultas, a singleton that manages API queries and puts up data on the main app.
 */
export class Consultas {
    static #instance = null;
    /**
     * Private constructor to enforce singleton pattern.
     * Throws an error if an instance already exists.
     */
    constructor() {
        if (Consultas.#instance !== null) {
            throw new Error("Consultas es una clase singleton. Utiliza Consultas.getInstance() para obtener la instancia.");
        }
        Consultas.#instance = this;
    }
    /**
     * Toggles the display of a tab with the given id.
     * @param {string} id - The id of the tab to toggle.
     */
    toggle(id) {
        let pestana = document.getElementById(id);
        if (pestana.style.display === "none") {
            pestana.style.display = "block";
        } else {
            pestana.style.display = "none";
        }
    }
    /**
     * Static method to get the singleton instance of Consultas.
     * If the instance does not exist, it creates a new one.
     * @returns {Consultas} The singleton instance of Consultas.
     */
    static getInstance() {
        if (Consultas.#instance === null) {
            Consultas.#instance = new Consultas();
        }
        return Consultas.#instance;
    }
    /**
     * Sends data to the server via a POST request.
     * @param {Object} datos - The data to send.
     * @returns The response data from the server.
     */
    async enviarDatos (datos) {
        try {
            const respuesta = await axios.post('http://localhost/api/consultas', datos);

            if (respuesta.status === 200) {
                console.log('Datos enviados exitosamente');
                return respuesta.data;
            }
        } catch (error) {
            console.error('Error al enviar datos:', error);
            throw error;
        }
    };
    /**
     * Auxiliary method to parse the endpoint string and extract the type of query.
     * It looks for the first '/' character to determine the type of query.
     * @param {*} endpoint The endpoint string to parse.
     * @returns The type of query as a string.
     */
    parse(endpoint){
        let tipoConsulta = '';
        let encontrado = false;
        let concatenar = '';
        for (let i = 0; !encontrado && i < endpoint.length; i++) {
            if ((concatenar = endpoint.substring(i, i+1)) === ('/')) {
                encontrado = true;
            } else {
                tipoConsulta = tipoConsulta.concat(concatenar);
            }
        }
        return tipoConsulta;
    }
    /**
     * Makes a query to the REST API and updates the result.
     * @param {string} endpoint - The endpoint to query.
     * @param {function} actualizarResultado - Function to update the result in the main app.
     * @throws {Error} If the endpoint is empty or if the response is not ok.
     */
    async consulta(endpoint, actualizarResultado) {
        try {
            //Make the request to the REST API.
            if (!endpoint) {
                throw new Error("El endpoint no puede estar vacío.");
            }
            const url = `https://restcountries.com/v3.1/${endpoint}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("No se ha encontrado ningún país.");
            }
            const json = await response.json();
            actualizarResultado(json);
            this.toggle('pestana');

            //create the query data to send to the server.
            const tipoConsulta = this.parse(endpoint);
            let paramUsado = endpoint.substring(tipoConsulta.length + 1);

            const datos = {
                tipoConsulta: tipoConsulta,
                paramUsado: paramUsado ? paramUsado : 'Consulta general',
                fechaHora: new Date().toISOString().slice(0, 19).replace('T', ' '),
                ip: (await axios.get('https://api.ipify.org?format=json')).data.ip
            }

            //send the data to the server.
            await this.enviarDatos(datos);

        } catch (error) {
            alert(error.message);
        }
    }
    /**
     * Renders the countries data in the main app.
     * @param {Array} pais - The array of country objects to render.
     * @returns The cards for display on the main app.
     */
    cargarPaises(pais) {
        return pais.map((country) => (
            <div className="country" key={country.name.common}>
                <h4>{country.name.common}</h4>
                <img src={country.flags.png} alt={`${country.name.common} flag`} className='flag'/>
                <p>Capital: {country.capital ? country.capital[0] : 'N/A'}</p>
                <p>Región: {country.region}</p>
                <p>Subregión: {country.subregion}</p>
                <p>Población: {country.population.toLocaleString()} habitantes</p>
            </div>
        ));
    }
}