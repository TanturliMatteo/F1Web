import { useI18n } from "../../i18n/i18n";

interface QueryStateProps {
  id: string;
}

export const LoadingCard = ({ id }: QueryStateProps) => {
  const { t } = useI18n();
  return (
    <div className="page-container page-state">
      <div id={id} className="ui-card ui-stack" role="status">
        {t("common.loading")}
      </div>
    </div>
  );
};

export const ErrorCard = ({
  id,
  message,
}: QueryStateProps & { message?: string }) => {
  const { t } = useI18n();
  return (
    <div className="page-container page-state">
      <div id={id} className="ui-card ui-stack" role="alert">
        {t("common.error", { message: message ?? t("common.errorFallback") })}
      </div>
    </div>
  );
};
