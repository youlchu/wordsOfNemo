import React, { useCallback } from "react";
import {
  Modal,
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

type ImageViewerModalProps = {
  imageNames: string[];
  visible: boolean;
  selectedImageIndex: number;
  onChange?: (currentIndex: number) => void;
  onClose?: () => void;
  getImageUrl: (name: string) => string;
};

const AnimatedImage = Animated.createAnimatedComponent(Image);

export const ImageViewerModal: React.FC<ImageViewerModalProps> = ({
  imageNames,
  visible,
  selectedImageIndex,
  onChange,
  onClose,
  getImageUrl,
}) => {
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const savedTranslateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);

  const pinchGesture = Gesture.Pinch()
    .onStart(() => {
      savedScale.value = scale.value;
    })
    .onUpdate((event) => {
      scale.value = savedScale.value * event.scale;
    })
    .onEnd(() => {
      if (scale.value < 1) {
        scale.value = withSpring(1);
      }
    });

  const panGesture = Gesture.Pan()
    .onStart(() => {
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    })
    .onUpdate((event) => {
      translateX.value = savedTranslateX.value + event.translationX;
      translateY.value = savedTranslateY.value + event.translationY;
    })
    .onEnd(() => {
      const shouldClose = Math.abs(translateY.value) > SCREEN_HEIGHT * 0.2;
      if (shouldClose) {
        onClose?.();
        // Reset values for next open
        scale.value = withSpring(1);
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      } else {
        translateY.value = withSpring(0);
        translateX.value = withSpring(0);
      }
    });

  const composed = Gesture.Simultaneous(pinchGesture, panGesture);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
      ],
    };
  });

  const backgroundStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      Math.abs(translateY.value),
      [0, SCREEN_HEIGHT * 0.2],
      [1, 0]
    );
    return {
      opacity,
    };
  });

  const renderImage = useCallback(() => {
    const imageUrl = getImageUrl(imageNames[selectedImageIndex]);
    return (
      <AnimatedImage
        source={{ uri: imageUrl }}
        style={[styles.image, animatedStyle]}
        resizeMode="contain"
      />
    );
  }, [selectedImageIndex, imageNames]);

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <GestureHandlerRootView style={styles.container}>
        <Animated.View style={[styles.background, backgroundStyle]} />
        <View style={styles.content}>
          <GestureDetector gesture={composed}>{renderImage()}</GestureDetector>
          <TouchableOpacity style={styles.closeButton} onPress={onClose} />
        </View>
      </GestureHandlerRootView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    width: 40,
    height: 40,
  },
});
