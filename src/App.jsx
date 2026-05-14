import React, { useState } from "react";
import { InputBox } from "./components";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

const QUICK_PAIRS = [
    { from: "usd", to: "inr" },
    { from: "inr", to: "usd" },
    { from: "usd", to: "eur" },
    { from: "usd", to: "gbp" },
    { from: "btc", to: "usd" },
];

function App() {
    const [fromCurrency, setFromCurrency] = useState("inr");
    const [amount, setAmount] = useState("");
    const [toCurrency, setToCurrency] = useState("usd");
    const [convertedAmount, setConvertedAmount] = useState("");
    const [isSwapping, setIsSwapping] = useState(false);

    const { data: currencyInfo, loading } = useCurrencyInfo(fromCurrency);
    const options = Object.keys(currencyInfo);

    React.useEffect(() => {
        if (amount === "" || isNaN(Number(amount))) {
            setConvertedAmount("");
            return;
        }
        if (currencyInfo && currencyInfo[toCurrency]) {
            setConvertedAmount(
                Number((Number(amount) * currencyInfo[toCurrency]).toFixed(2))
            );
        }
    }, [amount, fromCurrency, toCurrency, currencyInfo]);

    const swap = () => {
        setIsSwapping(true);
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
        setAmount(convertedAmount === "" ? "" : String(convertedAmount));
        setConvertedAmount(amount === "" ? "" : String(amount));
        setTimeout(() => setIsSwapping(false), 500);
    };

    const exchangeRate =
        currencyInfo && currencyInfo[toCurrency]
            ? currencyInfo[toCurrency]
            : null;

    const year = new Date().getFullYear();

    return (
        <div
            className="min-h-screen w-full flex flex-col items-center overflow-auto relative"
            style={{
                background:
                    "linear-gradient(135deg, #020c1b 0%, #071e3d 40%, #041728 70%, #020c1b 100%)",
            }}
        >
            {/* Floating background orbs */}
            <div
                className="fixed inset-0 overflow-hidden pointer-events-none"
                aria-hidden="true"
            >
                <div
                    className="orb-1 absolute rounded-full"
                    style={{
                        top: "12%",
                        left: "8%",
                        width: "480px",
                        height: "480px",
                        background: "rgba(14, 165, 233, 0.14)",
                        filter: "blur(80px)",
                    }}
                />
                <div
                    className="orb-2 absolute rounded-full"
                    style={{
                        bottom: "10%",
                        right: "6%",
                        width: "400px",
                        height: "400px",
                        background: "rgba(6, 182, 212, 0.12)",
                        filter: "blur(70px)",
                    }}
                />
                <div
                    className="orb-3 absolute rounded-full"
                    style={{
                        top: "58%",
                        left: "42%",
                        width: "320px",
                        height: "320px",
                        background: "rgba(59, 130, 246, 0.1)",
                        filter: "blur(60px)",
                    }}
                />
            </div>

            <div className="relative z-10 w-full flex flex-col justify-center items-center min-h-screen py-12 px-4">
                <div className="w-full max-w-md animate-card-fade-in">
                    {/* Header */}
                    <div className="flex flex-col items-center mb-8">
                        <h1 className="text-4xl font-extrabold heading-gradient tracking-tight text-center leading-tight">
                            Currency Converter
                        </h1>
                        <p className="text-slate-500 text-sm mt-2 text-center">
                            Real-time rates · 150+ currencies including Bitcoin
                        </p>
                    </div>

                    {/* Main card */}
                    <div
                        className="rounded-3xl p-6 shadow-2xl"
                        style={{
                            background: "rgba(5, 20, 50, 0.78)",
                            border: "1px solid rgba(56, 189, 248, 0.15)",
                            backdropFilter: "blur(24px)",
                            boxShadow:
                                "0 32px 64px rgba(0,0,0,0.6), inset 0 1px 0 rgba(56,189,248,0.06)",
                        }}
                    >
                        <form onSubmit={e => e.preventDefault()}>
                            {/* Unified input card */}
                            <div
                                className="relative rounded-2xl"
                                style={{
                                    background: "rgba(255,255,255,0.07)",
                                    border: "1px solid rgba(255,255,255,0.12)",
                                    overflow: "visible",
                                }}
                            >
                                <InputBox
                                    label="From"
                                    amount={amount}
                                    currencyOptions={options}
                                    onAmountChange={val => setAmount(val)}
                                    onCurrencyChange={currency =>
                                        setFromCurrency(currency.toLowerCase())
                                    }
                                    selectCurrency={fromCurrency}
                                    currencyUppercase={true}
                                    style={{
                                        background: "transparent",
                                        border: "none",
                                        borderRadius: "1rem 1rem 0 0",
                                        borderBottom:
                                            "1px solid rgba(255,255,255,0.1)",
                                    }}
                                />

                                {/* Swap button — absolutely centered on the divider */}
                                <button
                                    type="button"
                                    className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-90 ${isSwapping ? "animate-swap-rotate" : ""}`}
                                    style={{
                                        background:
                                            "linear-gradient(145deg, #0ea5e9 0%, #06b6d4 100%)",
                                        border: "3.5px solid rgba(5, 20, 50, 0.95)",
                                        boxShadow:
                                            "0 0 0 1.5px rgba(34,211,238,0.45), 0 8px 32px rgba(14,165,233,0.55), inset 0 1px 0 rgba(255,255,255,0.2)",
                                    }}
                                    onClick={swap}
                                    aria-label="Swap currencies"
                                >
                                    <svg
                                        className="w-5 h-5 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2.5}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4"
                                        />
                                    </svg>
                                </button>

                                <InputBox
                                    label="To"
                                    amount={convertedAmount}
                                    currencyOptions={options}
                                    onAmountChange={() => {}}
                                    onCurrencyChange={currency =>
                                        setToCurrency(currency.toLowerCase())
                                    }
                                    selectCurrency={toCurrency}
                                    amountDisabled={true}
                                    currencyUppercase={true}
                                    style={{
                                        background: "transparent",
                                        border: "none",
                                        borderRadius: "0 0 1rem 1rem",
                                    }}
                                />
                            </div>

                            {/* Exchange rate / loading */}
                            <div className="mt-4 min-h-[46px] flex items-center">
                                {loading ? (
                                    <div className="w-full h-11 shimmer" />
                                ) : exchangeRate ? (
                                    <div
                                        className="w-full px-4 py-3 rounded-xl flex items-center justify-center gap-2"
                                        style={{
                                            background:
                                                "rgba(255, 255, 255, 0.05)",
                                            border: "1px solid rgba(255,255,255,0.1)",
                                        }}
                                    >
                                        <span className="rate-pulse text-cyan-400 text-sm">
                                            ◆
                                        </span>
                                        <span className="text-slate-400 text-sm">
                                            1{" "}
                                            <span className="text-white font-semibold">
                                                {fromCurrency.toUpperCase()}
                                            </span>{" "}
                                            ={" "}
                                            <span className="text-cyan-300 font-bold">
                                                {exchangeRate >= 0.0001
                                                    ? exchangeRate.toFixed(4)
                                                    : exchangeRate.toExponential(
                                                          4
                                                      )}
                                            </span>{" "}
                                            <span className="text-white font-semibold">
                                                {toCurrency.toUpperCase()}
                                            </span>
                                        </span>
                                    </div>
                                ) : null}
                            </div>
                        </form>
                    </div>

                    {/* Quick pairs */}
                    <div className="mt-5">
                        <p className="text-slate-600 text-xs uppercase tracking-widest text-center mb-3 font-semibold">
                            Quick Pairs
                        </p>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {QUICK_PAIRS.map(pair => {
                                const isActive =
                                    fromCurrency === pair.from &&
                                    toCurrency === pair.to;
                                return (
                                    <button
                                        key={`${pair.from}-${pair.to}`}
                                        onClick={() => {
                                            setFromCurrency(pair.from);
                                            setToCurrency(pair.to);
                                        }}
                                        className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 hover:scale-105 active:scale-95"
                                        style={{
                                            background: isActive
                                                ? "rgba(14,165,233,0.2)"
                                                : "rgba(255,255,255,0.05)",
                                            border: isActive
                                                ? "1px solid rgba(56,189,248,0.5)"
                                                : "1px solid rgba(255,255,255,0.1)",
                                            color: isActive
                                                ? "#bae6fd"
                                                : "#94a3b8",
                                        }}
                                    >
                                        {pair.from.toUpperCase()} →{" "}
                                        {pair.to.toUpperCase()}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <span className="text-slate-600 text-xs">
                            &copy; {year} ·{" "}
                            <a
                                href="https://princebansal.in"
                                className="footer-link"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                princebansal.in
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
