"use client";

import { Job } from "@/models/jobs";
import { useUserDataContext } from "@/repositories/userDataContext";
import { BookmarkSimple } from "@phosphor-icons/react";

export default function Bookmark({ job, className }: { job: Job, className: string }) {
    const { jobReferences, addJobReference, removeJobReference } = useUserDataContext();

    const ref = jobReferences.find(jobReference => jobReference.id === job.id);
    const added = ref != undefined;

    return (
        <div className={className + " cursor-pointer"} onClick={(event) => {
            event.stopPropagation();
            if (added) {
                if (ref.status == "bookmarked") {
                    removeJobReference(job.id);
                }
            }
            else {
                addJobReference({ id: job.id, status: "bookmarked" });
            }
        }}>
            <BookmarkSimple size={24} weight={added ? "fill" : "regular"} />
        </div>
    )
}