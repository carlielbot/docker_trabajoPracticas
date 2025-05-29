import { Queries } from "./Query.js";
import axios from 'axios';

/**
 * Filters class for managing country queries.
 * This class is a singleton and provides methods to filter countries by language, population range, name, and region.
 */
export class Filters {
    static #instance = null;
    #queriesInstance;

    constructor() {
        if (Filters.#instance !== null) {
            throw new Error("Filters is a singleton class. Use Filters.getInstance() to get the instance.");
        }
        Filters.#instance = this;
        this.#queriesInstance = Queries.getInstance();
    }

    static getInstance() {
        if (Filters.#instance === null) {
            Filters.#instance = new Filters();
        }
        return Filters.#instance;
    }

    async filterByLanguage(language, updateResult) {
        if (!language) {
            alert("Please enter a language in English.");
            return;
        }

        await this.#queriesInstance.query(`lang/${language}`, updateResult);
        this.#clearField("inputLanguage");
        this.#queriesInstance.toggle('language');
    }

    async filterByPopulationRange(min, max, updateResult) {
        if (isNaN(min) || isNaN(max) || min < 0 || max < min) {
            alert("Please enter a valid population range.");
            return;
        }

        try {
            const url = `https://restcountries.com/v3.1/all`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Error fetching countries.");
            }

            const json = await response.json();
            const filteredCountries = json.filter(
                (country) => country.population >= min && country.population <= max
            );

            if (filteredCountries.length === 0) {
                throw new Error("No countries found in the specified population range.");
            }

            updateResult(filteredCountries);

            // Prepare data to send to our statistics server.
            const data = {
                queryType: 'with min and max',
                paramUsed: `min: ${min} and max: ${max}`,
                dateTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
                ip: (await axios.get('https://api.ipify.org?format=json')).data.ip
            }

            // Send data to the server.
            await this.#queriesInstance.sendData(data);

            this.#queriesInstance.toggle('tab');
            this.#queriesInstance.toggle('minmax');
        } catch (error) {
            alert(error.message);
        }
    }

    async filterByCountry(country, updateResult) {
        if (!country) {
            alert("Please enter a country.");
            return;
        }

        await this.#queriesInstance.query(`name/${country}`, updateResult);
        this.#clearField("inputCountry");
        this.#queriesInstance.toggle("name");
    }

    async filterByRegion(region, updateResult) {
        if (!region) {
            alert("Please select a region.");
            return;
        }

        await this.#queriesInstance.query(`region/${region}`, updateResult);
        this.#queriesInstance.toggle("region");
    }

    #clearField(id) {
        const field = document.getElementById(id);
        if (field) {
            field.value = "";
        }
    }
}