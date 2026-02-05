import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F7F9FC",
  },
  authCard: {
    width: "100%",
    maxWidth: 400,
    borderRadius: 8,
    elevation: 4,
  },
  heading: {
    textAlign: "center",
    marginBottom: 24,
    color: "black",
  },
  inputContainer: {
    marginBottom: 12,
  },
  inputField: {
    marginBottom: 4,
  },
  actionBtn: {
    marginTop: 8,
    marginBottom: 16,
  },

  toastContainer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    zIndex: 999,
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#323232",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    minWidth: 250,
    flexDirection: "row",
    alignItems: "center",
  },
  toastSuccess: {
    borderLeftWidth: 6,
    borderLeftColor: "#4CAF50",
  },
  toastError: {
    borderLeftWidth: 6,
    borderLeftColor: "#F44336",
  },
  toastText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 10,
  },
});
