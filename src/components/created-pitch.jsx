import { getApplications } from '@/api/apiApplications';
import useFetch from '@/hooks/use-fetch';
import { useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { BarLoader } from 'react-spinners';
import ApplicationCard from './application-card';
import { getpitches } from '../api/apiPitch';

const CreatedPitches = () => {
    const { user } = useUser();

    const {
        loading: loadingPitches,
        data: pitches,
        fn: fnPitches,
      } = useFetch(getpitches, {
        user_id: user.id,
      });

      useEffect(() => {
        fnPitches();
      },[]);

      if(loadingPitches){
        return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
      }

    const safePitches = Array.isArray(pitches) ? pitches : [];

  return (
    <div className="flex flex-col gap-2">
            {safePitches.length === 0 ? (
                <div>No applications found.</div>
            ) : (
                safePitches.map((pitch) => (
                    <ApplicationCard
                        key={pitch.id}
                        pitch={pitch}
                        isFounder
                    />
                ))
            )}
        </div>
  );
};

export default CreatedPitches;