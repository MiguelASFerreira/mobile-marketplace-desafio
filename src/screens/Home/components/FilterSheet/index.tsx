import {
  forwardRef,
  useRef,
  useImperativeHandle,
  useCallback,
  useMemo,
  useState,
  useEffect,
} from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { X } from "lucide-react-native";

import {
  Container,
  Header,
  Title,
  CloseButton,
  Content,
  Column,
  CategorySection,
  FilterLabel,
  CategoryList,
  Footer,
  CategoryItem,
  CategoryName,
  StyledCheckbox,
} from "./styles";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { showToast } from "@utils/toast";
import { Category, getCategories } from "@api/get-categories";
import { Loading } from "@components/Loading";

export type FilterBottomSheetRefProps = {
  open: () => void;
  close: () => void;
};

type Props = {
  onApplyFilters?: (filters: FilterData) => void;
};

export type FilterData = {
  minValue: string;
  maxValue: string;
  categories: string[];
};

export const FilterBottomSheet = forwardRef<FilterBottomSheetRefProps, Props>(
  ({ onApplyFilters }, ref) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoadingCategories, setIsLoadingCategories] = useState(true);
    const [minValue, setMinValue] = useState("");
    const [maxValue, setMaxValue] = useState("");

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const bottomSheetModalRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ["60%"], []);

    const handleOpen = useCallback(() => {
      bottomSheetModalRef.current?.expand();
    }, []);

    const handleClose = useCallback(() => {
      bottomSheetModalRef.current?.close();
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        open: handleOpen,
        close: handleClose,
      }),
      [handleOpen, handleClose]
    );

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      ),
      []
    );

    function handleSelectCategory(categoryId: string) {
      setSelectedCategories((prev) => {
        if (prev.includes(categoryId)) {
          return prev.filter((id) => id !== categoryId);
        } else {
          return [...prev, categoryId];
        }
      });
    }

    function handleClearFilters() {
      setMinValue("");
      setMaxValue("");
      setSelectedCategories([]);
      handleClose();
    }

    function handleApplyFilters() {
      if (onApplyFilters) {
        onApplyFilters({
          minValue,
          maxValue,
          categories: selectedCategories,
        });
      }
      handleClose();
    }

    useEffect(() => {
      async function fetchCategories() {
        try {
          setIsLoadingCategories(true);
          const response = await getCategories();
          setCategories(response);
          setIsLoadingCategories(false);
        } catch (error) {
          setIsLoadingCategories(false);
          showToast("error", "Erro ao carregar categorias");
        } finally {
          setIsLoadingCategories(false);
        }
      }
      fetchCategories();
    }, []);

    return (
      <BottomSheet
        ref={bottomSheetModalRef}
        index={-1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: "white" }}
        enableContentPanningGesture={false}
        enableHandlePanningGesture={true}
        handleIndicatorStyle={{ backgroundColor: "#ccc", width: 50 }}
      >
        <BottomSheetScrollView>
          <Container>
            <Header>
              <Title>Filtrar anúncios</Title>
              <CloseButton onPress={handleClose}>
                <X size={20} color="#666" />
              </CloseButton>
            </Header>

            <Content>
              <Column>
                <FilterLabel>Valor</FilterLabel>
                <Input
                  label=" "
                  placeholder="De"
                  keyboardType="numeric"
                  value={minValue}
                  onChangeText={setMinValue}
                />
              </Column>

              <Column>
                <FilterLabel></FilterLabel>
                <Input
                  label=" "
                  placeholder="Até"
                  keyboardType="numeric"
                  value={maxValue}
                  onChangeText={setMaxValue}
                />
              </Column>
            </Content>

            <CategorySection>
              <FilterLabel>Categoria</FilterLabel>
              {isLoadingCategories ? (
                <Loading />
              ) : (
                <CategoryList>
                  {categories.map((category) => (
                    <CategoryItem
                      key={category.id}
                      activeOpacity={0.8}
                      onPress={() => handleSelectCategory(category.id)}
                    >
                      <StyledCheckbox
                        value={selectedCategories.includes(category.id)}
                        onValueChange={() => handleSelectCategory(category.id)}
                      />
                      <CategoryName>{category.title}</CategoryName>
                    </CategoryItem>
                  ))}
                </CategoryList>
              )}
            </CategorySection>

            <Footer>
              <Button
                title="Limpar filtro"
                variant="outline"
                style={{ flex: 1 }}
                onPress={handleClearFilters}
              />
              <Button
                title="Filtrar"
                variant="solid"
                style={{ flex: 1 }}
                onPress={handleApplyFilters}
              />
            </Footer>
          </Container>
        </BottomSheetScrollView>
      </BottomSheet>
    );
  }
);
