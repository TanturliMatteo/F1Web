import { useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();
  return (
    <div className="page-container page-state">
      <div id={id} className="ui-card ui-stack" role="alert">
        {t("common.error", { message: message ?? t("common.errorFallback") })}
        {/* Asks again for the data this page is waiting on */}
        <button
          id={`${id}-retry`}
          type="button"
          className="link-button"
          onClick={() => queryClient.refetchQueries({ type: "active" })}
        >
          {t("common.retry")}
        </button>
      </div>
    </div>
  );
};
