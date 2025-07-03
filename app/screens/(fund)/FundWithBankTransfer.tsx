import CreateBankAccountCTA from "@/components/Fund/CreateBankAccountCTA";
import GenericHeader from "@/components/GenericHeader";
import PageLoader from "@/components/PageLoader";
import { size } from "@/config/size";
import { getBankAccount, getBankAccountStatus } from "@/services/user";
import CustomSafeArea from "@/shared/CustomSafeArea";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { toast } from "sonner-native";

export default function FundWithBankTransfer() {
    //Fetch logic..........................\
    const {
        data: accountStatus,
        error: accountStatusError,
        isLoading: isAccountStatusLoading,
        isRefetching,
    } = useQuery({
        queryKey: ["getBankAccountStatus"],
        queryFn: getBankAccountStatus,
    });

    useEffect(() => {
        accountStatusError && toast.error(accountStatusError.message);
    }, [accountStatusError]);
    return (
        <CustomSafeArea topColor="#ffffff" bgColor="#ffffff">
            <View style={styles.container}>
                <GenericHeader title={"Fund with Transfer"} showCountry />
                {isAccountStatusLoading || isRefetching ? (
                    <PageLoader />
                ) : (
                    <View style={{ flex: 1 }}>
                        {accountStatus?.isCreated === true && (
                            <Text>Pending</Text>
                        )}
                        {accountStatus?.isCreated === false && (
                            <CreateBankAccountCTA />
                        )}
                    </View>
                )}
            </View>
        </CustomSafeArea>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: size.getWidthSize(24),
    },
});
