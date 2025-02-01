import { useRouter } from "expo-router";
import React, { Fragment, useEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  HomeHeaderView,
  HomeTopSearchItemView,
  ListingItemView,
  SectionHeader,
  Separator,
} from "../../components";

import { ThemedView } from "../../components/ThemedView";
import { Colors } from "../../constants/Colors";
import { useColorScheme } from "../../hooks/useColorScheme";
import { City, DashboardModel, Property } from "../../components/models";

const HEADER_HEIGHT = 230;
const WINDOW_WIDTH = Dimensions.get("window").width;

const MOCK_HEADER_IMAGES: string[] = [
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea',
];

const MOCK_FEATURED_PROPERTIES: Property[] = [
  {
    id: 1,
    propertyTypeId: 1,
    propertyCategoryId: 1,
    userId: 1,
    cityId: 1,
    featured: true,
    title: 'Modern Villa with Pool',
    description: 'Luxury villa with amazing amenities',
    imageNames: 'villa1.jpg', // Tek string olarak
    bedRoomCount: 5,
    bathRoomCount: 4,
    kitchenRoomCount: 1,
    parkingCount: 2,
    additionalFeatures: 'Pool,Garden,Security',
    price: 5200000,
    currency: 'USD',
    address: '123 Beverly Hills Dr, CA',
    latitude: 34.0736204,
    longitude: -118.4003563,
    createdDate: new Date(),
    city: {
      id: 1,
      name: 'Beverly Hills',
      imageName: 'beverly-hills.jpg',
      searchCount: 1500
    },
    propertyCategory: {
      id: 1,
      name: 'Residential'
    },
    propertyType: {
      id: 1,
      name: 'Villa'
    },
    user: {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      username: 'johndoe',
      phoneNumber: '+1234567890',
      address: '123 Main St, Beverly Hills, CA',
      latitude: 34.0736204,
      longitude: -118.4003563,
      imageName: 'john-profile.jpg'
    },
    size: 450,
    isLiked: false
  },
  {
    id: 2,
    propertyTypeId: 2,
    propertyCategoryId: 1,
    userId: 2,
    cityId: 2,
    featured: true,
    title: 'Luxury Penthouse',
    description: 'Premium penthouse with city views',
    imageNames: 'penthouse1.jpg,penthouse2.jpg',
    bedRoomCount: 3,
    bathRoomCount: 3,
    kitchenRoomCount: 1,
    parkingCount: 2,
    additionalFeatures: 'Terrace,Gym,Concierge',
    price: 3500000,
    currency: 'USD',
    address: '456 Park Ave, NY',
    latitude: 40.7127753,
    longitude: -74.0059728,
    createdDate: new Date(),
    city: {
      id: 2,
      name: 'New York',
      imageName: 'new-york.jpg',
      searchCount: 2500
    },
    propertyCategory: {
      id: 1,
      name: 'Residential'
    },
    propertyType: {
      id: 2,
      name: 'Penthouse'
    },
    user: {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      username: 'janesmith',
      phoneNumber: '+1234567891',
      address: '456 Park Avenue, New York, NY',
      latitude: 40.7127753,
      longitude: -74.0059728,
      imageName: 'jane-profile.jpg'
    },
    size: 300,
    isLiked: false
  }
];

const MOCK_TOP_SEARCH_CITIES: City[] = [
  {
    id: 1,
    name: 'New York',
    imageName: 'new-york.jpg',
    searchCount: 2500
  },
  {
    id: 2,
    name: 'Los Angeles',
    imageName: 'los-angeles.jpg',
    searchCount: 2000
  },
  {
    id: 3,
    name: 'Miami',
    imageName: 'miami.jpg',
    searchCount: 1800
  }
];

