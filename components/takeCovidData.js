const axios = require("axios");
require("dotenv/config");

module.exports = covidData = (country_id = undefined) => {
  return axios({
    method: "GET",
    url: "https://covid-19-dados-abertos.p.rapidapi.com/covid/v1.0/all",
    headers: {
      "content-type": "application/octet-stream",
      "x-rapidapi-host": "covid-19-dados-abertos.p.rapidapi.com",
      "x-rapidapi-key": process.env.X_RAPIDAPI_KEY
    }
  }).then(async response => {
    const data = response.data;
    if (!country_id) {
      const countries = [];
      Object.keys(data).forEach(item => {
        const country = data[item].country.pais_PT;
        const covid_cases = data[item].covid_data.casos;
        const covid_recent_cases = data[item].covid_data.casos_de_hoje;
        const fatalities = data[item].covid_data.fatalidades;
        const recent_fatalities = data[item].covid_data.fatalidades_de_hoje;
        const recovered_patients = data[item].covid_data.pacientes_recuperados;
        const critical_patients = data[item].covid_data.pacientes_criticos;
        const fatalities_tax = data[item].covid_data.taxa_de_fatalidades;
        const recovered_tax = data[item].covid_data.taxa_de_recuperacao;

        const item_data = {
          id: item,
          country,
          data: {
            covid_cases,
            covid_recent_cases,
            fatalities,
            recent_fatalities,
            recovered_patients,
            critical_patients,
            fatalities_tax,
            recovered_tax
          }
        };

        countries.push(item_data);
      });

      const sorted_countries = sortObjArray(countries);
      return sorted_countries;
    } else {
      const country = data[country_id].country.pais_PT;
      const casos_covid = data[country_id].covid_data.casos;
      const casos_de_hoje = data[country_id].covid_data.casos_de_hoje;
      const fatalidades = data[country_id].covid_data.fatalidades;
      const fatalidades_de_hoje =
        data[country_id].covid_data.fatalidades_de_hoje;
      const pacientes_recuperados =
        data[country_id].covid_data.pacientes_recuperados;
      const pacientes_criticos = data[country_id].covid_data.pacientes_criticos;
      const taxa_de_fatalidades =
        data[country_id].covid_data.taxa_de_fatalidades;
      const taxa_de_recuperacao =
        data[country_id].covid_data.taxa_de_recuperacao;
      const flag = data[country_id].multimedia.url_da_bandeira;

      const item_data = {
        country,
        flag,
        data: {
          casos_covid,
          casos_de_hoje,
          fatalidades,
          fatalidades_de_hoje,
          pacientes_recuperados,
          pacientes_criticos,
          taxa_de_fatalidades,
          taxa_de_recuperacao
        }
      };

      return item_data;
    }
  });
};

function sortObjArray(objArray) {
  return objArray.sort((a, b) => {
    const element_a = a.country.toUpperCase();
    const element_b = b.country.toUpperCase();

    return element_a < element_b ? -1 : element_a > element_b ? 1 : 0;
  });
}
