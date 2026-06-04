import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);
        setError(null);
        fetch(
            `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`,
            { signal: controller.signal }
        )
            .then(response => {
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                return response.json();
            })
            .then(json => {
                const rates = { ...(json[currency] || {}) };
                delete rates[currency]; // remove self-reference key to prevent stale swap miscalculation
                setData(rates);
                setLoading(false);
            })
            .catch(err => {
                if (err.name === "AbortError") return;
                setError(err.message);
                setData({});
                setLoading(false);
            });
        return () => controller.abort();
    }, [currency]);

    return { data, loading, error };
}

export default useCurrencyInfo;
