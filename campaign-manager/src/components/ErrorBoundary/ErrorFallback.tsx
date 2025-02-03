import { Button } from 'primereact/button';
import { Message } from 'primereact/message';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: VoidFunction;
}

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps) {
  return (
    <div 
      role="alert"
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        gap: '1rem'
      }}
    >
      <Message 
        severity="error" 
        text="Algo salió mal"
        style={{ marginBottom: '1rem' }}
      />
      <div 
        style={{ 
          background: '#f8f9fa',
          padding: '1rem',
          borderRadius: '6px',
          maxWidth: '600px',
          width: '100%',
          wordBreak: 'break-word'
        }}
      >
        <pre style={{ margin: 0 }}>{error.message}</pre>
      </div>
      <Button 
        label="Intentar de nuevo" 
        severity="info"
        onClick={resetErrorBoundary}
        icon="pi pi-refresh"
      />
    </div>
  );
}
