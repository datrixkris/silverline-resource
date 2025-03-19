"use client";

import React, { useEffect, useState } from "react";
import TeamCard, { TeamCardProps } from "./TeamCard";
import { api } from "@/app/utils/api";
import SkeletonCardGrid from "@/app/components/generic/SkeletonCardGrid";
import StaggeredFadeUp from "@/app/components/animations/StaggeredFadeUp";

const TeamsGrid = () => {
  const [teams, setTeams] = useState<TeamCardProps[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get("staff");
        setTeams(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="">
      {loading ? (
        <SkeletonCardGrid gridClassname="grid sm:grid-cols-2 md:grid-cols-3 gap-5" />
      ) : (
        <div className="">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {teams.map((team, index) => (
              <StaggeredFadeUp key={index} index={index}>
                <TeamCard team={team} key={index} />
              </StaggeredFadeUp>
            ))}
          </div>

          {/* {teams.length < 1 && (
            <p className="text-gray-300 text-2xl text-center">
              No data to display
            </p>
          )} */}
        </div>
      )}
    </section>
  );
};

export default TeamsGrid;
