import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Factory } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { loginSchema, type LoginFormData } from '../schemas/loginSchema';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/lib/auth-context';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading, logout } = useAuth();

  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    logout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });

  async function onSubmit(data: LoginFormData) {
    setAuthError(null);

    const result = await login(data.email, data.password);

    if (result.success) {
      navigate('/products');
    } else if (result.error) {
      setAuthError(result.error);
    }
  }

  return (
    <div className="flex min-h-svh items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 flex flex-col items-center gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
            <Factory className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold">InsuMax</h1>
          <p className="text-sm text-muted-foreground">Planejador de Recursos de Manufatura</p>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle>Bem-vindo de volta</CardTitle>
            <CardDescription>Entre na sua conta para continuar</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
              {/* Erro do backend */}
              {authError && (
                <Alert variant="destructive">
                  <AlertDescription>{authError}</AlertDescription>
                </Alert>
              )}

              {/* Email */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="seunome@empresa.com"
                  disabled={isLoading || isSubmitting}
                  aria-invalid={!!errors.email}
                  {...register('email')}
                />
                {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Informe sua senha"
                  disabled={isLoading || isSubmitting}
                  aria-invalid={!!errors.password}
                  {...register('password')}
                />
                {errors.password && (
                  <p className="text-xs text-destructive">{errors.password.message}</p>
                )}
              </div>

              {/* Button */}
              <Button type="submit" className="w-full" disabled={isLoading || isSubmitting}>
                {isLoading || isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Acessando o seu estoque...
                  </>
                ) : (
                  'Entrar'
                )}
              </Button>
            </form>
            <div className="mt-4 rounded-lg bg-muted px-3 py-2 text-center text-xs text-muted-foreground">
              Use um e-mail e senha válidos (6+ caracteres) para entrar
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
