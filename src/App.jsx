import { useState } from "react";
import { InputBox } from "./components";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
    const [fromCurrency, setFromCurrency] = useState("usd");
    const [amount, setAmount] = useState("");
    const [toCurrency, setToCurrency] = useState("inr");
    const [convertedAmount, setConvertedAmount] = useState("");

    const currencyInfo = useCurrencyInfo(fromCurrency);

    const options = Object.keys(currencyInfo);

    const swap = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
        setAmount(convertedAmount);
        setConvertedAmount(amount);
    };

    const convert = () => {
        // Only convert if amount is not empty and is a valid number
        if (amount === "" || isNaN(Number(amount))) {
            setConvertedAmount("");
            return;
        }
        setConvertedAmount(
            Number((Number(amount) * currencyInfo[toCurrency]).toFixed(2))
        );
    };

    return (
        <div
            className="fixed inset-0 w-full h-full flex justify-center items-center bg-cover bg-no-repeat"
            style={{
                backgroundImage: `url('https://images.pexels.com/photos/24837139/pexels-photo-24837139.jpeg')`,
            }}
        >
            <div className="w-full flex justify-center items-start min-h-screen">
                <div className="w-full max-w-2xl mx-auto border border-gray-60 rounded-lg p-10 backdrop-blur-sm bg-white/30 mt-60">
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                            convert();
                        }}
                    >
                        <div className="w-full mb-1">
                            <InputBox
                                label="From"
                                amount={amount}
                                currencyOptions={options}
                                onAmountChange={val =>
                                    setAmount(val === "" ? "" : val)
                                }
                                onCurrencyChange={setFromCurrency}
                                selectCurrency={fromCurrency}
                                className="w-full"
                            />
                        </div>
                        <div className="relative w-full h-0.5">
                            <button
                                type="button"
                                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-cyan-700 text-white px-4 py-1 hover:cursor-pointer hover:bg-cyan-900 hover:border-cyan-500"
                                onClick={swap}
                            >
                                &#8645;
                            </button>
                        </div>
                        <div className="w-full mt-1 mb-4">
                            <InputBox
                                label="To"
                                amount={convertedAmount}
                                currencyOptions={options}
                                onAmountChange={() => {}}
                                onCurrencyChange={currency =>
                                    setToCurrency(currency)
                                }
                                selectCurrency={toCurrency}
                                amountDisabled={true}
                                className="w-full"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-cyan-700 text-white px-4 py-3 rounded-lg hover:cursor-pointer hover:bg-cyan-900 hover:border-cyan-500 border-2 border-cyan-700"
                        >
                            Convert {fromCurrency.toUpperCase()} to{" "}
                            {toCurrency.toUpperCase()}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default App;
