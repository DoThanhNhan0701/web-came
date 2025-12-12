import ListImage from "@/components/common/ListImage";
import SearchSelect, { Option } from "@/components/common/SearchSelect";
import { endpoints } from "@/services/endpoints";
import { useGet } from "@/services/requestData";
import { ICategories } from "@/types/ICategories";
import { IInvoiceImage } from "@/types/IInvoice";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Statistics() {
  const [selected, setSelected] = useState<Option | null>(null);

  const categoriesData = useGet<ICategories[]>(
    { url: `${endpoints.CATEGORIES}/` },
    { deps: [] }
  );

  const listImagesData = useGet<IInvoiceImage[]>(
    {
      url: `${endpoints.INVOICES}/images`,
      config: { params: { category_id: selected?.id } },
    },
    { deps: [selected], disabled: !selected }
  );

  const options = useMemo<Option[]>(() => {
    if (!categoriesData?.response) return [];

    return categoriesData.response.map((item) => ({
      id: String(item.id),
      label: item.name,
      value: item,
    }));
  }, [categoriesData?.response]);

  return (
    <View className="flex-1">
      <View className="items-center flex-row justify-between p-3 bg-primary px-4 pt-12 pb-4">
        <TouchableOpacity
          className="bg-white size-10 rounded-full justify-center items-center"
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} className="text-primary" />
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold uppercase">
          Statistics
        </Text>
        <View className="w-10" />
      </View>

      <View className="p-5 flex-1">
        <SearchSelect data={options} value={selected} onChange={setSelected} />
        <ListImage
          images={listImagesData?.response ?? []}
          loading={listImagesData.pending && !!selected}
        />
      </View>
    </View>
  );
}
