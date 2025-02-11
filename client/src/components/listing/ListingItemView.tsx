import {
  FontAwesome,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import numeral from "numeral";
import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import PagerView from "react-native-pager-view";

import { AuthenticationContext, LikedPropertiesContext } from "../../context";
import { useLocalization } from "../../localization";
import { PropertyService } from "../../services";
import { Theme } from "../../theme";
import { Box } from "../box";
import { LikeButton } from "../buttons";
import { Divider } from "../divider";
import { Text } from "../text";
import { Property } from "../models";

const WINDOW_WIDTH = Dimensions.get('window').width;
const SLIDER_HEIGHT = 180;

const Pagination = ({
  activeDotIndex,
  dotsLength,
  dotColor,
  inactiveDotColor,
  inactiveDotScale = 0.8,
  containerStyle,
  dotStyle,
}) => {
  return (
    <View
      style={[
        { flexDirection: "row", justifyContent: "center" },
        containerStyle,
      ]}
    >
      {Array.from({ length: dotsLength }).map((_, index) => (
        <View
          key={index}
          style={[
            {
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor:
                index === activeDotIndex ? dotColor : inactiveDotColor,
              marginHorizontal: 4,
              transform: [
                { scale: index === activeDotIndex ? 1 : inactiveDotScale },
              ],
            },
            dotStyle,
          ]}
        />
      ))}
    </View>
  );
};

// Property Detail Component
const PropertyDetail = ({ iconName, title }) => (
  <View style={styles.propertyContent}>
    <FontAwesome
      name={iconName}
      size={17}
      color={Theme.colors.yellow}
    />
    <Text style={styles.propertyTitle}>{title}</Text>
  </View>
);

// Main ListingItemView Component
export const ListingItemView = ({ model, onClick }) => {
  const { isLoggedIn } = useContext(AuthenticationContext);
  const { likedProperties, likeProperty } = useContext(LikedPropertiesContext);
  const router = useRouter();
  const { getString } = useLocalization();
  const [indicatorIndex, setIndicatorIndex] = useState(0);

  const getPropertyImages = (imageNames) => {
    if (!imageNames) {
      return ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9'];
    }
    
    const images = imageNames.split(',').filter(name => name.trim());
    
    if (images.length === 0) {
      return ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c'];
    }
  
    return images.map((_, index) => 
      `https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea}`
    );
  };
  

  const propertyImages = getPropertyImages(model.imageNames);
  const isLiked = likedProperties.hasOwnProperty(model.id);

  const onClickLike = () => {
    if (!isLoggedIn) {
      router.push("/(auth)/login");
      return;
    }
    PropertyService.likeProperty(model.id, !isLiked)
      .then((_) => {
        model.isLiked = !isLiked;
        likeProperty(model, !isLiked);
      })
      .catch((err) => alert(err.message));
  };

  return (
    <Box style={styles.container}>
      <View style={styles.labelContent}>
        <Text style={styles.labelText}>
          {model.propertyType.name.toLocaleLowerCase("en") === "rent"
            ? getString("FOR RENT")
            : getString("FOR SALE")}
        </Text>
      </View>
      
      <LikeButton
        isLiked={isLiked}
        onClick={onClickLike}
        style={styles.likeIcon}
      />

      <View>
        <View style={styles.imageContainer}>
          <PagerView
            style={styles.viewPager}
            initialPage={0}
            onPageSelected={(e) => setIndicatorIndex(e.nativeEvent.position)}
          >
            {propertyImages.map((imageUrl, index) => (
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={onClick}
                key={`image-${index}`}
                style={styles.imageWrapper}
              >
              <Image
                source={{ uri: imageUrl }}
                style={styles.viewPagerItemImage}
                resizeMode="cover"
                onError={(e) => console.log('Resim yükleme hatası:', e.nativeEvent.error)}
              />
              </TouchableOpacity>
            ))}
          </PagerView>
          
          <Pagination
            dotsLength={propertyImages.length}
            activeDotIndex={indicatorIndex}
            dotColor={Theme.colors.primaryColor}
            inactiveDotColor={Theme.colors.lightgray}
            inactiveDotScale={0.8}
            containerStyle={styles.paginationContainer}
            dotStyle={styles.paginationDot}
          />
        </View>

        <TouchableOpacity onPress={onClick}>
          <View style={styles.ph16}>
            <View style={styles.mv14}>
              <Text style={styles.priceText}>
                {`${model.currency} ${numeral(model.price).format("0,0.00")}`}
              </Text>
              <View style={styles.infoContainer}>
                <View style={styles.rowCenter}>
                  <Entypo name="location-pin" size={14} />
                  <Text style={styles.locationText}>{model.address}</Text>
                </View>

                <View style={styles.rowCenter}>
                  <MaterialCommunityIcons name="floor-plan" size={14} />
                  <Text style={styles.locationText}>{` ${model.size}m² `}</Text>
                </View>
              </View>
            </View>
            
            <Divider />
            
            <View style={styles.propertiesContainer}>
              <PropertyDetail
                iconName="bed"
                title={getString("bedWithCount", {
                  count: model.bedRoomCount,
                })}
              />
              <PropertyDetail
                iconName="bath"
                title={getString("bathWithCount", {
                  count: model.bathRoomCount,
                })}
              />
              <PropertyDetail
                iconName="car"
                title={getString("parkingWithCount", {
                  count: model.parkingCount,
                })}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: { 
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    position: 'relative',
    height: SLIDER_HEIGHT,
  },
  imageWrapper: {
    height: SLIDER_HEIGHT,
    width: WINDOW_WIDTH - 32,  // accounting for container margins
  },
  viewPager: { 
    height: SLIDER_HEIGHT,
  },
  viewPagerItemImage: {
    width: '100%',
    height: SLIDER_HEIGHT, 
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  paginationContainer: {
    position: "absolute",
    bottom: 14,
    alignSelf: "center",
    zIndex: 1,
  },
  paginationDot: { 
    marginHorizontal: -20 
  },
  labelContent: {
    backgroundColor: Theme.colors.yellow,
    position: "absolute",
    paddingHorizontal: 8,
    paddingVertical: 4,
    left: 16,
    top: 16,
    borderRadius: 4,
    zIndex: 10,
  },
  labelText: {
    color: "white",
    fontFamily: "default-medium",
    fontSize: 11,
  },
  likeIcon: {
    position: "absolute",
    top: SLIDER_HEIGHT - 18,
    right: 16,
    zIndex: 5,
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  ph16: { 
    paddingHorizontal: 16 
  },
  mv14: { 
    paddingVertical: 14 
  },
  priceText: {
    fontFamily: "default-medium",
    fontSize: 18,
    color: Theme.colors.textColor,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
    opacity: 0.4,
  },
  locationText: {
    color: "black",
    fontSize: 13,
    fontFamily: "default-medium",
    marginLeft: 4,
  },
  propertiesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 4,
    paddingVertical: 14,
    alignItems: "center",
  },
  propertyContent: { 
    flexDirection: "row",
    alignItems: "center",
  },
  propertyTitle: {
    marginLeft: 12,
    fontSize: 13,
    color: Theme.colors.yellowDark,
    fontFamily: "default-medium",
  },
});