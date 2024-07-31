'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CircleX, ClipboardCheck, LoaderCircle } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

import { useForm } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { LoginSchema } from '@/lib/schemas';

import { cn } from '@/lib/utils';
import DotPattern from '@/components/ui/dotPattern';

import { login } from '@/lib/actions';
import { Label } from '@/components/ui/label';

export default function Dashboard() {
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: valibotResolver(LoginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    const results = await login(data);
    setIsLoading(false);
    if (results !== undefined) {
      setErrors(results.errors);
    }
  };

  const errorMessage = (error) => {
    if (error.message.startsWith('Please enter valid credentials')) {
      return 'Usuario o contraseña incorrectas';
    } else if (error.message.startsWith('fetch failed')) {
      return 'No se pudo conectar con el servidor';
    } else {
      return error.message;
    }
  };

  return (
    <div className="w-ful min-h-screen lg:grid lg:grid-cols-2 m-0 p-0 ">
      <div className="hidden lg:block">
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg p-20 ">
          <p className="z-10 whitespace-pre-wrap  text-5xl font-medium tracking-tighter text-black dark:text-white">
            <ClipboardCheck className="mb-4 w-20 h-20" />
            Panel de
            <br />
            Administracion
          </p>
          <DotPattern
            className={cn(
              '[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]'
            )}
          />
        </div>
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Iniciar Sesión</h1>
            <p className="text-balance text-muted-foreground">
              Introduce tu usuario y contraseña.
            </p>
          </div>
          {errors &&
            errors.map((error, index) => (
              <Alert variant="destructive" key={index}>
                <CircleX className="h-5 w-5" />
                <AlertTitle>Error!</AlertTitle>
                <AlertDescription>{errorMessage(error)}</AlertDescription>
              </Alert>
            ))}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <Label>Usuario</Label>
                    <FormControl>
                      <Input
                        className={cn(
                          form.formState.errors?.username &&
                            'border-destructive focus-visible:ring-destructive'
                        )}
                        placeholder="usuario..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <Label>Contraseña</Label>
                    <FormControl>
                      <Input
                        className={cn(
                          form.formState.errors?.password &&
                            'border-destructive focus-visible:ring-destructive'
                        )}
                        {...field}
                        placeholder="******"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  'Iniciar Sesión'
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
