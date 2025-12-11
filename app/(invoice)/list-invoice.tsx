import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import {
    FlatList,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface InvoiceType {
    id: string;
    name: string;
    count: number;
    icon: string;
    route?: string;
}

const ListInvoice = () => {
    const invoiceTypes: InvoiceType[] = [
        { id: "1", name: "Đồ dùng", count: 0, icon: "cube-outline" },
        { id: "2", name: "Hóa mỹ phẩm", count: 0, icon: "color-palette-outline" },
        { id: "3", name: "TPCN", count: 0, icon: "nutrition-outline" },
        { id: "4", name: "Máy mặc", count: 0, icon: "shirt-outline" },
        { id: "5", name: "Hàng giao tháng", count: 0, icon: "calendar-outline" },
        { id: "6", name: "Bảng kê TPTS", count: 0, icon: "list-outline" },
        {
            id: "7",
            name: "Bảng kê hàng đại lý (Consignment)",
            count: 0,
            icon: "people-outline",
        },
        { id: "8", name: "TPTS trả trước", count: 0, icon: "card-outline" },
        { id: "9", name: "TPTS trả sau", count: 0, icon: "time-outline" },
        {
            id: "10",
            name: "Định kèm biên bản",
            count: 0,
            icon: "document-attach-outline",
        },
        { id: "11", name: "Định kèm hóa đơn", count: 0, icon: "receipt-outline" },
    ];

    const renderItem = ({
        item,
        index,
    }: {
        item: InvoiceType;
        index: number;
    }) => (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.7}
            onPress={() => router.push("/(screenshoft)/123")}
        >
            <View style={styles.cardContent}>
                <View style={styles.iconContainer}>
                    <LinearGradient
                        colors={["#4F46E5", "#7C3AED"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.iconGradient}
                    >
                        <Ionicons name={item.icon as any} size={24} color="#FFFFFF" />
                    </LinearGradient>
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.invoiceName}>{item.name}</Text>
                    <Text style={styles.invoiceCount}>Số lượng: {item.count}</Text>
                </View>

                <View style={styles.arrowContainer}>
                    <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* Header */}
            <LinearGradient
                colors={["#4F46E5", "#7C3AED"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.header}
            >
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>CHỌN LOẠI HÓA ĐƠN</Text>

                <View style={styles.headerRight} />
            </LinearGradient>

            {/* Invoice List */}
            <FlatList
                data={invoiceTypes}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 16,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        justifyContent: "center",
        alignItems: "center",
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#FFFFFF",
        letterSpacing: 0.5,
    },
    headerRight: {
        width: 40,
    },
    listContainer: {
        padding: 16,
        paddingBottom: 32,
    },
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        marginBottom: 12,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
    },
    cardContent: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
    },
    iconContainer: {
        marginRight: 16,
    },
    iconGradient: {
        width: 48,
        height: 48,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    textContainer: {
        flex: 1,
    },
    invoiceName: {
        fontSize: 16,
        fontWeight: "600",
        color: "#1F2937",
        marginBottom: 4,
    },
    invoiceCount: {
        fontSize: 14,
        color: "#6B7280",
    },
    arrowContainer: {
        marginLeft: 8,
    },
});

export default ListInvoice;
