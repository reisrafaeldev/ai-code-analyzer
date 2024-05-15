import React, { useState } from "react";
import * as S from "./styles";
import * as H from "./helpers";
import { Bar } from "react-chartjs-2";
import Text from "../text";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const Chart = ({ chartData, chartDataAc, fileName }) => {
  return (
    <S.ContainerGrafics>
      <div>
        {fileName && (
          <Text
            as={"h3"}
            fontSize="14px"
            color="rgba(255, 255, 255, 0.8)"
            margin={"0"}
          >
            Nome do arquivo: {fileName}
          </Text>
        )}
      </div>

      <div>
        <Bar data={chartData} options={H.options} height={200} />
      </div>
      <div>
        <Bar data={chartDataAc} options={H.optionsAc} height={200} />
      </div>
    </S.ContainerGrafics>
  );
};

export default Chart;
