import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Funnel, Search } from "lucide-react-native";
import {
  Container,
  Header,
  ProfileImage,
  ProfileName,
  ProfileContent,
  ProfileView,
  ProfileViewText,
  SearchTitle,
  SearchContent,
  FilterButton,
  InputWrapper,
} from "./styles";
import { useTheme } from "styled-components/native";
import { Input } from "@components/Input";
import { FlatList, Text } from "react-native";
import { ProductCard } from "./components/ProductCard";
import {
  FilterBottomSheet,
  FilterBottomSheetRefProps,
  FilterData,
} from "./components/FilterSheet";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { useAuth } from "@hooks/useAuth";
import defaultUserPhotoImg from "@assets/userPhotoDefault.png";
import { getAllProducts, Product } from "@api/get-all-products";
import { showToast } from "@utils/toast";
import { Loading } from "@components/Loading";

export function Home() {
  const { seller } = useAuth();
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const theme = useTheme();
  const image = seller?.avatar?.url?.split("/attachments/")[1] ?? undefined;
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<FilterData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const filterBottomSheetRef = useRef<FilterBottomSheetRefProps>(null);

  function handleOpenFiltersModal() {
    filterBottomSheetRef.current?.open();
  }

  function handleApplyFilters(filters: FilterData) {
    setFilters(filters);
  }

  function handleProfile() {
    navigation.navigate("profile");
  }

  function handleSearch(text: string) {
    setSearchQuery(text);
  }

  async function fetchProducts() {
    try {
      setIsLoading(true);

      const params = new URLSearchParams();

      if (searchQuery) {
        params.append("search", searchQuery);
      }

      if (filters) {
        if (filters.minValue) {
          params.append("minPrice", filters.minValue);
        }

        if (filters.maxValue) {
          params.append("maxPrice", filters.maxValue);
        }

        if (filters.categories && filters.categories.length > 0) {
          filters.categories.forEach((categoryId: string) => {
            params.append("categoryId", categoryId);
          });
        }
      }

      const query = params.toString() ? `?${params.toString()}` : "";
      const response = await getAllProducts({ query });

      setProducts(response.products);
    } catch (error) {
      showToast(
        "error",
        "Erro ao buscar produtos",
        "Tente novamente mais tarde."
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [filters, searchQuery]);

  const avatarUrl = useMemo(() => {
    const image = seller?.avatar?.url?.split("/attachments/")[1];
    return image
      ? `${process.env.EXPO_PUBLIC_API_URL}/attachments/${image}`
      : undefined;
  }, [seller]);

  return (
    <>
      <Container>
        <Header>
          <ProfileImage
            source={
              avatarUrl
                ? {
                    uri: avatarUrl,
                  }
                : defaultUserPhotoImg
            }
          />

          <ProfileContent>
            <ProfileName>Olá, {seller.name}!</ProfileName>
            <ProfileView onPress={handleProfile}>
              <ProfileViewText>Ver perfil</ProfileViewText>
              <ArrowRight size={16} color={theme.COLORS.ORANGE_BASE} />
            </ProfileView>
          </ProfileContent>
        </Header>

        <SearchTitle>Explore produtos</SearchTitle>
        <SearchContent>
          <InputWrapper>
            <Input
              placeholder="Pesquisar"
              LeftIcon={Search}
              value={searchQuery}
              onChangeText={handleSearch}
            />
          </InputWrapper>

          <FilterButton onPress={handleOpenFiltersModal}>
            <Funnel size={20} color={theme.COLORS.ORANGE_BASE} />
          </FilterButton>
        </SearchContent>

        {isLoading ? (
          <Loading />
        ) : (
          <FlatList
            data={products}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ProductCard
                product={item}
                onPress={() =>
                  navigation.navigate("product", { productId: item.id })
                }
              />
            )}
            contentContainerStyle={{ paddingBottom: 100, paddingTop: 16 }}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: "space-between",
              paddingBottom: 12,
              gap: 8,
            }}
            style={{ paddingBottom: 12 }}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <Text style={{ textAlign: "center", marginTop: 24 }}>
                Nenhum produto encontrado.
              </Text>
            }
          />
        )}
      </Container>
      <FilterBottomSheet
        ref={filterBottomSheetRef}
        onApplyFilters={handleApplyFilters}
      />
    </>
  );
}
