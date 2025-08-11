import { useEffect, useState } from "react";

// custom hook
function useCurrencyInfo(currency) {
    const [data, setData] = useState({});
    useEffect(() => {
        fetch(
            `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`
        )
            .then(response => response.json())
            .then(data => setData(data[currency]));
    }, [currency]);

    console.log(data);

    return data;
}

export default useCurrencyInfo;
