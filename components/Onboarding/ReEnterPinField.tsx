import { size } from "@/config/size";
import React, { useCallback } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import {
    CodeField,
    RenderCellOptions,
    useClearByFocusCell,
} from "react-native-confirmation-code-field";

interface PinInput {
    code: string;
    onChange?: (value: string) => void;
    editable?: boolean;
}
const CELL_COUNT = 4;

const ReEnterPinField: React.FC<PinInput> = React.memo(
    ({ code, onChange, editable = true }) => {
        // const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
        const [props, getCellOnLayoutHandler] = useClearByFocusCell({
            value: code,
            setValue: () => {},
        });

        const handleRenderCell = useCallback(
            (options: RenderCellOptions) => {
                return (
                    <CellItem key={options.index} {...options} code={code} />
                );
            },
            [code]
        );

        return (
            <View>
                <CodeField
                    {...props}
                    editable={editable}
                    value={code}
                    onChangeText={(value) => onChange && onChange(value)}
                    cellCount={CELL_COUNT}
                    rootStyle={styles.codeFieldRoot}
                    keyboardType="number-pad"
                    InputComponent={TextInput}
                    testID="my-code-input"
                    renderCell={handleRenderCell}
                />
            </View>
        );
    }
);

const CellItem = React.memo(
    ({ index, symbol, isFocused, code }: RenderCellOptions | any) => (
        <Text
            key={index}
            style={[
                styles.cell,
                (isFocused || code.length > index) && styles.focusCell,
                {
                    borderTopLeftRadius: index === 0 ? 12 : 0,
                    borderBottomLeftRadius: index === 0 ? 12 : 0,
                    borderTopRightRadius: index === CELL_COUNT - 1 ? 12 : 0,
                    borderBottomRightRadius: index === CELL_COUNT - 1 ? 12 : 0,
                },
            ]}
            // onLayout={getCellOnLayoutHandler(index)}
        >
            {symbol && "·"}
        </Text>
    )
);

const styles = StyleSheet.create({
    codeFieldRoot: {
        width: size.getWidthSize(240),
        height: size.getHeightSize(50),
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
        height: size.getHeightSize(50),
        lineHeight: size.getHeightSize(50),
        fontSize: size.fontSize(18),
        borderWidth: size.getWidthSize(1),
        // borderRadius: size.getWidthSize(8),
        borderColor: "rgb(180, 180, 190)",
        textAlign: "center",
    },
    focusCell: {
        borderColor: "#3366FF",
        backgroundColor: "rgba(51, 102, 255, 0.1)",
    },
});

export default ReEnterPinField;
