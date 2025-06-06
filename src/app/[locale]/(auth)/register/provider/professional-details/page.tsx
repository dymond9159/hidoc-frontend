"use client"

import { useTranslations } from "next-intl"
import { useRouter } from "nextjs-toploader/app"
import type React from "react"
import { useState } from "react"

import { Asterisk, TermsAndConditions } from "@/components/common"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Specialites } from "@/lib/constants"
import { cn, formatCardNumber } from "@/lib/utils"
import { ProviderOptions } from "@/types"

export default function ProviderProfessionalDetailsPage() {
  const router = useRouter()
  const t = useTranslations("pages.auth.register.provider.professionalDetails")
  const tForm = useTranslations("form")
  const tCta = useTranslations("cta")
  const [formData, setFormData] = useState({
    providerType: ProviderOptions.Professional,
    specialty: "",
    institutionName: "",
    professionalNumber: "",
    termsAccepted: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value })

    // Clear error when field is edited
    if (errors[field]) {
      const newErrors = { ...errors }
      delete newErrors[field]
      setErrors(newErrors)
    }
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value)
    handleChange("professionalNumber", formatted)
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Validate provider type
    if (!formData.providerType) {
      newErrors.providerType = tForm("error.providerTypeRequired")
    }

    // Validate specialty
    if (formData.providerType === ProviderOptions.Professional && !formData.specialty) {
      newErrors.specialty = tForm("error.specialtyRequired")
    }

    // Validate institution name
    if (formData.providerType !== ProviderOptions.Professional && !formData.institutionName) {
      newErrors.institutionName = tForm("error.institutionNameRequired")
    }

    // Validate card number/NUIT
    if (!formData.professionalNumber) {
      newErrors.professionalNumber =
        formData.providerType === ProviderOptions.Professional
          ? tForm("error.professionalNumberRequired")
          : tForm("error.nuitRequired")
    } else if (formData.professionalNumber.replace(/\D/g, "").length !== 9) {
      newErrors.professionalNumber =
        formData.providerType === ProviderOptions.Professional
          ? tForm("error.professionalNumberLength")
          : tForm("error.nuitLength")
    }

    // Validate terms
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = tForm("error.termsRequired")
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateForm()) {
      router.push("/register/provider/documentation")
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="providerType" className="text-sm font-medium">
          {t("providerType")} <Asterisk />
        </Label>
        <Select value={formData.providerType} onValueChange={(value) => handleChange("providerType", value)}>
          <SelectTrigger id="providerType" className={cn("w-full", errors.providerType ? "border-error-5" : "")}>
            <SelectValue placeholder={t("providerType")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ProviderOptions.Professional}>{tForm("category.provider.professional")}</SelectItem>
            <SelectItem value={ProviderOptions.Laboratory}>{tForm("category.provider.laboratory")}</SelectItem>
            <SelectItem value={ProviderOptions.Clinic}>{tForm("category.provider.clinic")}</SelectItem>
            <SelectItem value={ProviderOptions.Pharmacy}>{tForm("category.provider.pharmacy")}</SelectItem>
          </SelectContent>
        </Select>
        {errors.providerType && <p className="text-xs text-error-5">{errors.providerType}</p>}
      </div>

      {formData?.providerType === ProviderOptions.Professional && (
        <div className="space-y-2">
          <Label htmlFor="specialty" className="text-sm font-medium">
            {tForm("label.specialty")} <Asterisk />
          </Label>
          <Select value={formData.specialty} onValueChange={(value) => handleChange("specialty", value)}>
            <SelectTrigger id="specialty" className={cn("w-full", errors.specialty ? "border-error-5" : "")}>
              <SelectValue placeholder={tForm("placeholder.specialty")} />
            </SelectTrigger>
            <SelectContent>
              {Specialites.map((specialty) => (
                <SelectItem key={specialty} value={specialty}>
                  {tForm(`category.specialty.${specialty}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.specialty && <p className="text-xs text-error-5">{errors.specialty}</p>}
        </div>
      )}

      {formData?.providerType !== ProviderOptions.Professional && (
        <div className="space-y-2">
          <Label htmlFor="institutionName" className="text-sm font-medium">
            {tForm("label.institutionName")} <Asterisk />
          </Label>
          <Input
            id="institutionName"
            value={formData.institutionName}
            onChange={(e) => handleChange("institutionName", e.target.value)}
            placeholder={tForm("placeholder.institutionName")}
            className={errors.institutionName ? "border-error-5" : ""}
          />
          {errors.institutionName && <p className="text-xs text-error-5">{errors.institutionName}</p>}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="professionalNumber" className="text-sm font-medium">
          {formData.providerType === ProviderOptions.Professional
            ? tForm("label.professionalNumber")
            : tForm("label.nuit")}{" "}
          <Asterisk />
        </Label>
        <Input
          id="professionalNumber"
          value={formData.professionalNumber}
          onChange={handleCardNumberChange}
          placeholder={
            formData.providerType === ProviderOptions.Professional
              ? tForm("placeholder.professionalNumber")
              : tForm("placeholder.nuit")
          }
          maxLength={9}
          className={errors.professionalNumber ? "border-error-5" : ""}
        />
        {errors.professionalNumber && <p className="text-xs text-error-5">{errors.professionalNumber}</p>}
      </div>

      <div className="bg-warning-2 border border-warning-3 rounded-md p-4 text-sm font-medium text-warning-5">
        <p>
          {formData.providerType === ProviderOptions.Professional
            ? t("permanentInfoProfessional")
            : t("permanentInfoOther")}
        </p>
      </div>

      <TermsAndConditions
        checked={formData.termsAccepted}
        onCheckedChange={(checked) => handleChange("termsAccepted", checked)}
        error={errors.termsAccepted}
      />

      <Button onClick={handleNext} className="w-full">
        {tCta("next")}
      </Button>
    </div>
  )
}
