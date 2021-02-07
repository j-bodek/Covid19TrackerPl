class DisplayPowiatList {
  _parentEl = document.querySelector(".pow-list");
  _close_btn = document.getElementById("close-btn");
  _open_btn = document.getElementById("btn-pow");
  _submit_btn = document.getElementById("add-btn");
  _powiaty = [];

  renderPowFromLocalStorage(data) {
    const localStorageData = JSON.parse(localStorage.getItem("powiaty"));
    if (!localStorageData) return;

    this._powiaty = localStorageData;
    this._powiaty.forEach((pow) => {
      const powObj = data.find(
        (el) => el.name.toLowerCase().replace("powiat ", "") === pow
      );
      this.renderNewPow(powObj);
    });
    this.addHanlderRemovePow();
  }

  renderPowList(markup) {
    document.querySelector(".pow-list").textContent = markup;
  }

  addHandlerClickPow() {
    // this._open_btn.addEventListener("click", function () {});

    this._parentEl.addEventListener("click", function (e) {
      const button = e.target.closest(".list-group-item");
      if (!button) return;
      button.classList.toggle("active");
    });

    this._close_btn.addEventListener("click", this.clearMarkedPow);
  }

  clearMarkedPow() {
    document
      .querySelectorAll(".list-group-item")
      .forEach((el) => el.classList.remove("active"));
  }

  addHandlerRender(handler) {
    this._open_btn.addEventListener("click", handler);
  }

  generatePowList(data) {
    const finalData = data
      .map((el) => el.name.replace("powiat ", "").toLowerCase())
      .sort();

    const markup = finalData.map(this.generatePowListPreview).join("");

    document
      .querySelector(".pow-list")
      .insertAdjacentHTML("afterbegin", markup);
  }

  generatePowListPreview(result) {
    return `<li class="list-group-item">${result}</li>`;
  }

  addHandlerAddPow(handler) {
    document.getElementById("add-btn").addEventListener("click", handler);
  }

  addHanlderRemovePow() {
    document.querySelectorAll(".remove-pow").forEach((pow) =>
      pow.addEventListener(
        "click",
        function (e) {
          const btn = e.target.closest("button");
          const removePow = btn.id.replace("powiat ", "").toLowerCase();
          console.log(removePow);
          this._powiaty.splice(
            this._powiaty.indexOf(removePow),
            this._powiaty.indexOf(removePow) + 1
          );
          localStorage.setItem("powiaty", JSON.stringify(this._powiaty));
          location.reload(); //Reload the page
        }.bind(this)
      )
    );
  }

  getMarkedPow(data) {
    const powList = this._parentEl.querySelectorAll(".active");
    powList.forEach((el) => {
      const choosenPow = el.textContent;
      if (this._powiaty.includes(choosenPow)) return;
      this._powiaty.push(choosenPow);
      localStorage.setItem("powiaty", JSON.stringify(this._powiaty));
      const powObj = data.find(
        (el) => el.name.toLowerCase().replace("powiat ", "") === choosenPow
      );
      this.renderNewPow(powObj);
    });
  }

  renderNewPow(pow) {
    document
      .querySelector(".container-fluid")
      .insertAdjacentHTML("beforeend", this.newPowMarkup(pow));
  }

  newPowMarkup(pow) {
    return `
    <div
    class="d-sm-flex align-items-center justify-content-between mb-4"
  >
    <h1 class="h3 mb-0 text-gray-800 pow-name">${pow.name}</h1>
    <button  id="${pow.name
      .replace("powiat ", "")
      .toLowerCase()}" class="btn btn-danger btn-sm remove-pow">Usuń Powiat</button>
  </div>

  <!-- Content Row -->
  <div class="row">
    <!-- Earnings (Monthly) Card Example -->
    <div class="col-xl-3 col-md-6 mb-4">
      <div class="card border-left-danger shadow h-100 py-2">
        <div class="card-body">
          <div class="row no-gutters align-items-center">
            <div class="col mr-2">
              <div
                class="text-xs font-weight-bold text-danger text-uppercase mb-1"
              >
                Liczba zakarzeń
              </div>
              <div
                id="zakarzenia"
                class="h5 mb-0 font-weight-bold text-gray-800"
              >${pow.zakarzenia}</div>
            </div>
            <div class="col-auto">
              <!-- <i class="fas fa-calendar fa-2x text-gray-300"></i> -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Earnings (Monthly) Card Example -->
    <div class="col-xl-3 col-md-6 mb-4">
      <div class="card border-left-warning shadow h-100 py-2">
        <div class="card-body">
          <div class="row no-gutters align-items-center">
            <div class="col mr-2">
              <div
                class="text-xs font-weight-bold text-warning text-uppercase mb-1"
              >
                Ilość osób objętych kwarantanną
              </div>
              <div
                class="h5 mb-0 font-weight-bold text-gray-800"
              >${pow.kwarantanna}</div>
            </div>
            <div class="col-auto">
              <!-- <i class="fas fa-dollar-sign fa-2x text-gray-300"></i> -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Earnings (Monthly) Card Example -->
    <div class="col-xl-3 col-md-6 mb-4">
      <div class="card border-left-primary shadow h-100 py-2">
        <div class="card-body">
          <div class="row no-gutters align-items-center">
            <div class="col mr-2">
              <div
                class="text-xs font-weight-bold text-primary text-uppercase mb-1"
              >
                Liczba Testów
              </div>
              <div class="row no-gutters align-items-center">
                <div class="col-auto">
                  <div
                    class="h5 mb-0 mr-3 font-weight-bold text-gray-800"
                  >${pow.testy}</div>
                </div>
              </div>
            </div>
            <div class="col-auto">
              <!-- <i
                class="fas fa-clipboard-list fa-2x text-gray-300"
              ></i> -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pending Requests Card Example -->
    <div class="col-xl-3 col-md-6 mb-4">
      <div class="card border-left-dark shadow h-100 py-2">
        <div class="card-body">
          <div class="row no-gutters align-items-center">
            <div class="col mr-2">
              <div
                class="text-xs font-weight-bold text-dark text-uppercase mb-1"
              >
                Liczba zgonów
              </div>
              <div
                class="h5 mb-0 font-weight-bold text-gray-800"
              >${pow.zgony}</div>
            </div>
            <div class="col-auto">
              <!-- <i class="fas fa-comments fa-2x text-gray-300"></i> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

      `;
  }
}

export default new DisplayPowiatList();
