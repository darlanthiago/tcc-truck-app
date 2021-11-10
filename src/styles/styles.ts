import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 15,
  },
  section: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  row: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 10,
    flexWrap: "wrap",
  },
  sectionText: {
    fontSize: 18,
    color: "#888",
    fontWeight: "bold",
  },
  card: {
    marginHorizontal: 10,
    backgroundColor: "#fff",
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cardWithCols: {
    justifyContent: "space-between",
    alignContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  colContent: {
    maxWidth: "60%",
  },
  colAction: {
    maxWidth: "40%",
  },
  cardSecond: {
    marginVertical: 10,
  },
  truckName: {
    color: "#313168",
    fontSize: 22,
    fontWeight: "bold",
  },
  truckMail: {
    color: "#7d7fcc",
    fontSize: 12,
    fontWeight: "bold",
  },
  truckDesc: {
    marginTop: 20,
    color: "#9495c9",
    fontSize: 12,
  },
  buttonEdit: {
    backgroundColor: "#32FF7E",
    padding: 10,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonEditText: {
    color: "#0f3d20",
    marginHorizontal: 3,
    fontWeight: "bold",
    fontSize: 14,
  },
  addressText: {
    marginTop: 15,
    fontWeight: "bold",
    color: "#5559c9",
  },
  schedules: {
    marginTop: 20,
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  scheduleDay: {
    backgroundColor: "#5758BB",
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    padding: 4,
    marginVertical: 5,
  },
  scheduleDayName: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
  },
  scheduleDayHour: {
    fontSize: 12,
    color: "#fff",
  },
  buttonAdd: {
    backgroundColor: "#5758BB",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    padding: 4,
  },
  buttonItems: {
    backgroundColor: "#5758BB",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  buttonItemsText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
  },
  itemsContainer: {
    marginTop: 30,
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  item: {
    backgroundColor: "#5758BB",
    margin: 5,
    padding: 8,
    borderRadius: 8,
  },
  itemTitle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  itemTitleText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#fff",
  },
  itemDesc: {
    fontSize: 12,
    marginBottom: 12,
    color: "#eee",
  },
  itemPrice: {
    backgroundColor: "#32FF7E",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    padding: 6,
  },
  itemPriceText: {
    fontWeight: "bold",
    color: "#0e351c",
  },
  itemCategory: {
    backgroundColor: "#32FF7E",
    width: 50,
    alignItems: "center",
    borderRadius: 10,
    marginLeft: 4,
  },
  itemCategoryText: {
    fontSize: 10,
    color: "#0e351c",
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    flex: 1,
    marginTop: "55%",
    backgroundColor: "white",
    width: "100%",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#fc5656",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#ddd",
    width: "100%",
    height: 45,
    borderRadius: 8,
    marginVertical: 4,
    paddingHorizontal: 10,
  },
  selectInput: {
    backgroundColor: "#ddd",
    height: 45,
    marginVertical: 4,
    paddingHorizontal: 10,
  },
  label: {
    width: "100%",
    alignItems: "flex-start",
    color: "#242323",
    fontWeight: "bold",
  },
  schedulesTextModal: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 30,
  },
  categoriesContainer: {
    marginTop: 2,
    flex: 1,
  },
  category: {
    backgroundColor: "#5758BB",
    width: 100,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    padding: 4,
    marginVertical: 5,
    marginRight: 20,
  },
  categoryName: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
  },
  newCategoryContainer: {
    flex: 1,
    padding: 20,
    // width: "100%",
    flexDirection: "row",
  },
  buttonAddNewCategory: {
    backgroundColor: "#32FF7E",
    height: 45,
    borderRadius: 8,
    marginVertical: 4,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 2,
  },
  nowLocationText: {
    marginVertical: 5,
    fontWeight: "bold",
    color: "#999",
  },
  toLocationText: {
    marginVertical: 5,
    fontWeight: "bold",
    color: "#0f3d2f",
  },
});