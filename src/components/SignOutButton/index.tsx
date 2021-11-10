import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useRNAuth } from "../../hooks/contexts/Auth";

const SignOutButton = () => {
  const { logout } = useRNAuth();

  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.9}
      onPress={logout}
    >
      <Text style={styles.buttonText}>Sair</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#fc5656",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 12,
    color: "#fff",
  },
});

export default SignOutButton;
