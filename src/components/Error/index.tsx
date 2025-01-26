"use client";

import classes from "@/utils/classes";
import styles from "./error.module.css";
import { X } from "@phosphor-icons/react/dist/ssr";
import { useEffect } from "react";

interface ErrorProps {
    error: string;
    resetError: () => void;
}

export default function Error({ error, resetError }: ErrorProps) {

    useEffect(() => {
        if(error.length > 0) {
            setTimeout(() => {
                resetError();
            }, 5000);

        }
    }, [error]);

    return (
        <>
            {error.length > 0 &&
                <div className={
                    classes(
                        styles.show, 
                        "font-font-inter p-[10px] rounded-[10px]",
                        "bg-red-500 text-white-100 font-semibold",
                        "flex gap-[10px] items-center max-w-[300px]",
                        "z-50 shadow-2xl")}>
                    {error}
                    <X size={20} className="cursor-pointer" onClick={resetError}/>
                </div>}
        </>
    )
}