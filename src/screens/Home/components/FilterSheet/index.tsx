import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useCallback,
  useMemo,
} from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView
} from "@gorhom/bottom-sheet";
import { X } from "lucide-react-native";

import { Container, Header, Title, CloseButton } from "./styles";

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
  (_props, ref) => {
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

    return (
      <BottomSheet
        ref={bottomSheetModalRef}
        index={-1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: "white" }}
        handleIndicatorStyle={{ backgroundColor: "#ccc", width: 50 }}
      >
        <BottomSheetScrollView>
          <Container>
            <Header>
              <Title>Filtrar anúncios</Title>
              <CloseButton
                onPress={handleClose}
              >
                <X size={20} color="#666" />
              </CloseButton>
            </Header>
          </Container>
        </BottomSheetScrollView>
      </BottomSheet>
    );
  }
);
