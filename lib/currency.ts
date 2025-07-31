type FormatterProps = {
    value: string | number;
    currency: "usd" | "ngn" | "gm";
    locale?: string;
    options?: Intl.NumberFormatOptions;
};

type ConverterProps = {
    value: string | number;
    from: "usd" | "ngn" | "gm";
    to: "usd" | "ngn" | "gm";
    format?: boolean;
    options?: Intl.NumberFormatOptions;
};

const GM_CONVERSION = 1 / 0.015;
const NGN_CONVERSION = 1600;

export const formatCurrency = ({
    value,
    currency,
    locale,
    options,
}: FormatterProps) => {
    let _value = value;
    if (value == 0) {
        return "0.00";
    }

    switch (currency.toLowerCase()) {
        case "usd":
            _value = +value * 0.01;
            break;
        case "ngn":
            _value = +value * 0.01;
            break;
        case "gm":
            _value = +value;
            break;
        default:
            break;
    }
    const formatter = new Intl.NumberFormat(
        locale ? locale : "en-US",
        options
            ? options
            : {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: +_value < 10 ? 2 : 0,
              }
    );
    return formatter.format(Number(_value));
};

export const convertCurrency = ({
    value,
    from,
    to,
    format = true,
    options = {
        maximumFractionDigits: 2,
    },
}: ConverterProps) => {
    let _value = value;
    switch (from.toLowerCase()) {
        case "usd":
            if (to === "ngn") {
                _value = +value * 0.01 * NGN_CONVERSION;
            } else if (to === "gm") {
                _value = +value * 0.01 * GM_CONVERSION;
            }
            break;
        case "ngn":
            if (to === "usd") {
                _value = (+value * 0.01) / NGN_CONVERSION;
            } else if (to === "gm") {
                _value = ((+value * 0.01) / NGN_CONVERSION) * GM_CONVERSION;
            }
            break;
        case "gm":
            if (to === "usd") {
                _value = +value / GM_CONVERSION;
            } else if (to === "ngn") {
                _value = (+value / GM_CONVERSION) * NGN_CONVERSION;
            }
            break;
        default:
            break;
    }
    const formatter = new Intl.NumberFormat("en-US", options);
    return formatter.format(Number(_value));
};
