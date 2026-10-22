interface QueryStateProps {
  id: string;
}

export const LoadingCard = ({ id }: QueryStateProps) => (
  <div id={id} className="ui-card ui-stack">
    Caricamento in corso...
  </div>
);

export const ErrorCard = ({
  id,
  message,
}: QueryStateProps & { message?: string }) => (
  <div id={id} className="ui-card ui-stack">
    Errore: {message ?? "si è verificato un problema"}
  </div>
);
