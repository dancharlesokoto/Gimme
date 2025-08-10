import { View } from "react-native";
import React, { useMemo, useState } from "react";
import Carousel, {
    ICarouselInstance,
    Pagination,
} from "react-native-reanimated-carousel";
import { window } from "@/constants/sizes";
import { useSharedValue } from "react-native-reanimated";
import WalletCard from "./WalletCard";
import { size } from "@/config/size";

type WalletCarouselType = {
    userData: any;
    isLoading: boolean;
    isError: boolean;
};
const WalletCarousel = React.memo(
    ({ userData, isLoading, isError }: WalletCarouselType) => {
        ///.....
        const progress = useSharedValue<number>(0);
        const [currentIndex, setCurrentIndex] = useState(0);

        //...
        const CAROUSEL_DATA = useMemo(() => {
            return isLoading || isError
                ? [{}, {}, {}]
                : [
                      { amount: userData.ngnBalance, currency: "ngn" },
                      { amount: userData.usdcBalance, currency: "usd" },
                      { amount: userData.gmBalance, currency: "gm" },
                  ];
        }, [isLoading, isError, userData]);

        const ref = React.useRef<ICarouselInstance>(null);

        const onPressPagination = (index: number) => {
            ref.current?.scrollTo({
                /**
                 * Calculate the difference between the current index and the target index
                 * to ensure that the carousel scrolls to the nearest index
                 */
                count: index - progress.value,
                animated: true,
            });
        };

        return (
            <View
                id="carousel-component"
                style={{
                    gap: size.getHeightSize(4),
                    // backgroundColor: "red",
                }}
                // dataSet={{ kind: "basic-layouts", name: "parallax" }}
            >
                <Carousel
                    ref={ref}
                    data={CAROUSEL_DATA}
                    height={size.getHeightSize(240)}
                    loop={false}
                    pagingEnabled={true}
                    snapEnabled={true}
                    width={window.width}
                    style={{
                        width: window.width,
                        height: size.getHeightSize(240),
                    }}
                    mode="parallax"
                    modeConfig={{
                        parallaxScrollingScale: 0.98,
                        parallaxScrollingOffset: size.getWidthSize(50),
                    }}
                    onProgressChange={progress}
                    onSnapToItem={(index: number) => {
                        setCurrentIndex(index);
                    }}
                    renderItem={({ item, index }: any) => {
                        return (
                            <>
                                <WalletCard
                                    amount={item.amount}
                                    isShowing={
                                        !isLoading && index === currentIndex
                                    }
                                    currency={item.currency}
                                />
                            </>
                        );
                    }}
                />
                <Pagination.Custom<{ color: string }>
                    progress={progress}
                    data={CAROUSEL_DATA as any}
                    dotStyle={{
                        width: size.getWidthSize(7),
                        height: size.getWidthSize(7),
                        borderRadius: 100,
                        backgroundColor: "#E2E3E9",
                    }}
                    activeDotStyle={{
                        width: size.getWidthSize(25),
                        overflow: "hidden",
                        backgroundColor: "#262626",
                    }}
                    containerStyle={[
                        {
                            gap: 5,
                        },
                    ]}
                    horizontal
                    onPress={onPressPagination}
                />
            </View>
        );
    }
);

export default WalletCarousel;
