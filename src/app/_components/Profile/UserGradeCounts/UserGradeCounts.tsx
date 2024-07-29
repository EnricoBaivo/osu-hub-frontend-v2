"use client";

import Image from "next/image";
import type { GradeCounts } from "osu-web.js";


const UserGradeCount = ({ grade, count }: { grade: string, count: number }) => {
  return <div
    className="items-bottom flex w-28 flex-col gap-2 items-center justify-end"
    key={grade}
  >
    <Image unoptimized src={`/grades/${grade.toLowerCase()}.svg`} alt={grade} width={60} height={40} />
    <span className=" text-2xl text-white" >{Number(count)}  </span>
  </div >
}

const UserGradeCounts = ({
  userGradeCounts,
}: {
  userGradeCounts: GradeCounts;
}) => {
  return (
    <div className="flex w-full justify-end ">
      <UserGradeCount grade={"SSH"} count={userGradeCounts.ssh ?? 0} />
      <UserGradeCount grade={"SS"} count={userGradeCounts.ss ?? 0} />
      <UserGradeCount grade={"SH"} count={userGradeCounts.sh ?? 0} />
      <UserGradeCount grade={"S"} count={userGradeCounts.s ?? 0} />
      <UserGradeCount grade={"A"} count={userGradeCounts.a ?? 0} />
    </div>
  );
};

export default UserGradeCounts;
