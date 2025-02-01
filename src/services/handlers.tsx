import { Dispatch, SetStateAction } from "react";

interface ServiceHandlers {
    setLoading?: Dispatch<SetStateAction<boolean>>,
    setError?: Dispatch<SetStateAction<string>>
}

const handleError = (e: unknown, setError: Dispatch<SetStateAction<string>> | undefined) => {
    if(e instanceof Error) {
        setError?.(e.message);
    } else {
        setError?.("Unknown error has occurred. Try again later");
    }
}

export { handleError };
export type { ServiceHandlers };