const MOCK_NEW_PROPERTIES: Property[] = [
  {
    id: 3,
    propertyTypeId: 3,
    propertyCategoryId: 1,
    userId: 3,
    cityId: 3,
    featured: false,
    title: 'Modern Downtown Apartment',
    description: 'Contemporary apartment in city center',
    imageNames: 'apt1.jpg,apt2.jpg',
    bedRoomCount: 2,
    bathRoomCount: 2,
    kitchenRoomCount: 1,
    parkingCount: 1,
    additionalFeatures: 'Balcony,Storage,Security',
    price: 850000,
    currency: 'USD',
    address: '789 Downtown St, Miami',
    latitude: 25.7616798,
    longitude: -80.1917902,
    createdDate: new Date(),
    city: {
      id: 3,
      name: 'Miami',
      imageName: 'miami.jpg',
      searchCount: 1800
    },
    propertyCategory: {
      id: 1,
      name: 'Residential'
    },
    propertyType: {
      id: 3,
      name: 'Apartment'
    },
    user: {
      id: 3,
      firstName: 'Mike',
      lastName: 'Johnson',
      email: 'mike@example.com',
      username: 'mikejohnson',
      phoneNumber: '+1234567892',
      address: '789 Downtown St, Miami, FL',
      latitude: 25.7616798,
      longitude: -80.1917902,
      imageName: 'mike-profile.jpg'
    },
    size: 120,
    isLiked: false
  },
  {
    id: 4,
    propertyTypeId: 1,
    propertyCategoryId: 1,
    userId: 4,
    cityId: 4,
    featured: false,
    title: 'Seaside Villa',
    description: 'Beautiful villa with ocean view',
    imageNames: 'seaside1.jpg,seaside2.jpg',
    bedRoomCount: 4,
    bathRoomCount: 3,
    kitchenRoomCount: 1,
    parkingCount: 2,
    additionalFeatures: 'Pool,Beach Access,Garden',
    price: 4200000,
    currency: 'USD',
    address: '101 Ocean Dr, Malibu',
    latitude: 34.0259216,
    longitude: -118.7797571,
    createdDate: new Date(),
    city: {
      id: 4,
      name: 'Malibu',
      imageName: 'malibu.jpg',
      searchCount: 1200
    },
    propertyCategory: {
      id: 1,
      name: 'Residential'
    },
    propertyType: {
      id: 1,
      name: 'Villa'
    },
    user: {
      id: 4,
      firstName: 'Sarah',
      lastName: 'Wilson',
      email: 'sarah@example.com',
      username: 'sarahwilson',
      phoneNumber: '+1234567893',
      address: '101 Ocean Drive, Malibu, CA',
      latitude: 34.0259216,
      longitude: -118.7797571,
      imageName: 'sarah-profile.jpg'
    },
    size: 380,
    isLiked: false
  }
];

export default function HomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const offset = new Animated.Value(0);
  const [dashboardModel, setDashboardModel] = useState<DashboardModel | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const fetchDashboardItems = () => {
      setRefreshing(true);
      setError(null);
      try {
          setTimeout(() => {
              const mockData: DashboardModel = {
                  headerImages: MOCK_HEADER_IMAGES,
                  featuredProperties: MOCK_FEATURED_PROPERTIES,
                  topSearchCities: MOCK_TOP_SEARCH_CITIES,
                  newProperties: MOCK_NEW_PROPERTIES,
              };
              
              setDashboardModel(mockData);
              setRefreshing(false);
          }, 1000);
      } catch (err) {
          setError(err instanceof Error ? err.message : 'Bir hata oluştu');
          setRefreshing(false);
      }
  };
  if (error) {
    return (
        <ThemedView style={styles.container}>
            Hata: {error}
        </ThemedView>
    );
  }
  useEffect(() => {
    fetchDashboardItems();
  }, []);

  if (!dashboardModel) {
    return null;
  }

  return (
    <ThemedView style={styles.container}>
      <HomeHeaderView
        animValue={offset}
        height={HEADER_HEIGHT}
        headerImages={dashboardModel.headerImages}
        onPressSearchInput={() => {
          router.push("/(tabs)/settings");
        }}
      />
      <SafeAreaView style={styles.contentContainer}>
      <ScrollView
        style={[
          styles.scrollViewContainer,
          { backgroundColor: Colors[colorScheme ?? "light"].background },
        ]}
        contentContainerStyle={styles.scrollViewContentContainerStyle}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true} 
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={fetchDashboardItems}
          />
        }
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: offset } } }],
          { useNativeDriver: false }
        )}
      >
      
        <SectionHeader title="Top Searches" mTop={16} />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingStart: 16 }}
        >
            {dashboardModel.topSearchCities.map((item) => (
              <Fragment key={item.id}>
                <HomeTopSearchItemView
                  item={item}
                  onClick={() => {
                    console.log('Clicked city:', item.name);
                  }}
              />
              <Separator horizontal />
            </Fragment>
          ))}
        </ScrollView>

          <SectionHeader title="Today New" mTop={16} />
          <Separator height={8} />
          {dashboardModel.newProperties.map((item) => (
            <Fragment key={item.id}>
              <ListingItemView
                model={item}
                onClick={() => {
                  console.log('Clicked new property:', item.id);
                }}
              />
              <Separator height={16} />
            </Fragment>
          ))}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  scrollViewContainer: {
    flex: 1,
  },
  scrollViewContentContainerStyle: {
    paddingTop: HEADER_HEIGHT + 16,
  },
});
