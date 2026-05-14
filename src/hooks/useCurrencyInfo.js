import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(
            `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`
        )
            .then(response => response.json())
            .then(json => {
                setData(json[currency] || {});
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [currency]);

    return { data, loading };
}

export default useCurrencyInfo;
