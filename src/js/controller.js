import DisplayMainCharts from "./view/displayMainCharts.js";
import DisplayPowiatList from "./view/displayPowiatList.js";
import { GetCountryData, GetWojData, GetPowiatData } from "./helper.js";
import * as model from "./model.js";

const displayMainCharts = async function () {
  try {
    //Load data and display country stats
    await model.lodaCountryData(GetCountryData());
    await DisplayMainCharts.displayStats(model.state.country);
    //Load data and display woj stats on map
    await model.lodaWojData(GetWojData());
    await DisplayMainCharts.displayMap(model.state.woj);
    //Load Pow data
    await model.loadPowiatData(GetPowiatData());
    await DisplayPowiatList.renderPowFromLocalStorage(model.state.pow);
  } catch (err) {
    alert(err);
  }
};

const displayPowiatList = async function () {
  try {
    // await DisplayPowiatList.generatePowList(model.loadPowiatData);
    const data = await model.state.pow;
    DisplayPowiatList.generatePowList(data);
  } catch (err) {
    alert(err);
  }
};

const generateNewPow = async function () {
  DisplayPowiatList.getMarkedPow(model.state.pow);
  DisplayPowiatList.addHanlderRemovePow();
};

const init = (function () {
  displayMainCharts();
  DisplayPowiatList.addHandlerClickPow(model.state.pow);
  DisplayPowiatList.addHandlerRender(displayPowiatList);
  DisplayPowiatList.addHandlerAddPow(generateNewPow);
})();
