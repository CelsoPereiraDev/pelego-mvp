'use client'

import { Player } from "@/types/player";
import BatteryAlertIcon from '@mui/icons-material/BatteryAlert';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import Image from "next/image";
import Flag from "react-world-flags";
import { monthWinner, NH, StrikerMonth, StrikerMVP, StrikerNormal, StrikerWeek } from "../../utils/images";

interface PlayerCardSmallProps {
    playerData: Player;
    showOverall: boolean;
}

export interface BadgeProps {
    playerData: Player;
    children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ playerData, children }) => {
    const getBackgroundImage = () => {
        if (playerData.overall.overall < 65) {
            return "bg-[url('../../public/bronze_small.png')]";
        } else if (playerData.overall.overall < 74) {
            return "bg-[url('../../public/silver_small.png')]";
        } else {
            return "bg-[url('../../public/gold_small.png')]";
        }
    };

    return (
        <div className={`${getBackgroundImage()} h-[160px] w-[109px] bg-contain bg-center bg-no-repeat text-[#4d331f]`}>
            {children}
        </div>
    );
};

const MonthChampionCard: React.FC<{ playerData: Player, showOverall: boolean }> = ({ playerData, showOverall }) => (
    <div className={"bg-[url('../../public/MMVP.png')] h-[169px] w-[149px] bg-cover bg-center bg-no-repeat"}>
        <div className="pl-3 py-7">
            <div className="flex flex-row h-[90px]">
                <div className="flex flex-col items-center">
                    <div className="flex flex-col justify-center w-min items-center pt-[17px] pl-2">
                        <div className="text-2xl leading-[10px] min-h-[10px] text-[#b2f41d]">
                            {showOverall ? playerData.overall.overall : ''}
                        </div>
                        <span className="text-sm text-center w-min leading-2 pt-1 text-[#b2f41d]">
                            {playerData.position.toUpperCase()}
                        </span>
                    </div>
                    <div>
                        <div className="pl-[6px]">
                            {playerData.country ? (
                                <Flag code={playerData.country} alt="flag" width={26} height={9}/>
                            ) : (
                                <Flag code="BR" alt="flag" width={26} height={9}/>
                            )}
                        </div>
                        {playerData.team === 'NH' && (
                            <div className="pt-[3px] pl-[6px]">
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
            <div className="text-center pt-[10px] pr-3 text-sm text-[#b2f41d]">
                {playerData.name.toUpperCase()}
            </div>
            <div className="flex flex-row justify-center pr-3 gap-[2px]">
                {playerData.monthStriker &&
                    <Image src={StrikerMVP} alt="team logo" width={18} height={18} className="relative bottom-[9px] pt-[2px]"/>
                }
                {playerData.monthTopPointer &&
                    <Image src={monthWinner} alt="team logo" width={18} height={18} className="relative bottom-[9px] pt-[2px]"/>
                }
            </div>
        </div>
    </div>
);

const MostPointerCard: React.FC<{ playerData: Player, showOverall: boolean }> = ({ playerData, showOverall }) => (
    <div className={"bg-[url('../../public/MPIM1.png')] h-[169px] w-[149px] bg-contain bg-center bg-no-repeat"}>
        <div className="pl-3 py-7">
            <div className="flex flex-row h-[90px]">
                <div className="flex flex-col items-center">
                    <div className="flex flex-col justify-center w-min items-center mt-[16px] ml-2 bg-gradient-to-t from-custom-gradient-start to-custom-gradient-end">
                        <div className="text-2xl leading-[10px] min-h-[10px] text-[#ffdb95]">
                            {showOverall ? playerData.overall.overall : ''}
                        </div>
                        <span className="text-sm text-center w-min leading-2 pt-1 text-[#ffdb95] drop-shadow-sm">
                            {playerData.position.toUpperCase()}
                        </span>
                    </div>
                    <div>
                        <div className="pl-[6px]">
                            {playerData.country ? (
                                <Flag code={playerData.country} alt="flag" width={26} height={9}/>
                            ) : (
                                <Flag code="BR" alt="flag" width={26} height={9}/>
                            )}
                        </div>
                        {playerData.team === 'NH' && (
                            <div className="pt-[3px] pl-[6px]">
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
            <div className="text-center pt-[10px] pr-3 text-sm text-[#ffdb95] drop-shadow-sm">
                {playerData.name.toUpperCase()}
            </div>
            <div className="flex flex-row justify-center pr-3 gap-[2px]">
                {playerData.monthStriker &&
                    <Image src={StrikerMVP} alt="team logo" width={18} height={18} className="relative bottom-[9px] pt-[2px]"/>
                }
            </div>
        </div>
    </div>
);

const StrikerCard: React.FC<{ playerData: Player, showOverall: boolean }> = ({ playerData, showOverall }) => (
    <div className={"bg-[url('../../public/MTS.png')] h-[169px] w-[149px] bg-contain bg-center bg-no-repeat"}>
        <div className="pl-3 py-7">
            <div className="flex flex-row h-[90px]">
                <div className="flex flex-col items-center">
                    <div className="flex flex-col justify-center w-min items-center mt-[16px] ml-2">
                        <div className="text-2xl leading-[10px] min-h-[10px] text-[#f1e8f2]">
                            {showOverall ? playerData.overall.overall : ''}
                        </div>
                        <span className="text-sm text-center w-min leading-2 pt-1 text-[#f1e8f2] drop-shadow-sm">
                            {playerData.position.toUpperCase()}
                        </span>
                    </div>
                    <div>
                        <div className="pl-[6px]">
                            {playerData.country ? (
                                <Flag code={playerData.country} alt="flag" width={26} height={9}/>
                            ) : (
                                <Flag code="BR" alt="flag" width={26} height={9}/>
                            )}
                        </div>
                        {playerData.team === 'NH' && (
                            <div className="pt-[3px] pl-[6px]">
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
            <div className="text-center pt-[10px] pr-3 text-sm text-[#f1e8f2] drop-shadow-sm">
                {playerData.name.toUpperCase()}
            </div>
            <div className="flex flex-row justify-center pr-3 gap-[2px]">
                <Image src={StrikerMonth} alt="team logo" width={18} height={18} className="relative bottom-[9px] pt-[2px]"/>
            </div>
        </div>
    </div>
);

const DefenderCard: React.FC<{ playerData: Player, showOverall: boolean }> = ({ playerData, showOverall }) => (
    <div className={"bg-[url('../../public/defender.png')] h-[169px] w-[149px] bg-contain bg-center bg-no-repeat"}>
        <div className="pl-3 py-7">
            <div className="flex flex-row h-[90px]">
                <div className="flex flex-col items-center">
                    <div className="flex flex-col justify-center w-min items-center mt-[12px] ml-[6px]">
                        <div className="text-2xl leading-[10px] min-h-[10px] text-[#adbeb7]">
                            {showOverall ? playerData.overall.overall : ''}
                        </div>
                        <span className="text-sm text-center w-min leading-2 pt-1 text-[#adbeb7] drop-shadow-sm">
                            {playerData.position.toUpperCase()}
                        </span>
                    </div>
                    <div>
                        <div className="pl-[6px]">
                            {playerData.country ? (
                                <Flag code={playerData.country} alt="flag" width={26} height={9}/>
                            ) : (
                                <Flag code="BR" alt="flag" width={26} height={9}/>
                            )}
                        </div>
                        {playerData.team === 'NH' && (
                            <div className="pt-[3px] pl-[6px]">
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
            <div className="text-center pt-[10px] pr-3 text-sm text-[#adbeb7] drop-shadow-sm">
                {playerData.name.toUpperCase()}
            </div>
            <div className="flex flex-row justify-center pr-3 gap-[2px]">
                <LocalPoliceIcon className="max-h-[15px] max-w-[15px] relative  bottom-[4px] text-[#adbeb7]" />
            </div>
        </div>
    </div>
);

const WeekChampionCard: React.FC<{ playerData: Player, showOverall: boolean }> = ({ playerData, showOverall }) => (
    <div className={"bg-[url('../../public/week_champion.png')] h-[185px] w-[120px] bg-cover bg-center bg-no-repeat"}>
        <div className="pl-3 py-7">
            <div className="flex flex-row h-[88px] justify-between mt-[14px]">
                <div className="flex flex-col gap-2">
                    <div>
                        {playerData.country ? (
                            <Flag code={playerData.country} alt="flag" width={26} height={9}/>
                        ) : (
                            <Flag code="BR" alt="flag" width={26} height={9}/>
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
            <div className="flex flex-row justify-center pr-3 gap-1">
                {playerData.monthStriker && playerData.monthTopPointer &&
                    <>
                        <Image src={StrikerWeek} alt="team logo" width={16} height={16} className="relative bottom-[5px] pt-[1px]"/>
                        <Image src={monthWinner} alt="team logo" width={16} height={16} className="relative bottom-[6px] pt-[2px]"/>
                    </>
                }
                {playerData.monthStriker && playerData.monthLVP &&
                    <div className="flex flex-row justify-center pr-3">
                        <Image src={StrikerWeek} alt="team logo" width={16} height={16} className="relative bottom-[5px] pt-[1px]"/>
                        <BatteryAlertIcon className='text-[#CEAF70] max-h-[16px] max-w-[16px] relative  bottom-1' />
                    </div>
                }
                <div className="flex flex-row justify-center gap-[2px]">
                    {playerData.monthStriker && !playerData.monthTopPointer && !playerData.monthLVP &&
                        <Image src={StrikerWeek} alt="team logo" width={18} height={18} className="relative bottom-2 pt-[1px]"/>
                    }
                    {playerData.monthTopPointer && !playerData.monthStriker &&
                        <Image src={monthWinner} alt="team logo" width={18} height={18} className="relative bottom-[6px] pt-[2px]"/>
                    }
                    {playerData.monthLVP && !playerData.monthStriker &&
                        <BatteryAlertIcon className='text-[#CEAF70] max-h-[18px] max-w-[18px] relative  bottom-1' />
                    }
                </div>
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
);

const NormalPlayerCard: React.FC<{ playerData: Player, showOverall: boolean }> = ({ playerData, showOverall }) => (
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
                                <Flag code={playerData.country} alt="flag" width={26} height={9}/>
                            ) : (
                                <Flag code="BR" alt="flag" width={26} height={9}/>
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
            <div className="flex flex-row justify-center pr-3 gap-1">
                {playerData.monthStriker && playerData.monthTopPointer &&
                    <>
                        <Image src={StrikerNormal} alt="team logo" width={15} height={15} className="relative bottom-[7px] pt-[1px]"/>
                        <Image src={monthWinner} alt="team logo" width={15} height={15} className="relative bottom-[7px] pt-[2px]"/>
                    </>
                }
                {playerData.monthStriker && playerData.monthLVP &&
                    <div className="flex flex-row justify-center pr-3">
                        <Image src={StrikerNormal} alt="team logo" width={15} height={15} className="relative bottom-[7px] pt-[1px]"/>
                        <BatteryAlertIcon className='text-red-700 max-h-[15px] max-w-[15px] relative  bottom-[6px]' />
                    </div>
                }
                <div className="flex flex-row justify-center gap-[2px]">
                    {playerData.monthStriker && !playerData.monthTopPointer && !playerData.monthLVP &&
                        <Image src={StrikerNormal} alt="team logo" width={18} height={18} className="relative bottom-2 pt-[2px]"/>
                    }
                    {playerData.monthTopPointer && !playerData.monthStriker &&
                        <Image src={monthWinner} alt="team logo" width={18} height={18} className="relative bottom-[6px] pt-[2px]"/>
                    }
                    {playerData.monthLVP && !playerData.monthStriker &&
                        <BatteryAlertIcon className='text-red-700 max-h-[18px] max-w-[18px] relative  bottom-[6px]' />
                    }
                </div>
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
);

const PlayerCardSmall: React.FC<PlayerCardSmallProps> = ({ playerData, showOverall }) => {
    const renderPlayerCard = () => {
        if (playerData.monthChampion) {
            return <MonthChampionCard playerData={playerData} showOverall={showOverall} />;
        } else if (playerData.monthTopPointer) {
            return <MostPointerCard playerData={playerData} showOverall={showOverall} />
        } else if (playerData.monthStriker) {
            return <StrikerCard playerData={playerData} showOverall={showOverall} />
        } else if (playerData.monthBestDefender) { 
            return <DefenderCard playerData={playerData} showOverall={showOverall} />
        } else if (playerData.isChampion) {
            return <WeekChampionCard playerData={playerData} showOverall={showOverall} />;
        } else {
            return <NormalPlayerCard playerData={playerData} showOverall={showOverall} />;
        }
    };

    return <>{renderPlayerCard()}</>;
};

export default PlayerCardSmall;
