import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import {
    BottomSheetBackdrop,
    BottomSheetFlatList,
    BottomSheetModal,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import { size } from "@/config/size";
import { ActivityIndicator } from "react-native-paper";
import banks from "@/lib/banks.json";
import Svg, { Path } from "react-native-svg";
import { Image } from "expo-image";
const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
type ListBanksBottomSheetProps = {
    isOpen: boolean;
    onDismiss?: () => void;
    onPress?: (bank: any) => void;
};

const SearchBar = React.memo(({ onChangeValue }: any) => {
    const [query, setQuery] = useState("");

    const handleChangeValue = useCallback((value: string) => {
        setQuery(value);
        onChangeValue && onChangeValue(value);
    }, []);

    return (
        <View style={styles.inputContainer}>
            <Svg
                // xmlns="http://www.w3.org/2000/svg"
                style={{
                    width: size.getWidthSize(20),
                    height: size.getHeightSize(20),
                }}
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#8A8A8F"
                // class="size-6"
            >
                <Path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
            </Svg>

            <TextInput
                style={styles.input}
                onChangeText={handleChangeValue}
                value={query}
                placeholder="Search bank"
            />
        </View>
    );
});

const ListBanksBottomSheet = React.memo(
    ({ isOpen, onDismiss, onPress }: ListBanksBottomSheetProps) => {
        ///.......................
        const snapPoints = useMemo(() => ["60%"], []);
        const bottomSheetModalRef = useRef<BottomSheetModal>(null);
        const [query, setQuery] = useState("");
        const [displayData, setDisplayData] = useState<any[]>(banks);
        const [isReady, setIsReady] = useState(false);

        useEffect(() => {
            const timeout = setTimeout(() => setIsReady(true), 100);
            return () => clearTimeout(timeout);
        }, []);
        ///.......................
        const openModal = () => {
            bottomSheetModalRef.current?.present();
        };
        useEffect(() => {
            if (isOpen) {
                openModal();
            } else {
                bottomSheetModalRef.current?.close();
            }
        }, [isOpen]);
        ///.......................

        const renderBackdrop = useCallback(
            (props: any) => (
                <BottomSheetBackdrop
                    {...props}
                    disappearsOnIndex={-1} // Backdrop disappears when sheet is fully closed
                    appearsOnIndex={0} // Backdrop appears when sheet is opened
                    opacity={0.5} // Adjust transparency here
                />
            ),
            []
        );

        // const { data, isLoading, isError } = useQuery({
        //     queryKey: ["getBanks"],
        //     queryFn: () => getBanks(),
        // });

        const setData = useCallback(
            (query: string) =>
                setDisplayData(
                    banks.filter((item: any) =>
                        item?.name?.toLowerCase().includes(query.toLowerCase())
                    )
                ),
            []
        );

        useEffect(() => {
            setData(query);
        }, [query]);
        return (
            <BottomSheetModal
                enableHandlePanningGesture={false}
                enableContentPanningGesture={false}
                enableDynamicSizing={false}
                // enablePanDownToClose
                ref={bottomSheetModalRef}
                snapPoints={snapPoints}
                onDismiss={() => onDismiss && onDismiss()}
                backdropComponent={renderBackdrop}
                backgroundStyle={{
                    borderTopLeftRadius: size.getWidthSize(20),
                    borderTopRightRadius: size.getWidthSize(20),
                }}
            >
                {!banks ? (
                    <BottomSheetView
                        style={{
                            height: "100%",
                            display: "flex",
                            gap: size.getHeightSize(8),
                            flexDirection: "column",
                            paddingHorizontal: size.getWidthSize(20),
                            paddingVertical: size.getHeightSize(8),
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <ActivityIndicator
                            color="#374BFB"
                            size={size.getHeightSize(40)}
                        />
                        <Text
                            style={{
                                fontSize: size.fontSize(16),
                                fontFamily: "Satoshi-Bold",
                                textAlign: "center",
                            }}
                        >
                            Fetching banks.
                        </Text>
                    </BottomSheetView>
                ) : (
                    <BottomSheetView
                        style={{
                            flex: 1,
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            paddingHorizontal: size.getWidthSize(24),
                            paddingVertical: size.getHeightSize(12),
                            gap: size.getHeightSize(24),
                        }}
                    >
                        <SearchBar value={query} onChangeValue={setQuery} />
                        {isReady && (
                            <BottomSheetFlatList
                                nestedScrollEnabled={true}
                                data={displayData}
                                keyExtractor={(item, i) => i.toString()}
                                scrollEnabled={true}
                                showsVerticalScrollIndicator={false}
                                style={{
                                    flex: 1,
                                }}
                                contentContainerStyle={{
                                    gap: size.getWidthSize(12),
                                }}
                                renderItem={({ item }: { item: any }) => (
                                    <TouchableOpacity
                                        hitSlop={size.getWidthSize(20)}
                                        onPress={() =>
                                            onPress &&
                                            onPress({
                                                name: item.name,
                                                code: item.code,
                                            })
                                        }
                                        style={{
                                            height: size.getHeightSize(40),
                                            flexDirection: "row",
                                            alignItems: "center",
                                            gap: size.getWidthSize(16),
                                        }}
                                    >
                                        <Image
                                            source={item.logo}
                                            placeholder={{ blurhash }}
                                            contentFit="cover"
                                            style={{
                                                width: size.getWidthSize(20),
                                                height: size.getHeightSize(20),
                                                borderRadius:
                                                    size.getWidthSize(5),
                                            }}
                                        />

                                        <Text
                                            style={{
                                                fontFamily: "Satoshi-Bold",
                                                color: "#525252",
                                            }}
                                        >
                                            {item.name}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            />
                        )}
                    </BottomSheetView>
                )}
            </BottomSheetModal>
        );
    }
);

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: size.getWidthSize(8),
        height: size.getHeightSize(48),
        borderColor: "#E2E3E9",
        borderWidth: 1,
        borderRadius: size.getWidthSize(12),
        paddingHorizontal: size.getWidthSize(12),

        marginBottom: size.getHeightSize(6),
    },

    input: {
        flex: 1,
        height: "100%",
        fontFamily: "Satoshi-Regular",
        fontSize: size.fontSize(14),
    },
});

export default ListBanksBottomSheet;
