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
    showOverall: boolean;
}

export interface StatsProps {
    stat: string;
    value: string;
}
 function Badge({ playerData, children }) {
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
}

    


export default function PlayerCardSmall({playerData, showOverall}:PlayerDataProps) {
    return (
        <>  
            <Badge playerData={playerData}>
                <div className="pl-3 py-7">
                    <div className="flex flex-row h-[90px]">
                        <div className="flex flex-col items-center">
                            <div className="flex flex-col justify-center w-min items-center ">
                            <div className="text-2xl leading-[10px] min-h-[10px]">{!!showOverall ? (playerData?.overall?.overall) : ''}</div>
                                <span className="text-sm text-center w-minleading-2 pt-1">{playerData.position.toUpperCase()}</span>
                            </div>
                            <div>
                                <div className="">
                                {playerData.country ? (
                                        <Image src={playerData.country} alt="flag" width={18} height={9} />
                                    ) : (
                                        <Image src={flagImage} alt="flag" width={26} height={9} />
                                    )}
                                </div>
                                {playerData.team && <div className="pt-[6px]"><Image src={playerData.team} alt="flag" width={24} height={24} /></div>}
                                
                            </div>
                        </div>
                        <div className="h-full pb-[1px]">{playerData.image && <Image  className="h-full w-full" src={playerData.image} alt="flag" width={160} height={160} />}</div>
                    </div>
                    <div className="text-center pt-[3px] pr-3 text-sm">{playerData.name.toUpperCase()}</div>
                </div>
            </Badge>
        </>
    );
  }