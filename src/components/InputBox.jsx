import { useId } from "react";
import currencyNames from "../currencyNames";

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
    // Determine placeholder for input based on label
    let inputPlaceholder = "Amount";
    if (label && label.toLowerCase() === "from")
        inputPlaceholder = "Enter amount";
    if (label && label.toLowerCase() === "to")
        inputPlaceholder = "Converted amount";

    return (
        <div
            className={`bg-white p-3 rounded-lg text-base flex w-2xl ${className}`}
        >
            <div className="w-1/2">
                <label
                    htmlFor={amountInputId}
                    className="text-green-800 font-bold mb-2 inline-block tracking-wide text-sm"
                >
                    {label}
                </label>
                <input
                    id={amountInputId}
                    className="outline-none w-full bg-transparent py-1.5 text-green-800 font-bold text-sm placeholder:italic placeholder:text-gray-400 placeholder:font-semibold placeholder:text-base"
                    type="text"
                    inputMode="decimal"
                    pattern="[0-9]*"
                    placeholder={inputPlaceholder}
                    disabled={amountDisabled}
                    value={amount}
                    onChange={e =>
                        onAmountChange && onAmountChange(e.target.value)
                    }
                />
            </div>
            <div className="w-1/2 flex flex-wrap justify-end text-right">
                <p className="text-green-800 font-bold mb-2 w-full tracking-wide text-sm">
                    Currency Type
                </p>
                <select
                    className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none text-green-800 font-bold text-sm max-w-[110px] w-full truncate overflow-hidden"
                    value={selectCurrency}
                    onChange={e =>
                        onCurrencyChange && onCurrencyChange(e.target.value)
                    }
                    disabled={currencyDisabled}
                >
                    {currencyOptions.map(currentCurrency => {
                        const code = currencyUppercase
                            ? currentCurrency.toUpperCase()
                            : currentCurrency;
                        const fullName =
                            currencyNames[code.toUpperCase()] || "";
                        const label = fullName ? `${code} - ${fullName}` : code;
                        return (
                            <option
                                key={currentCurrency}
                                value={currentCurrency}
                                className="text-green-800 font-bold truncate"
                                title={label}
                            >
                                {label}
                            </option>
                        );
                    })}
                </select>
            </div>
        </div>
    );
}

export default InputBox;
