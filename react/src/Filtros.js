import { Consultas } from "./Consultas.js";
import axios from 'axios';
/**
 * Filtros is a singleton class that provides methods to filter countries based on various criteria.
 * It uses the Consultas class to perform API requests and handle the results.
 */
export class Filtros {
    static #instance = null;
    #consultasInstance;
    /**
     * Private constructor to enforce singleton pattern.
     * Throws an error if an instance already exists.
     */
    constructor() {
        if (Filtros.#instance !== null) {
            throw new Error("Filtros is a singleton class. Use Filtros.getInstance() to get the instance.");
        }
        Filtros.#instance = this;
        this.#consultasInstance = Consultas.getInstance();
    }
    /**
     * Static method to get the singleton instance of Filtros.
     * If the instance does not exist, it creates a new one.
     * @returns {Filtros} The singleton instance of Filtros.
     */
    static getInstance() {
        if (Filtros.#instance === null) {
            Filtros.#instance = new Filtros();
        }
        return Filtros.#instance;
    }
    /**
     * Filters countries by language.
     * @param {string} idioma - The language to filter by.
     * @param {function} actualizarResultado - Callback function to update the results.
     */
    async filtrarIdioma(idioma, actualizarResultado) {
        if (!idioma) {
            alert("Por favor, ingrese un idioma en inglés.");
            return;
        }

        await this.#consultasInstance.consulta(`lang/${idioma}`, actualizarResultado);
        this.#limpiarCampo("inputIdioma");
        this.#consultasInstance.toggle('idioma');
    }
    /**
     * Filters countries by population range.
     * @param {number} min - Minimum population.
     * @param {number} max - Maximum population.
     * @param {function} actualizarResultado - Callback function to update the results.
     */
    async filtrarMinimo(min, max, actualizarResultado) {

        if (isNaN(min) || isNaN(max) || min < 0 || max < min) {
            alert("Por favor, ingrese un rango de población válido.");
            return;
        }

        try {
            //Make the request to the REST Countries API to get all countries.
            const url = `https://restcountries.com/v3.1/all`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Error al obtener los países.");
            }

            const json = await response.json();
            const paisesFiltrados = json.filter(
                (pais) => pais.population >= min && pais.population <= max
            );

            if (paisesFiltrados.length === 0) {
                throw new Error("No se encontraron países en el rango de población especificado.");
            }

            actualizarResultado(paisesFiltrados);

            //Create the data object to send to the server.
            const datos = {
                tipoConsulta: 'con mínimo y máximo',
                paramUsado: `por mínimo: ${min} y máximo: ${max}`,
                fechaHora: new Date().toISOString().slice(0, 19).replace('T', ' '),
                ip: (await axios.get('https://api.ipify.org?format=json')).data.ip
            }

            //Send the data to the server.
            await this.#consultasInstance.enviarDatos(datos);


            this.#consultasInstance.toggle('pestana');
            this.#consultasInstance.toggle('minmax');
        } catch (error) {
            alert(error.message);
        }
    }
    /**
     * Filters countries by name.
     * @param {string} pais - The name of the country to filter by.
     * @param {function} actualizarResultado - Callback function to update the results.
     * @throws {Error} If the country name is empty or if no country is found.
     */
    async filtrarPais(pais, actualizarResultado) {
        if (!pais) {
            alert("Por favor, ingrese un país.");
            return;
        }

        await this.#consultasInstance.consulta(`name/${pais}`, actualizarResultado);
        this.#limpiarCampo("input");
        this.#consultasInstance.toggle("nombre");
    }
    /**
     * Filters countries by region.
     * @param {string} region - The region to filter by.
     * @param {function} actualizarResultado - Callback function to update the results.
     * @throws {Error} If the region is not selected.
     */
    async filtrarRegion(region, actualizarResultado) {
        if (!region) {
            alert("Por favor, seleccione una región.");
            return;
        }

        await this.#consultasInstance.consulta(`region/${region}`, actualizarResultado);
        this.#consultasInstance.toggle("region");
    }
    /**
     * Clears the input field with the given ID.
     * @param {string} id - The ID of the input field to clear.
     */
    #limpiarCampo(id) {
        const campo = document.getElementById(id);
        if (campo) {
            campo.value = "";
        }
    }
}