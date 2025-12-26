import {Text, View, Image, TouchableOpacity} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {icons} from "@/constants/icons";
import ImageCarousel from "@/Components/ImageCarousel";

export default function Index() {
  return (
      <SafeAreaView className="flex-1 bg-white items-center">

          {/* 1. CONTAINER FOR TOP + CARD (Grouped together) */}
          <View className="items-center w-full">

              {/* TOP TEXT - Moved higher by removing extra padding/margins */}
              <View className="mt-1">
                  <Text className="font-bold text-blue-400 text-2xl">fido</Text>
              </View>

              {/* CARD SECTION - mt-4 (16px) or mt-2 (8px) for a smaller gap */}
              <View className="items-center mt-4">
                  <View className="w-[300px]">
                      <ImageCarousel />
                      <View className="flex-row justify-between items-center mt-3">
                          <Text className="font-bold text-gray-600 text-2xl">
                              Species
                          </Text>

                          <TouchableOpacity
                              className="bg-gray-100 px-3 py-1.5 rounded-full"
                              activeOpacity={0.6}
                          >
                              <Text className="text-blue-500 font-semibold text-sm">
                                  View more
                              </Text>
                          </TouchableOpacity>
                      </View>
                  </View>
              </View>
          </View>

          {/* 2. BUTTONS - Pushed to the bottom using absolute positioning or flex-end */}
          <View className="absolute bottom-7 flex-row items-center justify-center w-full gap-8">

              {/* DISLIKE BUTTON */}
              <TouchableOpacity
                  className="w-16 h-16 bg-white rounded-full items-center justify-center shadow-lg border-4 border-red-500"
                  activeOpacity={0.7}
              >
                  <Image
                      source={icons.dislike}
                      className="w-16 h-16" // Doubled the icon inside too
                      resizeMode="contain"
                  />
              </TouchableOpacity>

              {/* LIKE BUTTON - With Green Hollow Circle */}
              <TouchableOpacity
                  className="w-16 h-16 bg-white rounded-full items-center justify-center shadow-lg border-4 border-green-500"
                  activeOpacity={0.7}
              >
                  <Image
                      source={icons.like}
                      className="w-16 h-16" // Doubled the icon inside too
                      resizeMode="contain"
                  />
              </TouchableOpacity>
          </View>

      </SafeAreaView>
  );
}