class DisplayMainCharts {
  _data;

  //Display stats
  displayStats(data) {
    document.getElementById("zakarzenia").textContent = data.zakarzenia;
    document.getElementById("ozdrowienia").textContent = data.ozdrowienia;
    document.getElementById("testy").textContent = data.testy;
    document.getElementById("zgony").textContent = data.zgony;

    const ctx = document.getElementById("myAreaChart");
    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["L.Zakarzeń", "L.Wyzdrowień", "L.Testów", "L.Zgonów"],
        datasets: [
          {
            label: "",
            data: [data.zakarzenia, data.ozdrowienia, data.testy, data.zgony],
            backgroundColor: [
              "rgb(231, 74, 59, 0.6)",
              "rgb(28, 200, 138, 0.6)",
              "rgb(78, 115, 223, 0.6)",
              "rgb(90, 92, 105, 0.6)",
            ],
            borderColor: [
              "rgb(231, 74, 59)",
              "rgb(28, 200, 138)",
              "rgb(78, 115, 223)",
              "rgb(90, 92, 105)",
            ],
            borderWidth: 2,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
        legend: {
          display: false,
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem) {
              return tooltipItem.yLabel;
            },
          },
        },
      },
    });
  }

  //Display map
  displayMap(stats) {
    am4core.ready(function () {
      // Themes begin
      am4core.useTheme(am4themes_dataviz);
      am4core.useTheme(am4themes_animated);
      // Themes end

      const title = "";

      // Create map instance
      var chart = am4core.create("chartdiv", am4maps.MapChart);

      chart.titles.create().text = title;

      // Set map definition
      chart.geodataSource.url =
        "https://www.amcharts.com/lib/4/geodata/json/polandHigh.json";
      chart.geodataSource.events.on("parseended", function (ev) {
        var data = [];
        for (var i = 0; i < ev.target.data.features.length; i++) {
          //Find Powiat by name
          const powiat = stats.find(
            (pow) =>
              pow.name ===
              ev.target.data.features[i].properties.name.toLowerCase()
          );

          data.push({
            id: ev.target.data.features[i].id,
            value: powiat.num,
          });
        }
        polygonSeries.data = data;
      });

      // Set projection
      chart.projection = new am4maps.projections.Mercator();

      // Create map polygon series
      var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

      //Set min/max fill color for each area
      polygonSeries.heatRules.push({
        property: "fill",
        target: polygonSeries.mapPolygons.template,
        min: chart.colors.getIndex(1).brighten(1),
        max: chart.colors.getIndex(1).brighten(-0.3),
      });

      // Make map load polygon data (state shapes and names) from GeoJSON
      polygonSeries.useGeodata = true;

      // Set up heat legend
      let heatLegend = chart.createChild(am4maps.HeatLegend);
      heatLegend.series = polygonSeries;
      heatLegend.align = "right";
      heatLegend.width = am4core.percent(15);
      heatLegend.marginRight = am4core.percent(10);
      heatLegend.minValue = 0;
      heatLegend.maxValue = 10000;
      heatLegend.valign = "bottom";

      // Blank out internal heat legend value axis labels
      heatLegend.valueAxis.renderer.labels.template.adapter.add(
        "text",
        function (labelText) {
          return "";
        }
      );

      // Configure series tooltip
      var polygonTemplate = polygonSeries.mapPolygons.template;
      polygonTemplate.tooltipText = "{name}: {value}";
      polygonTemplate.nonScalingStroke = true;
      polygonTemplate.strokeWidth = 0.5;

      // Create hover state and set alternative fill color
      var hs = polygonTemplate.states.create("hover");
      hs.properties.fill = chart.colors.getIndex(1).brighten(-0.5);
    }); // end am4core.ready()
  }
}

export default new DisplayMainCharts();
