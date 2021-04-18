import './css/TableExtension.css';
import Plot from 'react-plotly.js';
import food_vals from './data/food_vals_json.json';

export default function TableExtension({ item }) {
    if(item["Animal Feed"] > 0) {
        return (
            <tr>
                <td colSpan="7">
                    <div>
                        <div className="sections">
                            <div className="section">Animal Feed</div>
                            <div className="section">Farm</div>
                            <div className="section">Processing</div>
                            <div className="section">Transport</div>
                            <div className="section">Packaging</div>
                        </div>
                        <div className="graphs">
                            <Plot className="graph" data={getPlotData(food_vals["Animal Feed"], item["Animal Feed"])} layout={getPlotLayout()}/>
                            <Plot className="graph" data={getPlotData(food_vals["Farm"], item["Farm"])} layout={getPlotLayout()}/>
                            <Plot className="graph" data={getPlotData(food_vals["Processing"], item["Processing"])} layout={getPlotLayout()}/>
                            <Plot className="graph" data={getPlotData(food_vals["Transport"], item["Transport"])} layout={getPlotLayout()}/>
                            <Plot className="graph" data={getPlotData(food_vals["Packaging"], item["Packaging"])} layout={getPlotLayout()}/>
                        </div>
                    </div>
                </td>
            </tr>
        );
    } else {
        return (
            <tr>
                <td colSpan="7">
                    <div>
                        <div className="sections">
                            <div className="section">Animal Feed</div>
                            <div className="section">Farm</div>
                            <div className="section">Processing</div>
                            <div className="section">Transport</div>
                            <div className="section">Packaging</div>
                        </div>
                        <div className="graphs">
                            <div className="graph">N/A</div>
                            <Plot className="graph" data={getPlotData(food_vals["Farm"], item["Farm"])} layout={getPlotLayout()}/>
                            <Plot className="graph" data={getPlotData(food_vals["Processing"], item["Processing"])} layout={getPlotLayout()}/>
                            <Plot className="graph" data={getPlotData(food_vals["Transport"], item["Transport"])} layout={getPlotLayout()}/>
                            <Plot className="graph" data={getPlotData(food_vals["Packaging"], item["Packaging"])} layout={getPlotLayout()}/>
                        </div>
                    </div>
                </td>
            </tr>
        );
    }
}

function getPlotData(threshholds, value){
    return [
        {
            type: "indicator",
            mode: "gauge+number",
            value: value,
            title: { text: "", font: { size: 24 } },
            gauge: {
                axis: { range: [threshholds["min"], threshholds["max"]], tickwidth: 1, tickcolor: "darkblue" },
                bar: { color: "grey" },
                bgcolor: "transparent",
                borderwidth: 2,
                bordercolor: "gray",
                steps: [
                    { range: [threshholds["min"], threshholds["thresh_1"]], color: "#8fd14f" },
                    { range: [threshholds["thresh_1"], threshholds["thresh_2"]], color: "#cee741" },
                    { range: [threshholds["thresh_2"], threshholds["thresh_3"]], color: "#fef545" },
                    { range: [threshholds["thresh_3"], threshholds["thresh_4"]], color: "#fac710" },
                    { range: [threshholds["thresh_4"], threshholds["max"]], color: "#f24726" }
                ],
                angle: 0.15, // The span of the gauge arc
                lineWidth: 0.44, // The line thickness
                radiusScale: 1, // Relative radius
                pointer: {
                    length: 0.6, // // Relative to gauge radius
                    strokeWidth: 0.035, // The thickness
                    color: '#000000' // Fill color
                }
            }
        }
    ];
}

function getPlotLayout() {
    return {
        autosize: true,
        //width: 300,
        //height: 250,
        margin: { t: 50, r: 50, l: 50, b: 50 },
        font: { color: "gray", family: "Arial" },
    };
}
