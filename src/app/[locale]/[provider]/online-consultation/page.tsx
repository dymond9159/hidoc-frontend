"use client"

import { Chatbot } from "@/components/provider/chat/chatbot"
import { ConsultationFeatureBar, MedicalReportModal, VideoCallInterface } from "@/components/provider/consultation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTranslations } from "next-intl"
import { useState } from "react"

export default function OnlineConsultationPage() {
  const t = useTranslations("pages.provider.onlineConsultation")
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isAudioOn, setIsAudioOn] = useState(true)
  const [isEndCallModalOpen, setIsEndCallModalOpen] = useState(false)
  const [isFeatureBarOpen, setIsFeatureBarOpen] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)

  // Handle end call
  const handleEndCall = () => {
    setIsEndCallModalOpen(true)
  }

  // Handle submit medical report
  const handleSubmitMedicalReport = (data: any) => {
    console.log("Medical report submitted:", data)
    // In a real app, you would send this data to your backend
    // Then redirect to a summary page or back to the consultations list
    window.location.href = "/professional/consultations"
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-row gap-6" style={{ height: "calc(100vh - 150px)" }}>
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/images/placeholder.svg?height=24&width=24" alt={"Nome do Médico"} />
              <AvatarFallback>NM</AvatarFallback>
            </Avatar>
            <p className="text-base font-medium">{"Nome do Médico"}</p>
          </div>

          <div className="flex-1 rounded-md overflow-hidden">
            <VideoCallInterface
              isVideoOn={isVideoOn}
              isAudioOn={isAudioOn}
              onToggleVideo={() => setIsVideoOn(!isVideoOn)}
              onToggleAudio={() => setIsAudioOn(!isAudioOn)}
              onEndCall={handleEndCall}
              onOpenFeatureBar={() => setIsFeatureBarOpen(true)}
              onOpenChat={() => setIsChatOpen(true)}
            />
          </div>
          <MedicalReportModal
            isOpen={isEndCallModalOpen}
            onClose={() => setIsEndCallModalOpen(false)}
            onSubmit={handleSubmitMedicalReport}
          />
        </div>

        <ConsultationFeatureBar isOpenFeatureBar={isFeatureBarOpen} onOpenFeatureBarChange={setIsFeatureBarOpen} />
        <Chatbot isOpenChat={isChatOpen} onOpenChatChange={setIsChatOpen} />
      </div>
    </div>
  )
}
