import { ServerCrash, RotateCcw } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function ServerErrorPage() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-muted/30 px-4">
      <div className="flex max-w-md flex-col items-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-warning/10">
          <ServerCrash className="h-8 w-8 text-warning" />
        </div>

        <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground">500</h1>

        <h2 className="mt-2 text-lg font-semibold text-foreground">Internal Server Error</h2>

        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Algo deu errado do nosso lado. Por favor, tente novamente em alguns instantes.
        </p>

        <Button onClick={() => window.location.reload()} className="mt-6">
          <RotateCcw className="mr-2 h-4 w-4" />
          Refresh Page
        </Button>
      </div>
    </div>
  );
}
