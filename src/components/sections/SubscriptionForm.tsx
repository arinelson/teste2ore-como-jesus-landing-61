import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSubscriptionSchema, type SubscriptionFormData } from "@/schemas/subscriptionSchema";
import { submitToMailchimp, type SubscriptionData } from "@/services/mailchimpService";
import SubscriptionFormFields from "@/components/form/SubscriptionFormFields";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ShinyButton from "@/components/ShinyButton";

const SubscriptionForm = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const { trackFormSubmission, trackEvent } = useAnalytics();

  const form = useForm<SubscriptionFormData>({
    resolver: zodResolver(createSubscriptionSchema(t)),
    defaultValues: {
      name: "",
      email: "",
      country: "",
      acceptTerms: false,
    },
  });

  const onSubmit = async (values: SubscriptionFormData) => {
    setIsSubmitting(true);
    console.log("Enviando dados para o Mailchimp:", values);

    try {
      // Comentando temporariamente o envio real para o Mailchimp
      // const mailchimpData: SubscriptionData = {
      //   name: values.name,
      //   email: values.email,
      //   country: values.country,
      //   acceptTerms: values.acceptTerms
      // };
      // await submitToMailchimp(mailchimpData);
      
      // Simulando sucesso
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      trackFormSubmission(values);

      // Mostra o diálogo de sucesso
      setShowSuccessDialog(true);

      // Toast de confirmação
      toast({
        title: t('form.success'),
        description: (
          <div className="flex flex-col gap-2">
            <p>{values.name}, {t('form.successMessage')}</p>
            <p className="text-sm">✨ {t('form.successDetails')}</p>
            <p className="text-xs">📧 {t('form.checkEmail')}</p>
          </div>
        ),
        className: "bg-black border-neon-purple text-neon-purple font-semibold animate-shine shadow-[0_0_15px_rgba(139,92,246,0.5)]",
        duration: 6000,
      });

      form.reset();
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      
      trackEvent({
        action: 'form_error',
        category: 'Error',
        label: error instanceof Error ? error.message : 'Unknown error'
      });

      toast({
        variant: "destructive",
        title: t('form.error'),
        description: t('form.errorMessage'),
        className: "bg-black border-red-500 text-red-500 font-semibold",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleHelpClick = () => {
    window.location.href = `mailto:${t('form.helpEmail')}?subject=Ajuda com formulário`;
    trackEvent({
      action: 'help_button_click',
      category: 'Form',
      label: 'Help requested'
    });
  };

  return (
    <>
      <section id="form" className="relative py-20">
        <div className="absolute inset-0 bg-[url('/lovable-uploads/4bf0c246-5410-41d7-a50e-65e7b1cfe25d.png')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="container relative z-10 px-4">
          <div className="max-w-xl mx-auto bg-black/80 backdrop-blur-sm p-8 rounded-lg shadow-xl">
            <h2 className="text-3xl font-serif font-bold text-primary text-center mb-8">
              {t('form.title')}
            </h2>
            <SubscriptionFormFields
              form={form}
              isSubmitting={isSubmitting}
              onHelpClick={handleHelpClick}
              onSubmit={onSubmit}
              t={t}
            />
          </div>
        </div>
      </section>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="bg-black/95 border-neon-purple text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-3xl font-serif text-center text-primary mb-6">
              PARABÉNS POR INICIAR A SUA JORNADA
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-6 py-4">
            <p className="text-lg text-center mb-4">
              ESCUTE ESSE ÁUDIO ABAIXO
            </p>
            <audio
              controls
              className="w-full max-w-md mb-6"
              src="https://drive.google.com/uc?export=download&id=1KvrcY1hMEDqwJX36_5xxSr14NWtwszK9"
            >
              Seu navegador não suporta o elemento de áudio.
            </audio>
            <ShinyButton
              variant="neon"
              onClick={() => setShowSuccessDialog(false)}
              className="w-full max-w-md"
            >
              CONTINUAR MINHA JORNADA
            </ShinyButton>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SubscriptionForm;