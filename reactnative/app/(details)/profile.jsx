import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  Touchable,
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGlobalContext } from "../../context/GlobalProvider";
import { router, useNavigation } from "expo-router";
import CustomButton from "../components/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "../../constants";
import * as ImagePicker from "expo-image-picker";
import ChoosePhotoModal from "../components/ChoosePhotoModal";
import EditProfile from "../components/EditProfile";
import CardProfile from "../components/CardProfile";
import { LoadingModal } from "react-native-loading-modal";

const profile = () => {
  const navigation = useNavigation();
  const { setIsLoggedIn, setUser } = useGlobalContext();
  const [records, setRecord] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChoosePhoto = () => {
    setModalVisible(true);
  };
  const handleCancel = () => {
    setModalVisible(false);
  };
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const selectedUri = await convertToBase64(uri);
      setModalVisible(false);
      setEditModalVisible(true);
      setSelectedImage(selectedUri);
    } else {
      alert("You did not select any image.");
    }
  };
  const convertToBase64 = async (uri) => {
    try {
      const file = await fetch(uri);
      const blob = await file.blob();
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      return new Promise((resolve, reject) => {
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
      });
    } catch (error) {
      console.error("Error converting to base64:", error);
      throw error;
    }
  };
  const takeImageAsync = async () => {
    await ImagePicker.requestCameraPermissionsAsync();
    let result = await ImagePicker.launchCameraAsync({
      cameraType: ImagePicker.CameraType.front,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const selectedUri = await convertToBase64(uri);
      setModalVisible(false);
      setEditModalVisible(true);
      setSelectedImage(selectedUri);
    } else {
      alert("You did not select any image.");
    }
  };

  const fetchData = async () => {
    //const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const apiUrl = "https://conserve-trivalleyhack.onrender.com";
    const token = await AsyncStorage.getItem("userData");
    if (!token) throw new Error("No token found");
    try {
      const res = await fetch(`${apiUrl}/api/getProfileInfos`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setRecord(data);
    } catch (error) {
      Alert("Error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveUpdate = async (updatedData) => {
    const userId = records.id;
    setEditModalVisible(false);
    setIsLoading(true);
    try {
      // const apiUrl = process.env.EXPO_PUBLIC_API_URL;
      const apiUrl = "https://conserve-trivalleyhack.onrender.com";
      const res = await fetch(`${apiUrl}/api/users/update/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      setIsLoading(false);
      fetchData();
      const data = await res.json();
      if (data.error) {
        console.error(data.error);
        return;
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("userData");
    setIsLoggedIn(false);
    setUser("");
    router.replace("/sign-in");
  };
  return (
    <SafeAreaView className="items-center h-full bg-primary">
      <View className="flex flex-row justify-center mt-3">
        <View className="flex justify-start">
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate("(tabs)", { screen: "home" })}
            >
              <Image
                source={icons.crossX}
                style={{
                  width: 40,
                  height: 40,
                  resizeMode: "contain",
                  marginRight: 50,
                  marginTop: 5,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex basis-3/4">
          <Text className="text-3xl text-center mt-2 font-psemibold text-secondary mr-16">
            PROFILE
          </Text>
        </View>
      </View>

      <View className="flex h-5/6 justify-between p-3">
        <CardProfile handleChoosePhoto={handleChoosePhoto} records={records} />
        <ChoosePhotoModal
          handleCancel={handleCancel}
          pickImageAsync={pickImageAsync}
          takeImageAsync={takeImageAsync}
          modalVisible={modalVisible}
        />
        <EditProfile
          pickImageAsync={pickImageAsync}
          selectedImage={selectedImage}
          handleSaveUpdate={handleSaveUpdate}
          editModalVisible={editModalVisible}
          records={records}
        />
        <LoadingModal modalVisible={isLoading} />
        <View>
          <CustomButton
            title={"Logout"}
            handlePress={logout}
            containerStyles={"mt-7"}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default profile;
