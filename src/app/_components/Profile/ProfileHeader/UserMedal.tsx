import { UserAchievement } from 'osu-web.js';
import MedalComponent from './MedalComponent';
import { getMedals } from '@/actions';
import { MedalInterface } from '@/hooks/useFetchMedals';

export default async function UserMedals({ userAchievments, onlyReached }: { userAchievments?: UserAchievement[] | undefined | null, onlyReached?: boolean }) {
    const medals = await getMedals();

    const groupedData = medals.reduce((acc: { [key: string]: { "medal": MedalInterface, "userAchievement": UserAchievement | undefined }[] }, medal: MedalInterface) => {
        const category = medal.Grouping;
        const userAchievment = userAchievments ? userAchievments.find(achievement => medal.MedalID === achievement.achievement_id) : undefined;
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push({ "medal": medal, "userAchievement": userAchievment });
        return acc;
    }, {});
    return (
        <div className='flex flex-col w-full items-center justify-center'>
            <div>Yoúr Medals, for the pedals </div>
            {Object.keys(groupedData).map((category, groupIndex) => {
                const hasAnyMedalInCategory = groupedData[category]?.some((obj) => obj.userAchievement);

                return (hasAnyMedalInCategory || !onlyReached) && <div key={groupIndex} className='flex flex-col gap-2 py-12 w-1/2' >
                    < h2 className='text-osuhub-yellow pb-4'>{category}</h2>

                    <div className='flex flex-wrap gap-2 ' >
                        {groupedData[category]?.map((medalData, index) => {
                            return (
                                <MedalComponent onlyReached key={medalData.medal.MedalID} medal={medalData.medal} userAchievment={medalData.userAchievement} medalId={medalData.medal.MedalID} />
                            );
                        })}
                    </div>
                </div>
            })}
        </div >
    );
}
