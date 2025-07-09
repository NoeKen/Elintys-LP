
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  email: z.string().email({ message: "Adresse email invalide." }),
  role: z.enum(["Visiteur", "Organisateur", "Prestataire", "Propriétaire"], {
    errorMap: () => ({ message: "Veuillez sélectionner un rôle." }),
  }),
});

type CTAFormProps = {
  variant?: 'light' | 'dark';
};

export default function CTAForm({ variant = 'light' }: CTAFormProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Inscription réussie ! 🎉",
      description: "Merci de votre intérêt. Nous vous tiendrons informé du lancement d'Elyntis.",
    });
    form.reset();
  }

  const isDark = variant === 'dark';

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormControl>
                  <Input
                    placeholder="Votre adresse email"
                    {...field}
                    className={cn(
                      "h-12 text-base",
                      isDark 
                        ? "bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-white" 
                        : "bg-white"
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="sm:w-48 flex-shrink-0">
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className={cn(
                      "h-12 text-base",
                      isDark 
                        ? "bg-white/10 border-white/20 text-white data-[placeholder]:text-gray-400 focus:ring-white" 
                        : "bg-white"
                    )}>
                      <SelectValue placeholder="Je suis..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Visiteur">Visiteur</SelectItem>
                    <SelectItem value="Organisateur">Organisateur</SelectItem>
                    <SelectItem value="Prestataire">Prestataire</SelectItem>
                    <SelectItem value="Propriétaire">Propriétaire</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full h-12 text-base font-semibold" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Envoi en cours..." : "S'inscrire gratuitement"}
        </Button>
      </form>
    </Form>
  );
}
