"use client"

import { BackButton } from "@/components/common"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useRouter } from "next/navigation"
import { useState } from "react"

type PaymentMethod = "card" | "mpesa" | "emola" | "paypal"

interface PaymentOption {
  label: string
  value: PaymentMethod
}

export default function PaymentMethodPage() {
  const router = useRouter()
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("card")

  const paymentOptions: PaymentOption[] = [
    { label: "Cartões de crédito e/ou débito", value: "card" },
    { label: "M-Pesa", value: "mpesa" },
    { label: "E-Mola", value: "emola" },
    { label: "Paypal", value: "paypal" },
  ]

  const handleNext = () => {
    if (selectedMethod === "card") {
      router.push("/subscription/pre-payment")
    } else {
      // Handle other payment methods
      router.push("/subscription/payment-summary")
    }
  }

  return (
    <div>
      <BackButton text="Método de pagamento" />

      <Card className="mt-4">
        <CardContent className="pt-6">
          <div className="space-y-6">
            <RadioGroup
              value={selectedMethod}
              onValueChange={(value) => setSelectedMethod(value as PaymentMethod)}
              className="space-y-3"
            >
              {paymentOptions.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center rounded-md border border-gray-200 bg-gray-50 px-4 py-3"
                >
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="flex-1 cursor-pointer pl-2">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <Button onClick={handleNext} className="w-full">
              Próximo
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
