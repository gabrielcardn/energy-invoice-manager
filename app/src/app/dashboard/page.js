"use client";
import Chart from "@/components/Chart";
import Filter from "@/components/Filter";
import Panel from "@/components/Panel";
import Spinner from "@/components/Spinner";
import { useEffect, useMemo, useState } from "react";

import styles from "./dashboard.module.css";
import Controller from "../classes/Controller";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [clientNumbers, setClientNumbers] = useState([]);
  const [selectedClientNumber, selectClientNumber] = useState(null);
  const [loading, setLoading] = useState(false);

  const controller = useMemo(() => new Controller(), []); // Wrap controller initialization in useMemo

  useEffect(() => {
    setLoading(true);
    controller
      .getClientNumbers()
      .then((data) => setClientNumbers(data))
      .finally(() => setLoading(false));
  }, [controller]);

  //7005400387
  const handleFilterSubmit = (filterValue) => {
    setLoading(true);
    selectClientNumber(filterValue);
    if (!filterValue) {
      setData([]);
      setLoading(false);
      return;
    }
    controller
      .getInvoices(filterValue)
      .then((data) => setData(data))
      .finally(() => setLoading(false));
    // fetch("http://localhost:3000/energyInvoices?clientNumber=" + filterValue, {
    //   cache: "no-store",
    //   method: "GET",
    // })
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     setData(data);
    //   })
    //   .finally(() => setLoading(false));
  };

  if (loading) return <Spinner />;

  // get energyConsumptionQuantityData
  let energyConsumptionQuantityData = {
    labels: [],
    datasets: [
      { label: "Consumo de Energia Elétrica (KWh)", data: [], backgroundColor: "#3355FF" },
      { label: "Energia Compensada (kWh)", data: [], backgroundColor: "#338FFF" },
    ],
  };
  // get energyConsumptionValueData
  let energyConsumptionValueData = {
    labels: [],
    datasets: [
      { label: "Valor Total sem GD (R$)", data: [], backgroundColor: "#51cd7a" },
      { label: "Economia GD (R$)", data: [], backgroundColor: "#66FF99" },
    ],
  };
  data.forEach((invoice) => {
    const {
      energyConsumptionQuantity,
      exemptEnergyConsumptionQuantity,
      compensatedEnergyConsumptionQuantity,
      energyConsumptionValue,
      exemptEnergyConsumptionValue,
      compensatedEnergyConsumptionValue,
      municipalContribution,
      refMonth,
    } = invoice;
    const totalEnergyComsuptionQuantity =
      energyConsumptionQuantity + exemptEnergyConsumptionQuantity;
    //
    energyConsumptionQuantityData.labels.push(refMonth);
    energyConsumptionQuantityData.datasets[0].data.push(totalEnergyComsuptionQuantity);
    energyConsumptionQuantityData.datasets[1].data.push(compensatedEnergyConsumptionQuantity);
    //
    const totalEnergyComsuptionValue =
      energyConsumptionValue + exemptEnergyConsumptionValue + municipalContribution;
    energyConsumptionValueData.labels.push(refMonth);
    energyConsumptionValueData.datasets[0].data.push(totalEnergyComsuptionValue);
    energyConsumptionValueData.datasets[1].data.push(compensatedEnergyConsumptionValue);
  });

  return (
    <div className={styles.container}>
      <Filter
        title={"Número do cliente:"}
        options={clientNumbers}
        initialValue={selectedClientNumber}
        onSubmit={handleFilterSubmit}
        placeholder={"Selecione o número do cliente..."}
      />
      <Panel
        components={[
          <Chart
            key="energyConsumption"
            title={"Energia (kWh) "}
            type="bar"
            data={energyConsumptionQuantityData}
          />,
          <Chart
            key="energyComsumptionValue"
            title="Valores Monetários (R$)"
            type="bar"
            data={energyConsumptionValueData}
          />,
        ]}
      />
      ;
    </div>
  );
}
