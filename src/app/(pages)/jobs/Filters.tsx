"use client";

import JobsContext from "@/serviceProviders/jobsContext";
import { Sliders } from "@phosphor-icons/react";
import { useContext, ChangeEvent } from "react";
import { Location, Commitment, JobLevel } from "@/models/jobs";

export default function Filters() {
    const {
        compensationRange,
        setCompensationRange,
        locations,
        setLocations,
        commitments,
        setCommitments,
        levels,
        setLevels
    } = useContext(JobsContext);

    // Handle changes to the compensation range inputs
    const handleCompensationChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const value = parseInt(e.target.value, 10) || 0;
        const updatedRange: [number, number] = [...compensationRange] as [number, number];
        updatedRange[index] = value;
        setCompensationRange(updatedRange);
    };

    // Handle changes to location filters
    const handleLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value as Location;
        if (e.target.checked) {
            setLocations([...locations, value]);
        } else {
            setLocations(locations.filter((loc) => loc !== value));
        }
    };

    // Handle changes to commitment filters
    const handleCommitmentChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value as Commitment;
        if (e.target.checked) {
            setCommitments([...commitments, value]);
        } else {
            setCommitments(commitments.filter((com) => com !== value));
        }
    };

    // Handle changes to level filters
    const handleLevelChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value as JobLevel;
        if (e.target.checked) {
            setLevels([...levels, value]);
        } else {
            setLevels(levels.filter((com) => com !== value));
        }
    };

    return (
        <div className="flex flex-col gap-[10px] flex-none w-full lg:max-w-[20%] min-w-[250px]">
            <div className="flex flex-row justify-between">
                <h5 className="font-inter text-[20px] font-bold">Filters</h5>
                <Sliders size={24} className="self-center" />
            </div>
            <div className="flex flex-row flex-wrap lg:flex-col gap-[16px] w-full">
                <div className="flex flex-col gap-[5px]">
                    <div className="text-white-700">Compensation</div>
                    <div className="flex flex-row gap-[10px] items-center">
                        <input
                            type="number"
                            placeholder="Min"
                            value={compensationRange[0]}
                            onChange={(e) => handleCompensationChange(e, 0)}
                            className="flex-none w-auto max-w-[90px] rounded-[8px] px-[10px] py-[5px] outline outline-1 outline-white-500 bg-white-100"
                        />
                        to
                        <input
                            type="number"
                            placeholder="Max"
                            value={compensationRange[1]}
                            onChange={(e) => handleCompensationChange(e, 1)}
                            className="flex-none w-auto max-w-[90px] rounded-[8px] px-[10px] py-[5px] outline outline-1 outline-white-500 bg-white-100"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-[5px]">
                    <div className="text-white-700">Location</div>
                    <div className="flex flex-col gap-[5px]">
                        {(["Hybrid", "Remote", "Onsite"] as Location[]).map((location) => (
                            <div className="flex flex-row gap-[5px]" key={location}>
                                <input
                                    type="checkbox"
                                    value={location}
                                    checked={locations.includes(location)}
                                    onChange={handleLocationChange}
                                />
                                {location}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-[5px]">
                    <div className="text-white-700">Commitment</div>
                    <div className="flex flex-col gap-[5px]">
                        {(["Full-time", "Part-time", "Up-To-You"] as Commitment[]).map((commitment) => (
                            <div className="flex flex-row gap-[5px]" key={commitment}>
                                <input
                                    type="checkbox"
                                    value={commitment}
                                    checked={commitments.includes(commitment)}
                                    onChange={handleCommitmentChange}
                                />
                                {commitment}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-[5px]">
                    <div className="text-white-700">Level</div>
                    <div className="flex flex-col gap-[5px]">
                        {(["intern", "entry", "mid", "senior"] as JobLevel[]).map((level) => (
                            <div className="flex flex-row gap-[5px]" key={level}>
                                <input
                                    type="checkbox"
                                    value={level}
                                    checked={levels.includes(level)}
                                    onChange={handleLevelChange}
                                />
                                {level.charAt(0).toUpperCase() + level.slice(1)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
