import { Consultas } from "./Consultas.js";
import axios from 'axios';

export class Filtros {
    static #instance = null;
    #consultasInstance;

    constructor() {
        if (Filtros.#instance !== null) {
            throw new Error("Filtros is a singleton class. Use Filtros.getInstance() to get the instance.");
        }
        Filtros.#instance = this;
        this.#consultasInstance = Consultas.getInstance();
    }

    static getInstance() {
        if (Filtros.#instance === null) {
            Filtros.#instance = new Filtros();
        }
        return Filtros.#instance;
    }

    async filtrarIdioma(idioma, actualizarResultado) {
        if (!idioma) {
            alert("Por favor, ingrese un idioma en inglés.");
            return;
        }

        await this.#consultasInstance.consulta(`lang/${idioma}`, actualizarResultado);
        this.#limpiarCampo("inputIdioma");
        this.#consultasInstance.toggle('idioma');
    }

    async filtrarMinimo(min, max, actualizarResultado) {

        if (isNaN(min) || isNaN(max) || min < 0 || max < min) {
            alert("Por favor, ingrese un rango de población válido.");
            return;
        }

        try {
            //hacemos la consulta a restcountries.com
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

            //creamos los datos a enviar a nuestro servidor de estadísticas.
            const datos = {
                tipoConsulta: 'con mínimo y máximo',
                paramUsado: `por mínimo: ${min} y máximo: ${max}`,
                fechaHora: new Date().toISOString().slice(0, 19).replace('T', ' '),
                ip: (await axios.get('https://api.ipify.org?format=json')).data.ip
            }

            //enviamos los datos al servidor.
            await this.#consultasInstance.enviarDatos(datos);


            this.#consultasInstance.toggle('pestana');
            this.#consultasInstance.toggle('minmax');
        } catch (error) {
            alert(error.message);
        }
    }

    async filtrarPais(pais, actualizarResultado) {
        if (!pais) {
            alert("Por favor, ingrese un país.");
            return;
        }

        await this.#consultasInstance.consulta(`name/${pais}`, actualizarResultado);
        this.#limpiarCampo("input");
        this.#consultasInstance.toggle("nombre");
    }

    async filtrarRegion(region, actualizarResultado) {
        if (!region) {
            alert("Por favor, seleccione una región.");
            return;
        }

        await this.#consultasInstance.consulta(`region/${region}`, actualizarResultado);
        this.#consultasInstance.toggle("region");
    }

    #limpiarCampo(id) {
        const campo = document.getElementById(id);
        if (campo) {
            campo.value = "";
        }
    }
}