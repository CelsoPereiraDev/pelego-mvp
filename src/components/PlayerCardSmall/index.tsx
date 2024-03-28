import Image from "next/image";
import flagImage from "@/../public/flag.webp"

export interface PlayerDataProps {
    playerData:{
        name: string;
        overall: {
            pace: string;
            shooting: string;
            passing: string;
            dribble: string;
            defense: string;
            physics: string;
            overall: number;
        };
        country?: string;
        team?: string;
        image?: string;
        position: string;
    }
}

export interface StatsProps {
    stat: string;
    value: string;
}

export function Stats({stat, value}:StatsProps) {
    return (
        <div className="flex flex-row gap-2 text-2xl">
            <span>{value}</span>
            <span>{stat}</span>
        </div>
    )
}

export function Badge({ playerData, children }) {
    if (playerData.overall.overall < 65) {
        return (
            <div className={"bg-[url('../../public/bronze_small.png')] h-[116px] w-[80px] bg-contain bg-center bg-no-repeat text-[#4d331f]"}>
                {children}
            </div>
        );
    } else if (playerData.overall.overall < 74) {
        return (
            <div className={"bg-[url('../../public/silver_small.png')] h-[116px] w-[80px] bg-contain bg-center bg-no-repeat text-[#4d331f]"}>
                {children}
            </div>
        );
    } else {
        return (
            <div className={"bg-[url('../../public/gold_small.png')] h-[116px] w-[80px] bg-contain bg-center bg-no-repeat text-[#4d331f]"}>
                {children}
            </div>
        );
    }
}

    


export default function PlayerCardSmall({playerData}:PlayerDataProps) {
    let badgeColor = "bg-[url('../../public/gold_small.png')]";

    if(playerData.overall.overall < 74) {
        badgeColor = "bg-[url('../../public/bronze_small.png')]";
    } else if(playerData.overall.overall < 74) {
        badgeColor = "bg-[url('../../public/silver_small.png')]";
    }
        
    
    return (
        <>  
            <Badge playerData={playerData}>
                <div className="px-1.5 py-5">
                    <div className="flex flex-row h-[63px]">
                        <div className="flex flex-col items-center">
                            <div className="flex flex-col justify-center w-min items-center ">
                                <div className="text-md leading-[10px]">{playerData?.overall?.overall}</div>
                                <span className="text-xs text-center w-minleading-2">{playerData.position}</span>
                            </div>
                            <div>
                                <div className="">
                                {playerData.country ? (
                                        <Image src={playerData.country} alt="flag" width={18} height={9} />
                                    ) : (
                                        <Image src={flagImage} alt="flag" width={16} height={9} />
                                    )}
                                </div>
                                {playerData.team && <div className="text-[4px] pt-1"><Image src={playerData.team} alt="flag" width={14} height={20} /></div>}
                                
                            </div>
                        </div>
                        <div className="text-xs">{playerData.image && <Image src={playerData.image} alt="flag" width={18} height={9} />}</div>
                    </div>
                    <div className="text-center pt-[3px] text-xs">{playerData.name}</div>
                </div>
            </Badge>
        </>
    );
  }