"use client";
import Table from "@/components/Table";
import { useEffect, useState } from "react";

import styles from "./invoices.module.css";
import Filter from "@/components/Filter";
import Spinner from "@/components/Spinner";
import Controller from "../classes/Controller";

export default function Invoices() {
  const [data, setData] = useState([]);
  const [clientNumbers, setClientNumbers] = useState([]);
  const [selectedClientNumber, selectClientNumber] = useState(null);
  const [loading, setLoading] = useState(false);

  const controller = new Controller();

  useEffect(() => {
    setLoading(true);
    controller
      .getClientNumbers()
      .then((data) => setClientNumbers(data))
      .finally(() => setLoading(false));
  }, []);

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
  };

  const handleCellClick = (row, cellId) => {
    if (cellId === "download") {
      const invoice = data.find((d) => d.id === row.id);
      if (invoice) {
        let ret = controller.downloadInvoice(invoice.filePath);
        console.log(ret);
      }
    }
  };

  if (loading) return <Spinner />;

  let columns = [
    { id: "refMonth", value: "Mês" },
    { id: "energyConsumptionQuantity", value: "Energia elétrica (Quantidade - kWh)" },
    { id: "energyConsumptionValue", value: "Energia elétrica (Valor - R$)" },
    { id: "exemptEnergyConsumptionQuantity", value: "Energia SCEE s/ ICMS (Quantidade)" },
    { id: "exemptEnergyConsumptionValue", value: "Energia SCEE s/ ICMS (Valor - R$)" },
    { id: "compensatedEnergyConsumptionQuantity", value: "Energia compensada GD I (Quantidade)" },
    { id: "compensatedEnergyConsumptionValue", value: "Energia compensada GD I (Valor - R$)" },
    { id: "municipalContribution", value: "Contrib Ilum Publica Municipal (Valor - R$)" },
    { id: "totalEnergyConsumptionValue", value: "Total energia elétrica (Valor - R$)" },
    { id: "download", value: "Baixar fatura" },
  ];
  let rows = [];
  data.forEach((invoice, index) => {
    const {
      refMonth,
      energyConsumptionQuantity,
      energyConsumptionValue,
      exemptEnergyConsumptionQuantity,
      exemptEnergyConsumptionValue,
      compensatedEnergyConsumptionQuantity,
      compensatedEnergyConsumptionValue,
      municipalContribution,
    } = invoice;
    let total = 0;
    total += energyConsumptionValue;
    total += exemptEnergyConsumptionValue;
    total += compensatedEnergyConsumptionValue;
    rows.push({
      id: invoice.id,
      cells: [
        { id: "refMonth", value: refMonth },
        { id: "energyConsumptionQuantity", value: energyConsumptionQuantity },
        { id: "energyConsumptionValue", value: energyConsumptionValue },
        { id: "exemptEnergyConsumptionQuantity", value: exemptEnergyConsumptionQuantity },
        { id: "exemptEnergyConsumptionValue", value: exemptEnergyConsumptionValue },
        {
          id: "compensatedEnergyConsumptionQuantity",
          value: compensatedEnergyConsumptionQuantity,
        },
        { id: "compensatedEnergyConsumptionValue", value: compensatedEnergyConsumptionValue },
        { id: "municipalContribution", value: municipalContribution },
        { id: "totalEnergyConsumptionValue", value: parseFloat(total.toFixed(2)) },
        {
          id: "download",
          value: <span style={{ fontSize: "20px" }}>&#8628;</span>,
          clickable: true,
        },
      ],
    });
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
      <Table columns={columns} rows={rows} onCellClick={handleCellClick} />;
    </div>
  );
}
