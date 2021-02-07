export const GetCountryData = async function () {
  try {
    const request = fetch(
      "https://services9.arcgis.com/RykcEgwHWuMsJXPj/arcgis/rest/services/global_corona_actual_widok2/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&resultOffset=0&resultRecordCount=1&resultType=standard&cacheHint=true"
    );

    const data = await request.then((response) => response.json());
    return data;
    //data.features[0].attributes
  } catch (err) {
    alert("Internet connection error. Try again!");
  }
};

export const GetWojData = async function () {
  try {
    const request = fetch(
      "https://services9.arcgis.com/RykcEgwHWuMsJXPj/arcgis/rest/services/wojewodztwa_corona_widok/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&returnDistinctValues=false&returnIdsOnly=false&returnCountOnly=false&outFields=*&sqlFormat=standard&orderByFields=jpt_nazwa_%20DESC&groupByFieldsForStatistics=jpt_nazwa_&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22potwierdzone_dzienne%22%2C%22outStatisticFieldName%22%3A%22potwierdzone_dzienne_sum%22%7D%5D"
    );

    const data = await request.then((response) => response.json());
    return data;
    //data.features
  } catch (err) {
    alert("Internet connection error. Try again!");
  }
};

export const GetPowiatData = async function () {
  try {
    const request = fetch(
      "https://services9.arcgis.com/RykcEgwHWuMsJXPj/arcgis/rest/services/powiaty_corona_widok_woj/FeatureServer/0/query?f=json&where=1%3D1&outFields=*&resultRecordCount=400"
    );
    const data = await request.then((response) => response.json());
    return data;
  } catch (err) {
    alert("Internet connection error. Try again!");
  }
};
