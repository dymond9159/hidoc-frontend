"use client"

import { cn } from "@/lib/utils"
import { ptBR } from "date-fns/locale"
import { InfoIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import type React from "react"
import { useState } from "react"

import { Asterisk, BackButton } from "@/components/common"
import { RestrictedAccessModal } from "@/components/provider/consultation/restricted-access-modal"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SelectDatepicker } from "@/components/ui/select-datepicker"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { TimeSlots } from "@/lib/constants/app"
import { ConsultationCategory, ConsultationType } from "@/types/provider/professional/types"
import { useTranslations } from "next-intl"
import { toast } from "sonner"

export default function NovoAgendamentoPage() {
  const router = useRouter()
  const t = useTranslations("pages.provider.consultation.newAppointment")
  const tForm = useTranslations("form")
  const tCta = useTranslations("cta")

  const [date, setDate] = useState<Date>()
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null)
  const [consultationType, setConsultationType] = useState<ConsultationType>(ConsultationType.Normal)
  const [consultationCategory, setConsultationCategory] = useState<ConsultationCategory>(ConsultationCategory.Home)
  const [showRestrictedModal, setShowRestrictedModal] = useState(false)

  // Mock function to check if user has HaiDoc Plus
  const hasHaiDocPlus = true

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!hasHaiDocPlus) {
      setShowRestrictedModal(true)
      return
    }

    toast.success("Agendamento realizado com sucesso")

    // Handle form submission
    router.back()
  }

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <BackButton text={t("cta.backButton")} />
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1 md:col-span-2">
              <Label htmlFor="patient" className="block text-sm font-medium mb-1">
                {tForm("label.patientName")} <Asterisk />
              </Label>
              <Select required>
                <SelectTrigger id="patient" className="w-full">
                  <SelectValue placeholder={tForm("placeholder.patientName")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="patient1">Maria Silva</SelectItem>
                  <SelectItem value="patient2">João Santos</SelectItem>
                  <SelectItem value="patient3">Ana Oliveira</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-1">
              <Label className="block text-sm font-medium mb-1">
                {tForm("label.date")}
                <Asterisk />
              </Label>
              <SelectDatepicker
                date={date}
                setDate={setDate}
                className="w-full"
                placeholder={tForm("placeholder.date")}
                locale={ptBR}
              />
            </div>
          </div>

          <div>
            <Label className="block text-sm font-medium mb-1">
              {tForm("label.timeSlots")} <Asterisk />
            </Label>
            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 gap-2">
              {TimeSlots.map((time) => (
                <Button
                  key={time}
                  type="button"
                  size="sm"
                  variant={selectedTimeSlot === time ? "secondary" : "outline"}
                  className={cn(
                    "h-8 px-4 py-2 rounded-md",
                    selectedTimeSlot === time ? "bg-secondary-9 text-white" : "",
                  )}
                  onClick={() => setSelectedTimeSlot(time)}
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="reason" className="block text-sm font-medium mb-1">
              {tForm("label.reason")} <Asterisk />
            </Label>
            <Textarea id="reason" placeholder={tForm("placeholder.reason")} className="min-h-[100px]" required />
          </div>

          <div>
            <Label className="block text-sm font-medium mb-3">
              {tForm("label.consultationType")} <Asterisk />
            </Label>
            <RadioGroup
              value={consultationType}
              onValueChange={(value) => setConsultationType(value as ConsultationType)}
              className="grid grid-cols-1 sm:grid-cols-3 gap-2"
            >
              <div className="flex items-center space-x-2 border px-4 py-3 rounded-md">
                <RadioGroupItem value={ConsultationType.Normal} id="normal" />
                <Label htmlFor="normal">{tForm("category.consultationType.normal")}</Label>
              </div>
              <div className="flex items-center space-x-2 border px-4 py-3 rounded-md">
                <RadioGroupItem value={ConsultationType.Urgent} id="urgente" />
                <Label htmlFor="urgente">{tForm("category.consultationType.urgent")}</Label>
              </div>
              <div className="flex items-center space-x-2 border px-4 py-3 rounded-md">
                <RadioGroupItem value={ConsultationType.FollowUp} id="seguimento" />
                <Label htmlFor="seguimento">{tForm("category.consultationType.followUp")}</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="h-4 w-4 text-system-9" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-[200px] text-sm">{t("followUpTooltip")}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label className="block text-sm font-medium mb-3">Categoria</Label>
            <RadioGroup
              value={consultationCategory}
              onValueChange={(value) => setConsultationCategory(value as ConsultationCategory)}
              className="grid grid-cols-1 sm:grid-cols-3 gap-2"
            >
              <div className="flex items-center space-x-2 border px-4 py-3 rounded-md">
                <RadioGroupItem value={ConsultationCategory.Home} id="domicilio" />
                <Label htmlFor="domicilio">{tForm("category.consultationCategory.home")}</Label>
              </div>
              <div className="flex items-center space-x-2 border px-4 py-3 rounded-md">
                <RadioGroupItem value={ConsultationCategory.Chat} id="chat" />
                <Label htmlFor="chat">{tForm("category.consultationCategory.chat")}</Label>
              </div>
              <div className="flex items-center space-x-2 border px-4 py-3 rounded-md">
                <RadioGroupItem value={ConsultationCategory.Teleconsultation} id="teleconsulta" />
                <Label htmlFor="teleconsulta">{tForm("category.consultationCategory.teleconsultation")}</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex justify-end">
            <Button type="submit">{tCta("submit")}</Button>
          </div>
        </form>
        <RestrictedAccessModal isOpen={showRestrictedModal} onClose={() => setShowRestrictedModal(false)} />
      </Card>
    </div>
  )
}
