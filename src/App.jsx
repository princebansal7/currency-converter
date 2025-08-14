import React, { useState } from "react";
import { InputBox } from "./components";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
    const [fromCurrency, setFromCurrency] = useState("inr");
    const [amount, setAmount] = useState("");
    const [toCurrency, setToCurrency] = useState("usd");
    const [convertedAmount, setConvertedAmount] = useState("");

    const currencyInfo = useCurrencyInfo(fromCurrency);
    const options = Object.keys(currencyInfo);

    // Convert whenever amount, fromCurrency, toCurrency, or currencyInfo changes
    // Only if amount is not empty and is a valid number
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
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
        setAmount(convertedAmount === "" ? "" : String(convertedAmount));
        setConvertedAmount(amount === "" ? "" : String(amount));
    };

    // Get current year for footer
    const year = new Date().getFullYear();

    return (
        <div className="min-h-screen w-full flex flex-col items-center bg-gradient-to-br from-black via-green-900 to-black animate-bgMove overflow-auto">
            <div className="w-full flex flex-col justify-center items-center min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto animate-card-fade-in border-none shadow-2xl rounded-3xl p-0 mt-10 bg-gradient-to-br from-black via-green-950 to-black/90 backdrop-blur-lg relative">
                    <div className="px-4 sm:px-8 pt-10 pb-2 flex flex-col items-center">
                        <h1
                            className="text-3xl sm:text-4xl md:text-5xl font-extrabold heading-gradient-green drop-shadow-lg tracking-tight mb-2 animate__animated animate__fadeInDown text-center w-full"
                            style={{ letterSpacing: "0.03em" }}
                        >
                            Currency Converter
                        </h1>
                        <p className="text-base md:text-lg text-green-200 font-medium mb-6 animate__animated animate__fadeInUp text-center">
                            Instantly convert between 150+ currencies including
                            Bitcoin with real-time rates. Fast, beautiful, and
                            reliable.
                        </p>
                    </div>
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                        }}
                        className="px-4 sm:px-8 pb-6"
                    >
                        <div className="relative w-full flex flex-col items-center">
                            <InputBox
                                label="From"
                                amount={amount}
                                currencyOptions={options}
                                onAmountChange={val => setAmount(val)}
                                onCurrencyChange={currency =>
                                    setFromCurrency(currency.toLowerCase())
                                }
                                selectCurrency={fromCurrency}
                                className="w-full"
                                currencyUppercase={true}
                            />
                            <div className="flex w-full justify-center -my-7 relative z-10">
                                <button
                                    type="button"
                                    className="pop-btn border-2 border-green-300 rounded-full bg-green-950 text-green-200 flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-200 animate-swap-bounce"
                                    style={{
                                        width: "64px",
                                        height: "64px",
                                        minWidth: "64px",
                                        minHeight: "64px",
                                        fontSize: "2rem",
                                    }}
                                    onClick={swap}
                                    aria-label="Swap currencies"
                                >
                                    <span className="text-3xl">&#8645;</span>
                                </button>
                            </div>
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
                                className="w-full"
                                currencyUppercase={true}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-green-500 to-black text-white px-4 py-3 rounded-xl font-semibold text-lg shadow-md hover:from-black hover:to-green-500 transition-all duration-200 mt-8 border-2 border-green-600"
                        >
                            Convert {fromCurrency.toUpperCase()} to{" "}
                            {toCurrency.toUpperCase()}
                        </button>
                    </form>
                    <footer className="footer-card animate-card-fade-in bg-gradient-to-br from-black via-green-950 to-black/90 text-green-300 px-4 sm:px-8 pb-6 pt-2 border-t border-green-900 mt-2 text-center flex flex-col items-center">
                        <span className="w-full text-green-300">
                            &copy; {year} ·{"  "}
                            <a
                                href="https://princebansal.in"
                                className="footer-link text-green-300"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                princebansal.in
                            </a>
                        </span>
                    </footer>
                </div>
            </div>
        </div>
    );
}

export default App;
