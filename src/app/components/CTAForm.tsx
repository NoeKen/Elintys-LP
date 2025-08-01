"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
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
  const [showSuccess, setShowSuccess] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    
    await new Promise(resolve => setTimeout(resolve, 1000));

    setShowSuccess(true);
    form.reset();
    
    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  }

  const isDark = variant === 'dark';

  if (showSuccess) {
    return (
      <div className={cn(
        "w-full p-6 rounded-lg text-center",
        isDark ? "bg-white/10 text-white" : "bg-green-50 text-green-800"
      )}>
        <div className="text-2xl mb-2">🎉</div>
        <h3 className="font-semibold mb-1">Inscription réussie !</h3>
        <p className={cn("text-sm", isDark ? "text-gray-300" : "text-green-600")}>
          Merci de votre intérêt. Nous vous tiendrons informé du lancement d'elintys.
        </p>
      </div>
    );
  }

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
