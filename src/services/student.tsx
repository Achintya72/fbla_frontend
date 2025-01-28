"use client";

const useFetchStudentData = async (setter: Dispatch<SetStateAction<StudentData>>) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    try {
        setLoading(true);
        await delay(1000);
        setter()
    }
}