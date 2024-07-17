'use client'
import Image from "next/image";
import flagImage from "@/../public/flag.webp"
import { Player } from "@/types/player";
import React from "react";

export interface StatsProps {
    stat: string;
    value: number;
}

export function Stats({ stat, value }: StatsProps) {
    return (
        <div className="flex flex-row gap-2 text-2xl">
            <span>{String(value)}</span>
            <span>{stat}</span>
        </div>
    );
}

function Badge({ playerData, children }: { playerData: Player, children: React.ReactNode }) {
    if (playerData.overall.overall < 65) {
        return (
            <div className={"bg-[url('../../public/bronze.png')] h-[500px] w-[311px] bg-contain bg-center bg-no-repeat text-[#4d331f]"}>
                {children}
            </div>
        );
    } else if (playerData.overall.overall < 74) {
        return (
            <div className={"bg-[url('../../public/silver.png')] h-[500px] w-[311px] bg-contain bg-center bg-no-repeat text-[#4d331f]"}>
                {children}
            </div>
        );
    } else {
        return (
            <div className={"bg-[url('../../public/gold.png')] h-[500px] w-[311px] bg-contain bg-center bg-no-repeat text-[#4d331f]"}>
                {children}
            </div>
        );
    }
}

export default function PlayerCard({ playerData }: { playerData: Player }) {
    return (
        <Badge playerData={playerData}>
            <div className="px-8 py-[72px]">
                <div className="flex flex-row h-[195px]">
                    <div>
                        <div className="flex flex-col justify-center w-min items-center">
                            <div className="text-6xl leading-10 min-h-10">{playerData?.overall?.overall}</div>
                            <span className="text-2xl text-center w-min leading-6 pt-1 min-h-7 mr-[8px]">{playerData.position}</span>
                        </div>

                        <div className="h-[45px] mt-[3px]">
                            <div className="w-[54px] flex justify-center pt-[6px] ml-[5px]">
                                {typeof playerData.country === "string" ? (
                                    <Image src={playerData.country} alt="flag" width={48} height={22} />
                                ) : (
                                    <Image src={flagImage} alt="flag" width={48} height={22} />
                                )}
                            </div>
                            {playerData.team && (
                                <div className="pt-[6px] ml-1">
                                    <Image src={typeof playerData.team === "string" ? playerData.team : playerData.team.src} alt="team" width={48} height={48} />
                                </div>
                            )}
                        </div>
                    </div>
                    <div>{playerData.image && <Image src={typeof playerData.image === "string" ? playerData.image : playerData.image.src} alt="player" width={26} height={26} />}</div>
                </div>
                <div className="text-center py-3 text-4xl min-h-[64px]">{playerData.name}</div>
                <div className="flex flex-row gap-16 justify-between">
                    <div>
                        <Stats stat="PAC" value={playerData.overall?.pace} />
                        <Stats stat="SHO" value={playerData.overall?.shooting} />
                        <Stats stat="PAS" value={playerData.overall?.passing} />
                    </div>
                    <div>
                        <Stats stat="DRI" value={playerData.overall?.dribble} />
                        <Stats stat="DEF" value={playerData.overall?.defense} />
                        <Stats stat="PHY" value={playerData.overall?.physics} />
                    </div>
                </div>
            </div>
        </Badge>
    );
}
