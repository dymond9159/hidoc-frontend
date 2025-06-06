"use client"
import {
  ArrowUpDownIcon,
  CalculatorIcon,
  GenderIcon,
  HeartIcon,
  LungIcon,
  ScaleIcon,
  Spo2Icon,
} from "@/components/icons"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { Thermometer } from "lucide-react"
import { useTranslations } from "next-intl"
import { useState } from "react"

interface PatientHistoryPanelProps {
  className?: string
  patientId?: string
  onClose?: () => void
}
interface MedicalMetric {
  icon: React.ReactNode
  value: number | string
  unit: string
}

enum PatientHistoryPanelSections {
  History = "history",
  Vitals = "vitals",
}

export function PatientHistoryPanel({ onClose, className, patientId }: PatientHistoryPanelProps) {
  const t = useTranslations("pages.provider.consultation.featureBar.history")
  const [activeSection, setActiveSection] = useState<PatientHistoryPanelSections>(PatientHistoryPanelSections.History)

  const renderMetricCard = (metric: MedicalMetric) => (
    <Card className="flex flex-row items-center justify-between px-3 py-2 rounded-md gap-2">
      <div className="bg-secondary-3 text-secondary p-2 rounded-md">{metric.icon}</div>
      <div className="flex flex-col justify-end items-end">
        <p className="text-sm font-medium">{metric.value}</p>
        <p className="text-xs text-gray-500">{metric.unit}</p>
      </div>
    </Card>
  )

  return (
    <div className={cn("w-full bg-white rounded-lg overflow-hidden", className)}>
      <Accordion
        type="single"
        collapsible
        defaultValue={PatientHistoryPanelSections.History}
        className="w-full p-4"
        onValueChange={(value) => setActiveSection(value as PatientHistoryPanelSections)}
      >
        <AccordionItem value={PatientHistoryPanelSections.Vitals} className="border rounded-md overflow-hidden mb-4">
          <AccordionTrigger className="px-4 py-3 hover:no-underline rounded-none">
            <div className="flex items-center gap-2">
              <span className="font-medium">{t("vitals.title")}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-0 cursor-default">
            <Separator className="mb-4" />
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm text-gray-500">{t("vitals.measuredOn")}</h3>
                <p className="text-sm font-medium">12/05/2024 às 14:34</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <h3 className="text-sm text-gray-500 mb-1.5 truncate">{t("vitals.bloodPressure")}</h3>
                  {renderMetricCard({
                    icon: <HeartIcon size={20} />,
                    value: "120/70",
                    unit: "90",
                  })}
                </div>

                <div>
                  <h3 className="text-sm text-gray-500 mb-1.5">{t("vitals.temperature")}</h3>
                  {renderMetricCard({
                    icon: <Thermometer size={18} />,
                    value: 32,
                    unit: "°C",
                  })}
                </div>
                <div>
                  <h3 className="text-sm text-gray-500 mb-1.5 truncate">{t("vitals.respiratoryRate")}</h3>
                  {renderMetricCard({
                    icon: <LungIcon size={20} />,
                    value: 30,
                    unit: "rpm",
                  })}
                </div>

                <div>
                  <h3 className="text-sm text-gray-500 mb-1.5">{t("vitals.weight")}</h3>
                  {renderMetricCard({
                    icon: <Spo2Icon size={20} />,
                    value: 95,
                    unit: "%",
                  })}
                </div>

                <div className="col-span-2">
                  <h3 className="text-sm text-gray-500 mb-1.5">{t("vitals.imc")}</h3>
                  {renderMetricCard({
                    icon: <CalculatorIcon size={20} />,
                    value: 20.55,
                    unit: "",
                  })}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1 mb-1.5">
                  <h3 className="text-sm text-gray-500">{t("vitals.additionalInfoTitle")}</h3>
                </div>
                <div className="bg-blue-50 p-3 rounded-md">
                  <p className="text-sm">{t("vitals.additionalInformation")}</p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value={PatientHistoryPanelSections.History} className="border rounded-md overflow-hidden mb-0">
          <AccordionTrigger className="px-4 py-3 hover:no-underline rounded-none">
            <div className="flex items-center gap-2">
              <span className="font-medium">{t("medicalHistory.title")}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-0 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down cursor-default">
            <Separator className="mb-4" />
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm text-gray-500">{t("medicalHistory.filledOn")}</h3>
                <p className="text-sm font-medium">12/05/2024 às 14:34</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <h3 className="text-sm text-gray-500 mb-1.5">{t("medicalHistory.weight")}</h3>
                  {renderMetricCard({
                    icon: <ScaleIcon size={20} />,
                    value: 68,
                    unit: "kg",
                  })}
                </div>

                <div>
                  <h3 className="text-sm text-gray-500 mb-1.5">{t("medicalHistory.height")}</h3>
                  {renderMetricCard({
                    icon: <ArrowUpDownIcon size={20} />,
                    value: 165,
                    unit: "cm",
                  })}
                </div>

                <div>
                  <h3 className="text-sm text-gray-500 mb-1.5">{t("medicalHistory.sex")}</h3>
                  {renderMetricCard({
                    icon: <GenderIcon size={20} />,
                    value: "Fem",
                    unit: "",
                  })}
                </div>

                <div>
                  <h3 className="text-sm text-gray-500 mb-1.5">{t("medicalHistory.imc")}</h3>
                  {renderMetricCard({
                    icon: <CalculatorIcon size={20} />,
                    value: 20.55,
                    unit: "",
                  })}
                </div>
              </div>

              <div>
                <h3 className="text-sm text-gray-500 mb-1.5">{t("medicalHistory.additionalInfoTitle")}</h3>
                <div className="bg-blue-50 p-3 rounded-md">
                  <p className="text-sm">{t("medicalHistory.additionalInformation")}</p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
