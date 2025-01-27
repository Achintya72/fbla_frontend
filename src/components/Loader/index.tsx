import classes from "@/utils/classes";
import styles from "./loader.module.css";

// interface LoaderProps {
//     size?: "sm" | "md" | "lg"
// }

export default function Loader() {
    return (
        <div className="flex w-full justify-center h-[16px] relative items-center gap-[20px]">
            <div className={classes("w-[10px] h-[10px] rounded-full", styles.loader, styles.first)} />
            <div className={classes("w-[10px] h-[10px] rounded-full", styles.loader, styles.second)} />
            <div className={classes("w-[10px] h-[10px] rounded-full", styles.loader, styles.third)} />
        </div>
    )
}