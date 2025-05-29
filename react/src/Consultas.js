import axios from 'axios';

export class Consultas {
    static #instance = null;

    constructor() {
        if (Consultas.#instance !== null) {
            throw new Error("Consultas es una clase singleton. Utiliza Consultas.getInstance() para obtener la instancia.");
        }
        Consultas.#instance = this;
    }

    toggle(id) {
        let pestana = document.getElementById(id);
        if (pestana.style.display === "none") {
            pestana.style.display = "block";
        } else {
            pestana.style.display = "none";
        }
    }

    static getInstance() {
        if (Consultas.#instance === null) {
            Consultas.#instance = new Consultas();
        }
        return Consultas.#instance;
    }

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

    async consulta(endpoint, actualizarResultado) {
        try {
            //hacemos la consulta a restcountries.com
            const url = `https://restcountries.com/v3.1/${endpoint}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("No se ha encontrado ningún país.");
            }
            const json = await response.json();
            actualizarResultado(json);
            this.toggle('pestana');

            //creamos los datos a enviar a nuestro servidor de estadísticas.
            const tipoConsulta = this.parse(endpoint);
            let paramUsado = endpoint.substring(tipoConsulta.length + 1);

            const datos = {
                tipoConsulta: tipoConsulta,
                paramUsado: paramUsado ? paramUsado : 'Consulta general',
                fechaHora: new Date().toISOString().slice(0, 19).replace('T', ' '),
                ip: (await axios.get('https://api.ipify.org?format=json')).data.ip
            }

            //enviamos los datos al servidor.
            await this.enviarDatos(datos);

        } catch (error) {
            alert(error.message);
        }
    }

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