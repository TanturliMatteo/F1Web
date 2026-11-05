import { Link } from "react-router";
import { getNationalityToCode } from "../../utils/nationalityCode";
import { flagUrl } from "../../utils/flagUrl";
import getTeamColor from "../../utils/teamColors";
import type { PilotStandings } from "../../services/PilotStandingsServices";
import { useI18n } from "../../i18n/i18n";

interface PilotTableProps {
  data: PilotStandings[];
  // Leader's points, to show each driver's gap
  leaderPoints: number;
}

const PilotTable = ({ data: pilots = [], leaderPoints }: PilotTableProps) => {
  const { t } = useI18n();
  if (pilots.length === 0) {
    return (
      <div id="pilots-table-empty" className="ui-card">
        <p>{t("pilots.noMatch")}</p>
      </div>
    );
  }
  return (
    <div id="pilots-table-card" className="ui-card">
      <table id="pilots-table" className="w-100">
        <thead id="pilots-table-head">
          <tr>
            <th>{t("pilots.columns.pos")}</th>
            <th>{t("pilots.columns.driver")}</th>
            <th className="hide-mobile">{t("pilots.columns.nationality")}</th>
            <th className="hide-mobile">{t("pilots.columns.team")}</th>
            <th>{t("pilots.columns.wins")}</th>
            <th className="hide-mobile">{t("pilots.columns.gap")}</th>
            <th>{t("pilots.columns.pts")}</th>
          </tr>
        </thead>
        <tbody id="pilots-table-body">
          {pilots.map((pilot) => {
            const gap = leaderPoints - Number(pilot.points);
            return (
              <tr key={pilot.driverId} id={`pilots-table-row-${pilot.driverId}`}>
                <td
                  className="team-stripe"
                  style={{ borderLeftColor: getTeamColor(pilot.constructorId) }}
                >
                  {pilot.position}
                </td>
                <td>
                  <Link
                    id={`pilots-table-link-${pilot.driverId}`}
                    to={`/pilots/${pilot.code.toLowerCase()}`}
                  >
                    {pilot.name} {pilot.surname}
                  </Link>
                </td>
                <td className="hide-mobile">
                  <img
                    id={`pilots-table-flag-${pilot.driverId}`}
                    src={flagUrl(getNationalityToCode(pilot.nationality))}
                    alt=""
                    className="flag"
                  />
                  {pilot.nationality}
                </td>
                <td className="hide-mobile">{pilot.team}</td>
                <td>{pilot.wins}</td>
                <td className="hide-mobile text-muted-soft">
                  {gap > 0 ? `-${gap}` : "-"}
                </td>
                <td className="text-strong">{pilot.points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PilotTable;
