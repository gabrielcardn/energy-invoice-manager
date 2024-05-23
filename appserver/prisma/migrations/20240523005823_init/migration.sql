-- CreateTable
CREATE TABLE "EnergyInvoice" (
    "id" TEXT NOT NULL,
    "clientNumber" TEXT NOT NULL,
    "refMonth" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "energyConsumptionQuantity" DOUBLE PRECISION NOT NULL,
    "energyConsumptionValue" DOUBLE PRECISION NOT NULL,
    "exemptEnergyConsumptionQuantity" DOUBLE PRECISION NOT NULL,
    "exemptEnergyConsumptionValue" DOUBLE PRECISION NOT NULL,
    "compensatedEnergyConsumptionQuantity" DOUBLE PRECISION NOT NULL,
    "compensatedEnergyConsumptionValue" DOUBLE PRECISION NOT NULL,
    "municipalContribution" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "EnergyInvoice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EnergyInvoice_id_key" ON "EnergyInvoice"("id");
