import { size } from "@/config/size";
import { useState } from "react";
import { Platform, StyleSheet, Text, TextInput } from "react-native";
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from "react-native-confirmation-code-field";

interface PinInput {
    code: string;
    onChange: (value: string) => void;
}

export default function PinInput({ code, onChange }: PinInput) {
    const CELL_COUNT = 4;
    const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value: code,
        setValue: () => {},
    });

    return (
        <CodeField
            ref={ref}
            {...props}
            value={code}
            onChangeText={(value) => onChange(value)}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            InputComponent={TextInput}
            testID="my-code-input"
            renderCell={({ index, symbol, isFocused }) => (
                <Text
                    key={index}
                    style={[
                        styles.cell,
                        isFocused && styles.focusCell,
                        {
                            borderTopLeftRadius: index === 0 ? 12 : 0,
                            borderBottomLeftRadius: index === 0 ? 12 : 0,
                            borderTopRightRadius:
                                index === CELL_COUNT - 1 ? 12 : 0,
                            borderBottomRightRadius:
                                index === CELL_COUNT - 1 ? 12 : 0,
                        },
                    ]}
                    onLayout={getCellOnLayoutHandler(index)}
                >
                    {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
            )}
        />
    );
}

const styles = StyleSheet.create({
    codeFieldRoot: {
        width: "100%",
        height: size.getHeightSize(64),
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: size.getWidthSize(8),
    },
    cell: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Satoshi-Bold",
        lineHeight: size.getHeightSize(64),
        fontSize: size.fontSize(24),
        borderWidth: size.getWidthSize(1),
        borderColor: "#E2E3E9",
        textAlign: "center",
    },
    focusCell: {
        borderColor: "#0A0B14",
    },
});
