interface QueryStateProps {
  id: string;
}

export const LoadingCard = ({ id }: QueryStateProps) => (
  <div className="page-container page-state">
    <div id={id} className="ui-card ui-stack" role="status">
      Caricamento in corso...
    </div>
  </div>
);

export const ErrorCard = ({
  id,
  message,
}: QueryStateProps & { message?: string }) => (
  <div className="page-container page-state">
    <div id={id} className="ui-card ui-stack" role="alert">
      Errore: {message ?? "si è verificato un problema"}
    </div>
  </div>
);
