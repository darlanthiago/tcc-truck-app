import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  CheckIcon,
  Input,
  Modal as ModalNative,
  Select,
  useToast,
  VStack,
} from "native-base";

import { styles } from "../../styles/styles";
import { doTruncarStr } from "../../utils/trucateStr";
import { formatCurrency } from "../../utils/formatCurrency";
import { api } from "../../services/api";
import { useRNAuth } from "../../hooks/contexts/Auth";
import { isEmpty } from "../../utils/objectHelper";

type Categories = {
  id: string;
  name: string;
};

type Item = {
  id: string;
  name: string;
  description: string;
  price: number;
  itemCategory: string | null;
  itemCategoryText: string | null;
};

type NewItem = {
  name: string;
  description: string;
  price: string;
  itemCategory?: string;
};

const TruckItemsCategories: React.FC = () => {
  const toast = useToast();
  const { signedTruck } = useRNAuth();

  const [loading, setLoading] = useState(false);

  const [modalCategoryVisible, setModalCategoryVisible] = useState(false);

  const [modalItemsVisible, setModalItemsVisible] = useState(false);

  const [categories, setCategories] = useState<Categories[]>([]);

  const [newCategory, setNewCategory] = useState<string>("");

  const [newItem, setNewItem] = useState<NewItem>({} as NewItem);

  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    (async () => {
      setLoading(true);

      Promise.all([
        api.get(
          `/itemCategories?filters=[{"field": "truck_id", "operation": "=", "value": "${signedTruck.id}"}]`
        ),
        api.get(
          `/items?filters=[{"field": "truck_id", "operation": "=", "value": "${signedTruck.id}"}]`,
          {
            headers: {
              relationships: '["itemCategory"]',
            },
          }
        ),
      ]).then((resp) => {
        setCategories(resp[0].data);

        setItems(
          resp[1].data.map((item: any) => ({
            ...item,
            itemCategoryText: item.itemCategory ? item.itemCategory.name : null,
          }))
        );

        setLoading(false);
      });
    })();
  }, []);

  const handleAddNewCategory = useCallback(async () => {
    if (!newCategory) {
      toast.show({
        placement: "top",
        title: "Ops!",
        status: "error",
        description: "Adicione o nome de uma categoria",
      });
      return;
    }

    await api
      .post("/itemCategory", {
        name: newCategory,
        truck_id: signedTruck.id,
      })
      .then((resp) => {
        setCategories([...categories, resp.data]);

        toast.show({
          placement: "top",
          title: "Sucesso",
          status: "success",
          description: "Categoria adicionada com sucesso",
        });

        setNewCategory("");
      })
      .catch((error) => {
        toast.show({
          placement: "top",
          title: "Ops!",
          status: "error",
          description: "Não foi possível adicionar nova categoria",
        });
      });
  }, [newCategory, categories, toast]);

  const handleRemoveCategory = useCallback(
    async (categoryId: string) => {
      await api
        .delete(`/itemCategory/${categoryId}`)
        .then((resp) => {
          const filteredCategory = categories.filter(
            (c) => c.id !== categoryId
          );

          setCategories(filteredCategory);

          toast.show({
            placement: "top",
            title: "Sucesso",
            status: "success",
            description: "Categoria removida com sucesso",
          });

          return;
        })
        .catch((error) => {
          toast.show({
            placement: "top",
            title: "Ops!",
            status: "error",
            description: "Não foi possível remover a categoria",
          });
          return;
        });
    },
    [categories, toast]
  );

  const handleAddNewItem = useCallback(async () => {
    const { name, description, price, itemCategory } = newItem;

    if (!name && !description && !price) {
      toast.show({
        placement: "top",
        title: "Ops!",
        status: "error",
        description: "Adicione os dados para adicionar um novo item",
      });
      return;
    }

    const priceFormatted = Number(
      parseFloat(price.replace(",", ".")).toFixed(2)
    );

    const itemToAdd = {
      name,
      description,
      price: priceFormatted,
      item_category_id: itemCategory === "DEFAULT" ? null : itemCategory,
    };

    await api
      .post(`/item`, itemToAdd, {
        headers: {
          relationships: '["itemCategory"]',
        },
      })
      .then((resp) => {
        const formattted = {
          ...resp.data,
          itemCategoryText: resp.data.itemCategory
            ? resp.data.itemCategory.name
            : null,
        };

        setItems([...items, formattted]);
        toast.show({
          placement: "top",
          title: "Sucesso",
          status: "success",
          description: "Novo Item adicionado",
        });
        setNewItem({
          name: "",
          description: "",
          price: "",
          itemCategory: "",
        });

        setModalItemsVisible(!modalItemsVisible);
      })
      .catch((err) => {
        toast.show({
          placement: "top",
          title: "Ops!",
          status: "error",
          description: "Não foi possível adicionar novo item",
        });
      });
  }, [newItem, toast, items, categories, modalItemsVisible]);

  const handleRemoveItem = useCallback(
    async (itemId: string) => {
      await api
        .delete(`/item/${itemId}`)
        .then((resp) => {
          const itemsFiltered = items.filter((item) => item.id !== itemId);
          setItems(itemsFiltered);
          toast.show({
            placement: "top",
            title: "Sucesso",
            status: "success",
            description: "Item removido",
          });

          return;
        })
        .catch((error) => {
          toast.show({
            placement: "top",
            title: "Ops!",
            status: "error",
            description: "Não foi possível remover o item",
          });

          return;
        });
    },
    [toast, items]
  );

  return (
    <>
      <View style={[styles.card]}>
        <View style={styles.cardWithCols}>
          <TouchableOpacity
            style={styles.buttonItems}
            activeOpacity={0.9}
            onPress={() => {
              setModalItemsVisible(!modalItemsVisible);
            }}
          >
            <MaterialIcons name="add" size={20} color="#fff" />
            <Text style={styles.buttonItemsText}>Item</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonItems}
            activeOpacity={0.9}
            onPress={() => {
              setModalCategoryVisible(!modalCategoryVisible);
            }}
          >
            <MaterialIcons name="add" size={20} color="#fff" />
            <Text style={styles.buttonItemsText}>Categoria</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.itemsContainer}>
          <FlatList
            data={items}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(items) => String(items.id)}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                activeOpacity={0.9}
                delayLongPress={500}
                onLongPress={() => {
                  handleRemoveItem(item.id);
                }}
              >
                <View style={styles.itemTitle}>
                  <Text style={styles.itemTitleText}>{item.name}</Text>
                  {item.itemCategoryText && (
                    <View style={styles.itemCategory}>
                      <Text style={styles.itemCategoryText}>
                        {String(item.itemCategoryText).toLowerCase()}
                      </Text>
                    </View>
                  )}
                </View>

                <Text style={styles.itemDesc}>
                  {doTruncarStr(item.description, 20)}
                </Text>
                <View style={styles.itemPrice}>
                  <Text style={styles.itemPriceText}>
                    {formatCurrency(item.price)}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>

      <ModalNative
        isOpen={modalCategoryVisible}
        onClose={() => {
          setModalCategoryVisible(!modalCategoryVisible);
          setNewCategory("");
        }}
        avoidKeyboard
      >
        <ModalNative.Content>
          <ModalNative.CloseButton />
          <ModalNative.Header>Categoria de Itens</ModalNative.Header>
          <ModalNative.Body>
            <TextInput
              style={styles.input}
              placeholder="Nome da Categoria"
              placeholderTextColor="#7a7979"
              onChangeText={(text) => {
                setNewCategory(text);
              }}
              value={newCategory}
            />
            <TouchableOpacity
              style={[styles.buttonAddNewCategory]}
              activeOpacity={0.9}
              onPress={handleAddNewCategory}
            >
              <MaterialIcons name="add" size={22} color="#0f3d20" />
            </TouchableOpacity>

            <Text style={[styles.schedulesTextModal, { marginTop: 20 }]}>
              Categoria de Itens
            </Text>

            <View style={[styles.categoriesContainer]}>
              <FlatList
                data={categories}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(categories) => String(categories.id)}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.category}
                    activeOpacity={0.9}
                    delayLongPress={500}
                    onLongPress={() => {
                      handleRemoveCategory(item.id);
                    }}
                  >
                    <Text style={styles.categoryName}>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </ModalNative.Body>
        </ModalNative.Content>
      </ModalNative>

      <ModalNative
        isOpen={modalItemsVisible}
        onClose={() => setModalItemsVisible(!modalItemsVisible)}
        avoidKeyboard
      >
        <ModalNative.Content>
          <ModalNative.CloseButton />
          <ModalNative.Header>Novo Item</ModalNative.Header>
          <ModalNative.Body>
            <VStack space={3}>
              <Text style={styles.label}>Nome do Item</Text>
              <Input
                h="45px"
                placeholder="Nome do Item"
                placeholderTextColor="#7a7979"
                onChangeText={(text) => {
                  setNewItem({ ...newItem, name: text });
                }}
                value={newItem.name}
              />

              <Text style={styles.label}>Descrição do Item</Text>
              <Input
                h="45px"
                placeholder="Descrição do Item"
                placeholderTextColor="#7a7979"
                onChangeText={(text) => {
                  setNewItem({ ...newItem, description: text });
                }}
                value={newItem.description}
              />

              <Text style={styles.label}>Preço do Item</Text>
              <Input
                h="45px"
                placeholder="Preço do Item: 22,00"
                placeholderTextColor="#7a7979"
                onChangeText={(text) => {
                  setNewItem({ ...newItem, price: text });
                }}
                value={newItem.price}
              />

              {!isEmpty(categories) && (
                <>
                  <Text style={styles.label}>Categoria do Item</Text>

                  <Select
                    h="45px"
                    selectedValue={newItem.itemCategory}
                    minWidth="200"
                    accessibilityLabel="Escolha uma categoria"
                    placeholder="Escolha uma categoria"
                    mt={1}
                    onValueChange={(itemValue) =>
                      setNewItem({ ...newItem, itemCategory: itemValue })
                    }
                  >
                    <Select.Item
                      label="Sem categoria"
                      value="DEFAULT"
                      key="DEFAULT"
                    />

                    {categories.map((item, index) => (
                      <Select.Item
                        label={item.name}
                        value={item.id}
                        key={index}
                      />
                    ))}
                  </Select>
                </>
              )}

              <TouchableOpacity
                style={[styles.buttonEdit, { marginTop: 30 }]}
                activeOpacity={0.9}
                onPress={handleAddNewItem}
              >
                <MaterialIcons name="save" size={14} color="#0f3d20" />

                <Text style={styles.buttonEditText}>Salvar</Text>
              </TouchableOpacity>
            </VStack>
          </ModalNative.Body>
        </ModalNative.Content>
      </ModalNative>
    </>
  );
};

export default TruckItemsCategories;
