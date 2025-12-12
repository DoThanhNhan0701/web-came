import { ArrowBigDown, Delete } from "lucide-react-native";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  GestureResponderEvent,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { twMerge } from "tailwind-merge";
import ConditionalRender from "../ConditionalRender";

export type Option = {
  id: string;
  label: string;
  value?: any;
};

type Props = {
  data: Option[];
  value?: Option | null;
  onChange?: (option: Option | null) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
  maxListHeight?: number;
};

export default function SearchSelect({
  data,
  value = null,
  onChange,
  placeholder = "Choose",
  searchPlaceholder = "Search...",
  disabled = false,
  maxListHeight = 320,
}: Readonly<Props>) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query) return data;
    const q = query.toLowerCase();
    return data.filter(
      (d) =>
        d.label.toLowerCase().includes(q) ||
        String(d.value ?? "")
          .toLowerCase()
          .includes(q)
    );
  }, [data, query]);

  function handleSelect(option: Option) {
    onChange?.(option);
    setOpen(false);
    setQuery("");
  }

  function handleClear(e?: GestureResponderEvent) {
    e?.stopPropagation();
    onChange?.(null);
    setQuery("");
  }

  return (
    <View>
      <Pressable
        onPress={() => !disabled && setOpen(true)}
        className={twMerge(
          "flex-row items-center justify-between rounded-xl border px-4 py-3 bg-white/90 border-primary",
          disabled ? "opacity-60" : ""
        )}
      >
        <Text className="text-base text-gray-900">
          {value ? value.label : placeholder}
        </Text>

        <View className="flex-row items-center">
          <ConditionalRender
            condition={!!value}
            childrenIfFalse={
              <ArrowBigDown size={24} color="rgba(124, 58, 237, 0.7)" />
            }
          >
            <TouchableOpacity
              onPress={handleClear}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Delete size={24} color="rgba(124, 58, 237, 0.7)" />
            </TouchableOpacity>
          </ConditionalRender>
        </View>
      </Pressable>

      <Modal visible={open} transparent animationType="fade">
        <Pressable
          className="flex-1 bg-black/30"
          onPress={() => setOpen(false)}
        />
        <View
          className="absolute left-4 right-4 top-[25%] rounded-xl bg-white p-3 shadow"
          style={{ maxHeight: maxListHeight }}
        >
          <View className="border rounded-xl px-3 py-1.5 mb-2 border-primary">
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder={searchPlaceholder}
              className="h-9 text-[15px]"
              autoFocus
            />
          </View>

          <FlatList
            data={filtered}
            keyExtractor={(item) => item.id}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
              <TouchableOpacity
                className="flex-row justify-between items-center px-2 py-3"
                onPress={() => handleSelect(item)}
                activeOpacity={0.7}
              >
                <Text className="text-[15px]">{item.label}</Text>
                {value && value.id === item.id ? (
                  <Text className="font-bold text-primary">✓</Text>
                ) : null}
              </TouchableOpacity>
            )}
            ListEmptyComponent={() => (
              <View className="py-5 items-center">
                <Text className="text-gray-500">Không có kết quả</Text>
              </View>
            )}
          />
        </View>
      </Modal>
    </View>
  );
}
