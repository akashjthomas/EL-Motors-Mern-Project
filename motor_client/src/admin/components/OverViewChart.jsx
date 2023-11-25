import React, { useMemo, useEffect, useState  } from "react";

import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import axios from "axios";

const OverviewChart = ({ isDashboard = false, view }) => {
  const theme = useTheme();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true); 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/over');
        console.log("res",response);
        if (response.status === 200) {
          setData(response.data); // Set the fetched data to state
          console.log("setdata",setData);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        // Handle error scenarios here
      }
    };

    fetchData(); // Call the fetchData function when component mounts
  }, []);
 

  const [totalSalesLine, totalUnitsLine] = useMemo(() => {
    if (!data || !data.monthlyData) return [[], []];
  
    const monthlyData = data.monthlyData;
  
    const totalSalesData = Object.keys(monthlyData).map((month) => ({
      x: month,
      y: monthlyData[month].totalSales,
    }));
  
    const totalUnitsData = Object.keys(monthlyData).map((month) => ({
      x: month,
      y: monthlyData[month].totalUnits,
    }));
  
    const totalSalesLine = {
      id: "totalSales",
      color: theme.palette.secondary.main,
      data: totalSalesData,
    };
  
    const totalUnitsLine = {
      id: "totalUnits",
      color: theme.palette.secondary[600],
      data: totalUnitsData,
    };
  
    return [[totalSalesLine], [totalUnitsLine]];
  }, [data, theme.palette.secondary.main, theme.palette.secondary[600]]);
  
  return (
    <ResponsiveLine
      data={view === "sales" ? totalSalesLine : totalUnitsLine}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: theme.palette.secondary[200],
            },
          },
          legend: {
            text: {
              fill: theme.palette.secondary[200],
            },
          },
          ticks: {
            line: {
              stroke: theme.palette.secondary[200],
              strokeWidth: 1,
            },
            text: {
              fill: theme.palette.secondary[200],
            },
          },
        },
        legends: {
          text: {
            fill: theme.palette.secondary[200],
          },
        },
        tooltip: {
          container: {
            color: theme.palette.primary.main,
          },
        },
      }}
      margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      enableArea={isDashboard}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: (v) => {
          if (isDashboard) return v.slice(0, 3);
          return v;
        },
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? "" : "Month",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard
          ? ""
          : `Total ${view === "sales" ? "Revenue" : "Units"} for Year`,
        legendOffset: -60,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={
        !isDashboard
          ? [
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 30,
                translateY: -40,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]
          : undefined
      }
    />
  );
};

export default OverviewChart;