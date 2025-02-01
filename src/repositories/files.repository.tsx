import { Dispatch, SetStateAction } from "react";
import { authFetch } from "./loginCache.respository";

const useFileRepo = () => {
    const uploadFileToServerRepo = async (file: File, setError?: Dispatch<SetStateAction<string>>,
    setLoading?: Dispatch<SetStateAction<boolean>>) => {
        try {
            setLoading?.(true);
            const form = new FormData();
            form.append('file', file);
            const response = await authFetch("https://cdn.tennisbowling.com/upload", {
                method: "POST",
                body: form,
            } as RequestInit);
            const data = await response.json();
            if (data['status'] == "success") return data['location'];
            else {
                setError?.('Failed to upload');
                return null;
            }
        } catch(e) {
            if(e instanceof Error) {
                setError?.(e.message);
            } else {
                throw new Error("Were't able to upload file, please try again later");
            }
            return null;
        } finally {
            setLoading?.(false);
        }
    }

    return { uploadFileToServerRepo };
}

export default useFileRepo;