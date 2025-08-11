import { useState } from "react";
import { InputBox } from "./components";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
    const [fromCurrency, setFromCurrency] = useState("usd");
    const [amount, setAmount] = useState(null);
    const [toCurrency, setToCurrency] = useState("inr");
    const [convertedAmount, setConvertedAmount] = useState(null);

    const currencyInfo = useCurrencyInfo(fromCurrency);

    const options = Object.keys(currencyInfo);

    const swap = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
        setAmount(convertedAmount);
        setConvertedAmount(amount);
    };

    const convert = () => {
        if (!currencyInfo || !currencyInfo[toCurrency]) {
            setConvertedAmount(null);
            return;
        }
        setConvertedAmount(
            Number((amount * currencyInfo[toCurrency]).toFixed(2))
        );
    };

    return (
        <div
            className="fixed inset-0 w-full h-full flex justify-center items-center bg-cover bg-no-repeat"
            style={{
                backgroundImage: `url('https://images.pexels.com/photos/259209/pexels-photo-259209.jpeg')`,
            }}
        >
            <div className="w-full flex justify-center items-start min-h-screen">
                <div className="w-full max-w-2xl mx-auto border border-gray-60 rounded-lg p-10 backdrop-blur-sm bg-white/30 mt-25">
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
                                onAmountChange={setAmount}
                                onCurrencyChange={setFromCurrency}
                                selectCurrency={fromCurrency}
                                className="w-full"
                            />
                        </div>
                        <div className="relative w-full h-0.5">
                            <button
                                type="button"
                                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-gray-700 text-white px-4 py-1"
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
                                onCurrencyChange={setToCurrency}
                                selectCurrency={toCurrency}
                                amountDisabled={true}
                                className="w-full"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
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
