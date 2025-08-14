import { useId } from "react";

function InputBox({
    label,
    amount,
    currencyOptions = [],
    onAmountChange,
    amountDisabled = false,
    onCurrencyChange,
    selectCurrency = "usd",
    currencyDisabled = false,
    className = "",
    currencyUppercase = false,
}) {
    const amountInputId = useId();
    return (
        <div
            className={`bg-white p-3 rounded-lg text-sm flex w-2xl  ${className}`}
        >
            <div className="w-1/2">
                <label
                    htmlFor={amountInputId}
                    className="text-black/40 mb-2 inline-block"
                >
                    {label}
                </label>
                <input
                    id={amountInputId}
                    className="outline-none w-full bg-transparent py-1.5"
                    type="text"
                    inputMode="decimal"
                    pattern="[0-9]*"
                    placeholder="Amount"
                    disabled={amountDisabled}
                    value={amount}
                    onChange={e =>
                        onAmountChange && onAmountChange(e.target.value)
                    }
                />
            </div>
            <div className="w-1/2 flex flex-wrap justify-end text-right">
                <p className="text-black/40 mb-2 w-full">Currency Type</p>
                <select
                    className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
                    value={selectCurrency}
                    onChange={e =>
                        onCurrencyChange && onCurrencyChange(e.target.value)
                    }
                    disabled={currencyDisabled}
                >
                    {currencyOptions.map(currentCurrency => (
                        <option key={currentCurrency} value={currentCurrency}>
                            {currencyUppercase
                                ? currentCurrency.toUpperCase()
                                : currentCurrency}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default InputBox;
