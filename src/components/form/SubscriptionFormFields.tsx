import { useTranslation } from "react-i18next";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import ShinyButton from "@/components/ShinyButton";
import { MessageSquare } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { SubscriptionFormData } from "@/schemas/subscriptionSchema";

interface SubscriptionFormFieldsProps {
  form: UseFormReturn<SubscriptionFormData>;
  isSubmitting: boolean;
  onHelpClick: () => void;
  onSubmit: (data: SubscriptionFormData) => void;
  t: (key: string) => string;
}

const SubscriptionFormFields = ({ form, isSubmitting, onHelpClick, onSubmit, t }: SubscriptionFormFieldsProps) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">{t('form.name')}</FormLabel>
              <FormControl>
                <Input placeholder={t('form.namePlaceholder')} {...field} />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">{t('form.email')}</FormLabel>
              <FormControl>
                <Input placeholder={t('form.emailPlaceholder')} {...field} />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">{t('form.country')}</FormLabel>
              <FormControl>
                <Input placeholder={t('form.countryPlaceholder')} {...field} />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="acceptTerms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-sm text-gray-300 text-xs">
                  {t('form.termsText')}
                </FormLabel>
              </div>
            </FormItem>
          )}
        />

        <ShinyButton 
          type="submit" 
          variant="neon" 
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "ENVIANDO..." : t('form.submit')}
        </ShinyButton>
      </form>
      
      <button
        onClick={onHelpClick}
        className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mx-auto group"
      >
        <MessageSquare className="w-4 h-4 group-hover:text-neon-purple transition-colors" />
        <span>{t('form.helpButton')}</span>
      </button>
    </Form>
  );
};

export default SubscriptionFormFields;