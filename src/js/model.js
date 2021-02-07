export const state = {
  contry: {},
  woj: {},
  pow: {},
};

export const lodaCountryData = async function (data) {
  await data.then((data) => {
    const country = data.features[0].attributes;
    state.country = {
      zakarzenia: country.ZAKAZENIA_DZIENNE,
      ozdrowienia: country.LICZBA_OZDROWIENCOW,
      testy: country.TESTY,
      zgony: country.ZGONY_DZIENNE,
    };
  });

  //console.log(state.country);
};

export const lodaWojData = async function (data) {
  await data.then((data) => {
    const woj = data.features
      .map((wo) => wo.attributes)
      .map((wo) => ({ name: wo.jpt_nazwa_, num: wo.potwierdzone_dzienne_sum }));
    state.woj = woj;
  });
  //console.log(state.country);
};

export const loadPowiatData = async function (data) {
  await data.then((data) => {
    const pow = data.features
      .map((el) => el.attributes)
      .map((pow) => ({
        name: pow.JPT_NAZWA_,
        zakarzenia: pow.POTWIERDZONE_DZIENNE,
        kwarantanna: pow.KWARANTANNA,
        testy: pow.TESTY,
        zgony: pow.ZGONY,
      }));
    state.pow = pow;
    console.log(state.pow);
  });
};
