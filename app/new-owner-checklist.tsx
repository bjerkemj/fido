import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CHECKLIST_STORAGE_KEY = 'newOwnerChecklist';

const NewOwnerChecklist = () => {
    const router = useRouter();
    const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
    const [isLoading, setIsLoading] = useState(true);

    // Load checked items from storage on mount
    useEffect(() => {
        const loadCheckedItems = async () => {
            try {
                const data = await AsyncStorage.getItem(CHECKLIST_STORAGE_KEY);
                if (data) {
                    setCheckedItems(JSON.parse(data));
                }
            } catch (error) {
                console.error('Error loading checklist:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadCheckedItems();
    }, []);

    // Save to storage whenever checkedItems changes
    const toggleItem = async (id: string) => {
        const newCheckedItems = {
            ...checkedItems,
            [id]: !checkedItems[id]
        };

        setCheckedItems(newCheckedItems);

        try {
            await AsyncStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(newCheckedItems));
        } catch (error) {
            console.error('Error saving checklist:', error);
        }
    };

    const getProgress = (categoryId: string) => {
        // Get all items for this category by checking the JSX
        const categoryItemCounts: { [key: string]: number } = {
            'research': 5,
            'finding': 3,
            'feeding': 7,
            'safety': 6,
            'walking': 7,
            'sleeping': 4,
            'toys': 9,
            'grooming': 10,
            'training': 4,
            'health': 6,
            'services': 5,
            'financial': 1,
            'legal': 6,
            'plan': 1
        };

        const totalItems = categoryItemCounts[categoryId] || 0;
        if (totalItems === 0) return 0;

        const checkedCount = Object.keys(checkedItems)
            .filter(key => key.startsWith(categoryId + '-') && checkedItems[key])
            .length;

        return Math.round((checkedCount / totalItems) * 100);
    };

    if (isLoading) {
        return (
            <SafeAreaView className="flex-1 bg-white items-center justify-center">
                <Text className="text-gray-600">Loading checklist...</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {/* HEADER */}
                <View className="px-6 py-4 flex-row items-center border-b border-gray-100">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="mr-4"
                    >
                        <Ionicons name="arrow-back" size={24} color="#374151" />
                    </TouchableOpacity>
                    <View className="flex-1">
                        <Text className="text-2xl font-bold text-gray-800">New Owner Checklist</Text>
                        <Text className="text-sm text-gray-500 mt-1">Everything you need before getting a dog</Text>
                    </View>
                </View>

                {/* CONTENT */}
                <View className="px-6 py-6">
                    {/* Introduction */}
                    <View className="bg-blue-50 rounded-xl p-4 mb-6">
                        <View className="flex-row items-center mb-2">
                            <Ionicons name="information-circle" size={20} color="#3b82f6" />
                            <Text className="text-blue-900 font-semibold ml-2">Getting Prepared</Text>
                        </View>
                        <Text className="text-blue-700 text-sm leading-5">
                            This comprehensive checklist covers everything from research to supplies. Take your time and check off items as you complete them. Getting a dog is a big decision!
                        </Text>
                    </View>

                    {/* 1. Research & Education */}
                    <ChecklistCategory
                        title="Research & Education"
                        subtitle="Before getting a dog"
                        icon="book-outline"
                        categoryId="research"
                        progress={getProgress('research')}
                    >
                        <ChecklistItem id="research-1" label="Read books on dog training and behavior" checked={checkedItems['research-1']} onToggle={toggleItem} />
                        <ChecklistItem id="research-2" label="Research breeds suitable for your lifestyle" checked={checkedItems['research-2']} onToggle={toggleItem} />
                        <ChecklistItem id="research-3" label="Calculate lifetime costs of dog ownership" checked={checkedItems['research-3']} onToggle={toggleItem} />
                        <ChecklistItem id="research-4" label="Research common health issues by breed" checked={checkedItems['research-4']} onToggle={toggleItem} />
                        <ChecklistItem id="research-5" label="Understand exercise needs by breed" checked={checkedItems['research-5']} onToggle={toggleItem} />
                    </ChecklistCategory>

                    {/* 2. Finding Your Dog */}
                    <ChecklistCategory
                        title="Finding Your Dog"
                        subtitle="Where and how to get your dog"
                        icon="search-outline"
                        categoryId="finding"
                        progress={getProgress('finding')}
                    >
                        <ChecklistItem id="finding-1" label="Understand adoption vs. breeder differences" checked={checkedItems['finding-1']} onToggle={toggleItem} />
                        <ChecklistItem id="finding-2" label="Research local breeders" checked={checkedItems['finding-2']} onToggle={toggleItem} />
                        <ChecklistItem id="finding-3" label="Visit local shelters and rescues" checked={checkedItems['finding-3']} onToggle={toggleItem} />
                    </ChecklistCategory>

                    {/* 3. Essential Supplies - Feeding */}
                    <ChecklistCategory
                        title="Supplies: Feeding"
                        subtitle="Food and water essentials"
                        icon="restaurant-outline"
                        categoryId="feeding"
                        progress={getProgress('feeding')}
                    >
                        <ChecklistItem id="feeding-1" label="Dog food" checked={checkedItems['feeding-1']} onToggle={toggleItem} />
                        <ChecklistItem id="feeding-2" label="Food and water bowls" checked={checkedItems['feeding-2']} onToggle={toggleItem} />
                        <ChecklistItem id="feeding-3" label="Food storage container" checked={checkedItems['feeding-3']} onToggle={toggleItem} />
                        <ChecklistItem id="feeding-4" label="Travel water bottle" checked={checkedItems['feeding-4']} onToggle={toggleItem} />
                        <ChecklistItem id="feeding-5" label="Collapsible travel bowls" checked={checkedItems['feeding-5']} onToggle={toggleItem} />
                        <ChecklistItem id="feeding-6" label="Food mat" checked={checkedItems['feeding-6']} onToggle={toggleItem} />
                        <ChecklistItem id="feeding-7" label="Measuring cup for food portions" checked={checkedItems['feeding-7']} onToggle={toggleItem} />
                    </ChecklistCategory>


                    {/* 4. Essential Supplies - Safety & ID */}
                    <ChecklistCategory
                        title="Supplies: Safety & ID"
                        subtitle="Keep your dog safe"
                        icon="shield-checkmark-outline"
                        categoryId="safety"
                        progress={getProgress('safety')}
                    >
                        <ChecklistItem id="safety-1" label="Collar" checked={checkedItems['safety-1']} onToggle={toggleItem} />
                        <ChecklistItem id="safety-2" label="ID tag with contact info" checked={checkedItems['safety-2']} onToggle={toggleItem} />
                        <ChecklistItem id="safety-3" label="Microchip (and registration)" checked={checkedItems['safety-3']} onToggle={toggleItem} />
                        <ChecklistItem id="safety-4" label="Harness (for walking)" checked={checkedItems['safety-4']} onToggle={toggleItem} />
                        <ChecklistItem id="safety-5" label="Reflective gear for night walks" checked={checkedItems['safety-5']} onToggle={toggleItem} />
                        <ChecklistItem id="safety-6" label="GPS tracker (optional)" checked={checkedItems['safety-6']} onToggle={toggleItem} />
                    </ChecklistCategory>

                    {/* 5. Essential Supplies - Walking & Travel */}
                    <ChecklistCategory
                        title="Supplies: Walking & Travel"
                        subtitle="For adventures outside"
                        icon="walk-outline"
                        categoryId="walking"
                        progress={getProgress('walking')}
                    >
                        <ChecklistItem id="walking-1" label="Leash" checked={checkedItems['walking-1']} onToggle={toggleItem} />
                        <ChecklistItem id="walking-2" label="Car seat belt/harness" checked={checkedItems['walking-2']} onToggle={toggleItem} />
                        <ChecklistItem id="walking-3" label="Car seat cover" checked={checkedItems['walking-3']} onToggle={toggleItem} />
                        <ChecklistItem id="walking-4" label="Travel crate" checked={checkedItems['walking-4']} onToggle={toggleItem} />
                        <ChecklistItem id="walking-5" label="Poop bags and dispenser" checked={checkedItems['walking-5']} onToggle={toggleItem} />
                        <ChecklistItem id="walking-6" label="Treat pouch for walks" checked={checkedItems['walking-6']} onToggle={toggleItem} />
                        <ChecklistItem id="walking-7" label="Carabiner clips" checked={checkedItems['walking-7']} onToggle={toggleItem} />
                    </ChecklistCategory>

                    {/* 6. Essential Supplies - Sleeping & Comfort */}
                    <ChecklistCategory
                        title="Supplies: Sleeping & Comfort"
                        subtitle="A comfy place to rest"
                        icon="moon-outline"
                        categoryId="sleeping"
                        progress={getProgress('sleeping')}
                    >
                        <ChecklistItem id="sleeping-1" label="Dog bed" checked={checkedItems['sleeping-1']} onToggle={toggleItem} />
                        <ChecklistItem id="sleeping-2" label="Crate" checked={checkedItems['sleeping-2']} onToggle={toggleItem} />
                        <ChecklistItem id="sleeping-3" label="Crate mat/pad" checked={checkedItems['sleeping-3']} onToggle={toggleItem} />
                        <ChecklistItem id="sleeping-4" label="Blankets" checked={checkedItems['sleeping-4']} onToggle={toggleItem} />
                    </ChecklistCategory>

                    {/* 7. Essential Supplies - Toys & Enrichment */}
                    <ChecklistCategory
                        title="Supplies: Toys & Enrichment"
                        subtitle="Keep them entertained"
                        icon="football-outline"
                        categoryId="toys"
                        progress={getProgress('toys')}
                    >
                        <ChecklistItem id="toys-1" label="Chew toys" checked={checkedItems['toys-1']} onToggle={toggleItem} />
                        <ChecklistItem id="toys-2" label="Puzzle toys" checked={checkedItems['toys-2']} onToggle={toggleItem} />
                        <ChecklistItem id="toys-3" label="Stuffed toys" checked={checkedItems['toys-3']} onToggle={toggleItem} />
                        <ChecklistItem id="toys-4" label="Rope toys" checked={checkedItems['toys-4']} onToggle={toggleItem} />
                        <ChecklistItem id="toys-5" label="Fetch toys (balls, frisbees)" checked={checkedItems['toys-5']} onToggle={toggleItem} />
                        <ChecklistItem id="toys-6" label="Squeaky toys" checked={checkedItems['toys-6']} onToggle={toggleItem} />
                        <ChecklistItem id="toys-7" label="Treat-dispensing toys" checked={checkedItems['toys-7']} onToggle={toggleItem} />
                        <ChecklistItem id="toys-8" label="Kong or similar" checked={checkedItems['toys-8']} onToggle={toggleItem} />
                        <ChecklistItem id="toys-9" label="Toy storage box" checked={checkedItems['toys-9']} onToggle={toggleItem} />
                    </ChecklistCategory>

                    {/* 8. Essential Supplies - Grooming */}
                    <ChecklistCategory
                        title="Supplies: Grooming"
                        subtitle="Keep them clean and healthy"
                        icon="cut-outline"
                        categoryId="grooming"
                        progress={getProgress('grooming')}
                    >
                        <ChecklistItem id="grooming-1" label="Brush (appropriate for coat type)" checked={checkedItems['grooming-1']} onToggle={toggleItem} />
                        <ChecklistItem id="grooming-2" label="Nail clippers or Dremel" checked={checkedItems['grooming-2']} onToggle={toggleItem} />
                        <ChecklistItem id="grooming-3" label="Dog shampoo" checked={checkedItems['grooming-3']} onToggle={toggleItem} />
                        <ChecklistItem id="grooming-4" label="Conditioner (for long-haired breeds)" checked={checkedItems['grooming-4']} onToggle={toggleItem} />
                        <ChecklistItem id="grooming-5" label="Ear cleaner" checked={checkedItems['grooming-5']} onToggle={toggleItem} />
                        <ChecklistItem id="grooming-6" label="Toothbrush and toothpaste" checked={checkedItems['grooming-6']} onToggle={toggleItem} />
                        <ChecklistItem id="grooming-7" label="Grooming wipes" checked={checkedItems['grooming-7']} onToggle={toggleItem} />
                        <ChecklistItem id="grooming-8" label="De-shedding tool" checked={checkedItems['grooming-8']} onToggle={toggleItem} />
                        <ChecklistItem id="grooming-9" label="Towels (dedicated dog towels)" checked={checkedItems['grooming-9']} onToggle={toggleItem} />
                        <ChecklistItem id="grooming-10" label="Paw balm" checked={checkedItems['grooming-10']} onToggle={toggleItem} />
                    </ChecklistCategory>

                    {/* 9. Essential Supplies - Training */}
                    <ChecklistCategory
                        title="Supplies: Training"
                        subtitle="Tools for teaching"
                        icon="school-outline"
                        categoryId="training"
                        progress={getProgress('training')}
                    >
                        <ChecklistItem id="training-1" label="Clicker" checked={checkedItems['training-1']} onToggle={toggleItem} />
                        <ChecklistItem id="training-2" label="Long line for recall training" checked={checkedItems['training-2']} onToggle={toggleItem} />
                        <ChecklistItem id="training-3" label="Whistle (for training)" checked={checkedItems['training-3']} onToggle={toggleItem} />
                        <ChecklistItem id="training-4" label="Training books or course access" checked={checkedItems['training-4']} onToggle={toggleItem} />
                    </ChecklistCategory>

                    {/* 10. Essential Supplies - Health & Safety */}
                    <ChecklistCategory
                        title="Supplies: Health & Safety"
                        subtitle="Medical essentials"
                        icon="medical-outline"
                        categoryId="health"
                        progress={getProgress('health')}
                    >
                        <ChecklistItem id="health-1" label="First aid kit" checked={checkedItems['health-1']} onToggle={toggleItem} />
                        <ChecklistItem id="health-2" label="Styptic powder (for nail bleeding)" checked={checkedItems['health-2']} onToggle={toggleItem} />
                        <ChecklistItem id="health-3" label="Flea/tick prevention" checked={checkedItems['health-3']} onToggle={toggleItem} />
                        <ChecklistItem id="health-4" label="Heartworm prevention" checked={checkedItems['health-4']} onToggle={toggleItem} />
                        <ChecklistItem id="health-5" label="Enzymatic cleaner (for accidents)" checked={checkedItems['health-5']} onToggle={toggleItem} />
                        <ChecklistItem id="health-6" label="Muzzle (for vet visits/emergencies)" checked={checkedItems['health-6']} onToggle={toggleItem} />
                    </ChecklistCategory>

                    {/* 11. Find Services & Professionals */}
                    <ChecklistCategory
                        title="Services & Professionals"
                        subtitle="Build your support network"
                        icon="people-outline"
                        categoryId="services"
                        progress={getProgress('services')}
                    >
                        <ChecklistItem id="services-1" label="Research local vets and choose one" checked={checkedItems['services-1']} onToggle={toggleItem} />
                        <ChecklistItem id="services-2" label="Find emergency vet clinic (24/7)" checked={checkedItems['services-2']} onToggle={toggleItem} />
                        <ChecklistItem id="services-3" label="Look up dog trainers in area" checked={checkedItems['services-3']} onToggle={toggleItem} />
                        <ChecklistItem id="services-4" label="Find groomers (if needed)" checked={checkedItems['services-4']} onToggle={toggleItem} />
                        <ChecklistItem id="services-5" label="Join local dog owner groups/forums" checked={checkedItems['services-5']} onToggle={toggleItem} />
                    </ChecklistCategory>

                    {/* 12. Financial Planning */}
                    <ChecklistCategory
                        title="Financial Planning"
                        subtitle="Budget for your new companion"
                        icon="wallet-outline"
                        categoryId="financial"
                        progress={getProgress('financial')}
                    >
                        <ChecklistItem id="financial-1" label="Get pet insurance quotes" checked={checkedItems['financial-1']} onToggle={toggleItem} />
                    </ChecklistCategory>

                    {/* 13. Legal & Administrative */}
                    <ChecklistCategory
                        title="Legal & Administrative"
                        subtitle="Paperwork and regulations"
                        icon="document-outline"
                        categoryId="legal"
                        progress={getProgress('legal')}
                    >
                        <ChecklistItem id="legal-1" label="Check HOA/rental pet policies" checked={checkedItems['legal-1']} onToggle={toggleItem} />
                        <ChecklistItem id="legal-2" label="Understand local leash laws" checked={checkedItems['legal-2']} onToggle={toggleItem} />
                        <ChecklistItem id="legal-3" label="Know breed restrictions in your area" checked={checkedItems['legal-3']} onToggle={toggleItem} />
                        <ChecklistItem id="legal-4" label="Register dog with local authorities (after getting)" checked={checkedItems['legal-4']} onToggle={toggleItem} />
                        <ChecklistItem id="legal-5" label="Get dog license (after getting)" checked={checkedItems['legal-5']} onToggle={toggleItem} />
                        <ChecklistItem id="legal-6" label="Add pet to renter's insurance if applicable" checked={checkedItems['legal-6']} onToggle={toggleItem} />
                    </ChecklistCategory>

                    {/* 14. Training & Socialization Plan */}
                    <ChecklistCategory
                        title="Training & Socialization Plan"
                        subtitle="Set your dog up for success"
                        icon="ribbon-outline"
                        categoryId="plan"
                        progress={getProgress('plan')}
                    >
                        <ChecklistItem id="plan-1" label="Research puppy socialization classes" checked={checkedItems['plan-1']} onToggle={toggleItem} />
                    </ChecklistCategory>


                    {/* Final encouragement */}
                    <View className="bg-green-50 rounded-xl p-5 mt-6 mb-4">
                        <View className="flex-row items-center mb-2">
                            <Ionicons name="heart" size={20} color="#10b981" />
                            <Text className="text-green-900 font-semibold ml-2">You're Almost Ready!</Text>
                        </View>
                        <Text className="text-green-700 text-sm leading-5">
                            Going through this checklist shows you're taking dog ownership seriously. Remember, you don't need everything perfect before getting your dog - the most important thing is commitment, love, and willingness to learn together.
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

// ChecklistCategory and ChecklistItem components remain exactly the same
const ChecklistCategory = ({
                               title,
                               subtitle,
                               icon,
                               progress,
                               children
                           }: {
    title: string;
    subtitle: string;
    icon: keyof typeof Ionicons.glyphMap;
    categoryId: string;
    progress: number;
    children: React.ReactNode;
}) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <View className="mb-4">
            <TouchableOpacity
                onPress={() => setExpanded(!expanded)}
                activeOpacity={0.7}
                className="bg-gray-50 rounded-2xl p-4"
            >
                <View className="flex-row items-center justify-between mb-2">
                    <View className="flex-row items-center flex-1">
                        <View className="bg-blue-100 p-2 rounded-lg mr-3">
                            <Ionicons name={icon} size={20} color="#3b82f6" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-base font-bold text-gray-800">{title}</Text>
                            <Text className="text-xs text-gray-500 mt-0.5">{subtitle}</Text>
                        </View>
                    </View>
                    <Ionicons
                        name={expanded ? "chevron-up" : "chevron-down"}
                        size={20}
                        color="#9ca3af"
                    />
                </View>

                {/* Progress Bar */}
                <View className="mt-3">
                    <View className="flex-row justify-between items-center mb-1">
                        <Text className="text-xs text-gray-500">Progress</Text>
                        <Text className="text-xs font-semibold text-blue-600">{progress}%</Text>
                    </View>
                    <View className="bg-gray-200 rounded-full h-2">
                        <View
                            className="bg-blue-500 rounded-full h-2"
                            style={{ width: `${progress}%` }}
                        />
                    </View>
                </View>
            </TouchableOpacity>

            {expanded && (
                <View className="mt-2 ml-4">
                    {children}
                </View>
            )}
        </View>
    );
};

const ChecklistItem = ({
                           id,
                           label,
                           checked,
                           onToggle
                       }: {
    id: string;
    label: string;
    checked: boolean;
    onToggle: (id: string) => void;
}) => (
    <TouchableOpacity
        onPress={() => onToggle(id)}
        activeOpacity={0.7}
        className="flex-row items-center py-2"
    >
        <View
            className={`w-5 h-5 rounded border-2 mr-3 items-center justify-center ${checked ? 'bg-blue-500 border-blue-500' : 'border-gray-300'}`}
        >
            {checked && <Ionicons name="checkmark" size={14} color="white" />}
        </View>
        <Text className={`flex-1 text-sm ${checked ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
            {label}
        </Text>
    </TouchableOpacity>
);

export default NewOwnerChecklist;