import Image from "next/image";
import flagImage from "@/../public/flag.webp"

export interface PlayerDataProps {
    name: string;
    overall: {
        pace: string;
        shooting: string;
        passing: string;
        dribble: string;
        defense: string;
        physics: string;
        overall: string;
    };
    country?: string;
    team?: string;
    image?: string;
    position: string;
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

export default function PlayerCard(playerData:PlayerDataProps) {
    return (
      <div className="bg-[url('../../public/bronze.png')] h-[500px] w-[311px] bg-contain bg-center bg-no-repeat text-[#4d331f]">
        <div className="px-8 py-[72px]">
            <div className="flex flex-row h-[195px]">
                <div>
                    <div className="flex flex-col justify-center w-min items-center ">
                        <div className="text-6xl leading-10">94</div>
                        <span className="text-2xl text-center w-min leading-6 pt-1">RW</span>
                    </div>
                    
                    <div>
                        <div className="w-[54px] flex justify-center py-2 pl-2">
                            <Image src={flagImage} alt="flag" width={44} height={22}/>
                        </div>
                        <div>Time do Corno</div>
                    </div>
                </div>
                <div>Image do corno</div>
            </div>
            <div className="text-center py-3 text-4xl">CORNO</div>
            <div className="flex flex-row gap-16 justify-between">
                <div>
                    <Stats stat="PAC" value="87"/>
                    <Stats stat="SHO" value="87"/>
                    <Stats stat="PAS" value="87"/>
                </div>
                <div>
                    <Stats stat="DRI" value="87"/>
                    <Stats stat="DEF" value="87"/>
                    <Stats stat="PHY" value="87"/>
                </div>
            </div>
        </div>
      </div>
    );
  }