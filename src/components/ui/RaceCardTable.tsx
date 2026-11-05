import { Link } from "react-router";
import type { Results } from "../../services/ResultServices";
import getTeamColor from "../../utils/teamColors";
import {
  formatGain,
  gainClass,
  isClassified,
  placesGained,
  resultLabel,
} from "../../utils/results";
import { timeOrStatus } from "../../utils/raceSummary";
import { useI18n } from "../../i18n/i18n";

interface RaceCardTableProps {
  data: Results[];
}

// Full classification of a race
const RaceCardTable = ({ data: results }: RaceCardTableProps) => {
  const { t } = useI18n();
  return (
    <div id="race-card-table-card" className="ui-card">
      <table id="race-card-table" className="w-100">
        <thead id="race-card-table-head">
          <tr>
            <th>{t("race.classification.pos")}</th>
            <th>{t("race.classification.driver")}</th>
            <th className="hide-mobile">{t("race.classification.team")}</th>
            <th>{t("race.classification.grid")}</th>
            <th>+/-</th>
            <th className="hide-mobile">{t("race.classification.time")}</th>
            <th>{t("race.classification.pts")}</th>
          </tr>
        </thead>
        <tbody id="race-card-table-body">
          {results.map((res) => {
            const gain = placesGained(res);

            return (
              <tr key={res.driverId} id={`race-card-table-row-${res.position}`}>
                <td
                  className="team-stripe"
                  style={{ borderLeftColor: getTeamColor(res.constructorId) }}
                >
                  {isClassified(res.positionText)
                    ? res.position
                    : resultLabel(res.positionText)}
                </td>
                <td>
                  <Link
                    id={`race-card-table-link-${res.position}`}
                    to={`/pilots/${res.code.toLowerCase()}`}
                  >
                    {res.givenName} {res.familyName}
                  </Link>
                </td>
                <td className="hide-mobile">{res.constructorName}</td>
                <td>{res.grid || t("race.classification.pitLane")}</td>
                <td className={gainClass(gain)}>
                  {gain === null ? "-" : formatGain(gain)}
                </td>
                <td className="hide-mobile">{timeOrStatus(res)}</td>
                <td>{res.points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RaceCardTable;
