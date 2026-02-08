import { FileQuestion, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-muted/30 px-4">
      <div className="flex max-w-md flex-col items-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
          <FileQuestion className="h-8 w-8 text-muted-foreground" />
        </div>

        <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground">404</h1>

        <h2 className="mt-2 text-lg font-semibold text-foreground">Pagina não encontrada</h2>

        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          A página que você está procurando não existe ou foi movida.
        </p>

        <Button asChild className="mt-6">
          <Link to="/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para home
          </Link>
        </Button>
      </div>
    </div>
  );
}
