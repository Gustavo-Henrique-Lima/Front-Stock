import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-muted/30 px-4">
      <div className="flex max-w-md flex-col items-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10">
          <ShieldAlert className="h-8 w-8 text-destructive" />
        </div>

        <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground">401</h1>

        <h2 className="mt-2 text-lg font-semibold text-foreground">Não autorizado</h2>

        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Sua sessão expirou ou você não tem permissão para acessar este recurso. Por favor, faça
          login novamente para continuar.
        </p>

        <Button asChild className="mt-6">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para login
          </Link>
        </Button>
      </div>
    </div>
  );
}
