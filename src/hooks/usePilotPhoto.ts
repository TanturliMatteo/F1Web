import { useEffect, useState } from "react";
import { fetchPilotPhoto } from "../services/PilotPhotoServices";

type DriverPhoto = {
  meeting_key: number;
  session_key: number;
  driver_number: number;
  broadcast_name: string;
  full_name: string;
  name_acronym: string;
  team_name: string;
  team_colour: string;
  first_name: string;
  last_name: string;
  headshot_url: string;
  country_code: string | null;
};
export type PilotPhoto = {
  driverCode: string;
  url: string;
};

export function usePilotPhoto(driverCode?: string) {
  const [data, setData] = useState<PilotPhoto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchPilotPhoto();

        const photos: DriverPhoto[] = result;

        const formatted: PilotPhoto[] = photos.map((p) => ({
          driverCode: p.name_acronym.toLowerCase(),
          url: p.headshot_url,
        }));

        const photo =
          formatted.find((p) => p.driverCode === driverCode) ?? null;
        setData(photo);
      } catch (err) {
        if (err instanceof Error) setError(err);
        else setError(new Error("Unknown error"));
      } finally {
        setLoading(false);
      }
    };

    if (driverCode) {
      fetchData();
    }
  }, [driverCode]);

  return { data, loading, error };
}
