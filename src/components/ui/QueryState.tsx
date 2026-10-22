interface QueryStateProps {
  id: string;
}

export const LoadingCard = ({ id }: QueryStateProps) => (
  <div id={id} className="display-card display-card-column">
    Caricamento in corso...
  </div>
);

export const ErrorCard = ({
  id,
  message,
}: QueryStateProps & { message?: string }) => (
  <div id={id} className="display-card display-card-column">
    Errore: {message ?? "si è verificato un problema"}
  </div>
);
