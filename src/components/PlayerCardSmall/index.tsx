'use client'

import { Player } from "@/types/player";
import Image from "next/image";
import Flag from "react-world-flags";
import { NH } from "../../utils/images";

interface PlayerCardSmallProps {
    playerData: Player;
    showOverall: boolean;
}

export interface BadgeProps {
    playerData: Player;
    children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ playerData, children }) => {
    if (playerData.overall.overall < 65) {
        return (
            <div className={"bg-[url('../../public/bronze_small.png')] h-[160px] w-[109px] bg-contain bg-center bg-no-repeat text-[#4d331f]"}>
                {children}
            </div>
        );
    } else if (playerData.overall.overall < 74) {
        return (
            <div className={"bg-[url('../../public/silver_small.png')] h-[160px] w-[109px] bg-contain bg-center bg-no-repeat text-[#4d331f]"}>
                {children}
            </div>
        );
    } else {
        return (
            <div className={"bg-[url('../../public/gold_small.png')] h-[160px] w-[109px] bg-contain bg-center bg-no-repeat text-[#4d331f]"}>
                {children}
            </div>
        );
    }
};

const PlayerCardSmall: React.FC<PlayerCardSmallProps> = ({ playerData, showOverall }) => {
    return (
        <>
            {playerData.isChampion ? (
                <div className={"bg-[url('../../public/week_champion.png')] h-[185px] w-[120px] bg-cover bg-center bg-no-repeat"}>
                    <div className="pl-3 py-7">
                        <div className="flex flex-row h-[88px] justify-between mt-[14px]">
                        <div className="flex flex-col gap-2">
                          
                            <div>
                                 {playerData.country ? (
                                            <Flag code={playerData.country}   alt="flag" width={26} height={9}/>
                                        ) : (
                                            <Flag code="BR"   alt="flag" width={26} height={9}/>
                                        )}
                            </div>
                            {playerData.team === 'NH' && (
                                        
                                            <Image src={NH} alt="team logo" width={24} height={24} />
                                        
                                    )}
                            </div>
                            <div className="flex flex-col items-center mr-3">
                                <div className="flex flex-col justify-center w-min items-center">
                                    <div className="text-2xl leading-[23px] min-h-[10px] text-gradient">
                                        {showOverall ? playerData.overall.overall : ''}
                                    </div>
                                    <span className="text-sm text-center w-min leading-2 text-gradient">
                                        {playerData.position.toUpperCase()}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="text-center pt-[14px] pr-3 text-sm text-gradient">
                            {playerData.name.toUpperCase()}
                        </div>
                    </div>
                    <style jsx>{`
                        .text-gradient {
                            background-image: linear-gradient(to bottom right, #9e7e47, #fbdd97);
                            -webkit-background-clip: text;
                            background-clip: text;
                            color: transparent;
                        }
                    `}</style>
                </div>
            ) : (
                <Badge playerData={playerData}>
                    <div className="pl-3 py-7">
                        <div className="flex flex-row h-[90px]">
                            <div className="flex flex-col items-center">
                                <div className="flex flex-col justify-center w-min items-center">
                                    <div className="text-2xl leading-[10px] min-h-[10px]">
                                        {showOverall ? playerData.overall.overall : ''}
                                    </div>
                                    <span className="text-sm text-center w-min leading-2 pt-1">
                                        {playerData.position.toUpperCase()}
                                    </span>
                                </div>
                                <div>
                                    <div>
                                        {playerData.country ? (
                                            <Flag code={playerData.country}   alt="flag" width={26} height={9}/>
                                        ) : (
                                            <Flag code="BR"   alt="flag" width={26} height={9}/>
                                        )}
                                    </div>
                                    {playerData.team === 'NH' && (
                                        <div className="pt-[3px]">
                                            <Image src={NH} alt="team logo" width={24} height={24} />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="h-full pb-[1px]">
                                {playerData.image && (
                                    <Image className="h-full w-full" src={playerData.image} alt="player image" width={160} height={160} />
                                )}
                            </div>
                        </div>
                        <div className="text-center pt-[3px] pr-3 text-sm">
                            {playerData.name.toUpperCase()}
                        </div>
                    </div>
                    <style jsx>{`
                        .text-gradient {
                            background-image: linear-gradient(to bottom right, #9e7e47, #fbdd97);
                            -webkit-background-clip: text;
                            background-clip: text;
                            color: transparent;
                        }
                    `}</style>
                </Badge>
            )}
        </>
    );
};

export default PlayerCardSmall;
