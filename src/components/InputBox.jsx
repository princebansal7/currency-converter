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
    style = {},
}) {
    const amountInputId = useId();

    return (
        <div
            className={`p-4 ${className}`}
            style={{
                background: "rgba(255, 255, 255, 0.07)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: "1rem",
                ...style,
            }}
        >
            <p className="text-slate-500 text-xs uppercase tracking-widest font-semibold mb-3">
                {label}
            </p>
            <div className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                    <input
                        id={amountInputId}
                        className="w-full bg-transparent text-white text-2xl font-bold outline-none placeholder:text-slate-700 disabled:text-slate-300 truncate"
                        type="text"
                        inputMode="decimal"
                        placeholder="0.00"
                        disabled={amountDisabled}
                        value={amount}
                        onChange={e =>
                            onAmountChange && onAmountChange(e.target.value)
                        }
                    />
                </div>
                <div className="shrink-0">
                    <select
                        className="currency-select rounded-xl px-3 py-2 text-white text-sm font-semibold outline-none cursor-pointer transition-colors duration-150 max-w-[145px] truncate"
                        style={{
                            background: "rgba(255, 255, 255, 0.08)",
                            border: "1px solid rgba(255, 255, 255, 0.15)",
                            colorScheme: "dark",
                        }}
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
                            const optionLabel = fullName
                                ? `${code} - ${fullName}`
                                : code;
                            return (
                                <option
                                    key={currentCurrency}
                                    value={currentCurrency}
                                    title={optionLabel}
                                >
                                    {optionLabel}
                                </option>
                            );
                        })}
                    </select>
                </div>
            </div>
        </div>
    );
}

export default InputBox;
