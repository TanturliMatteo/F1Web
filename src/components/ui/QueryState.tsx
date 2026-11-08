import { useQueryClient } from "@tanstack/react-query";
import { useI18n } from "../../i18n/i18n";
import { errorMessageKey } from "../../errors";

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

// A data request failed: translated message by error class, plus a retry
export const ErrorCard = ({
  id,
  error,
}: QueryStateProps & { error: unknown }) => {
  const { t } = useI18n();
  const queryClient = useQueryClient();
  return (
    <div className="page-container page-state">
      <div id={id} className="ui-card ui-stack" role="alert">
        <p>{t(errorMessageKey(error))}</p>
        {/* Asks again only for the failed data this page is waiting on */}
        <button
          id={`${id}-retry`}
          type="button"
          className="link-button"
          onClick={() =>
            queryClient.refetchQueries({
              type: "active",
              predicate: (query) => query.state.status === "error",
            })
          }
        >
          {t("common.retry")}
        </button>
      </div>
    </div>
  );
};
