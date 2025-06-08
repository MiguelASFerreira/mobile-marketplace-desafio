import React, { useEffect, useMemo, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Image, Linking } from "react-native";
import {
  Container,
  Content,
  Header,
  BackButton,
  Title,
  ProductImage,
  ProductTitle,
  ProductPrice,
  Description,
  InfoText,
  Category,
  Card,
  CardText,
  Footer,
  FooterPrice,
  ContactButton,
  ContactButtonText,
} from "./styles";
import { ArrowLeft, BarChart3 } from "lucide-react-native";
import { showToast } from "@utils/toast";
import type { Product } from "@api/get-all-products";
import { getProductDetails } from "@api/get-product-details";
import { getCountViewsProduct } from "@api/get-count-views-product";
import { Loading } from "@components/Loading";

type RouteParamsProps = {
  productId: string;
};

export function Product() {
  const route = useRoute();
  const navigation = useNavigation();
  const [product, setProduct] = useState<Product>({} as Product);
  const [viewProduct, setViewProduct] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const { productId } = route.params as RouteParamsProps;

  async function fetchProductDetails() {
  setIsLoading(true);

  try {
    const [productResponse, viewsResponse] = await Promise.all([
      getProductDetails(productId),
      getCountViewsProduct(productId),
    ]);

    setProduct(productResponse.product);
    setViewProduct(viewsResponse.amount);
  } catch (error) {
    showToast("error", "Erro ao carregar os detalhes do produto");
  } finally {
    setIsLoading(false);
  }
}

function handleBack() {
  navigation.goBack();
}

function handlePhoneContact() {
    const phoneNumber = `55${product.owner.phone.replace(/\D/g, '')}`
    const message = encodeURIComponent(
      `Olá, ${product.owner.name}! Estou interessado no produto "${product.title}"!`,
    )
    const whatsAppUrl = `https://wa.me/${phoneNumber}?text=${message}`

    Linking.openURL(whatsAppUrl).catch(() => {
      showToast("error", "Erro ao abrir o WhatsApp");
    })
  }


  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  const productUrl = useMemo(() => {
    const image = product?.attachments?.[0]?.url?.split("/attachments/")[1];
    return image
      ? `${process.env.EXPO_PUBLIC_API_URL}/attachments/${image}`
      : undefined;
  }, [product]);


  if (isLoading) {
  return <Loading />;
}


  return (
    <Container>
      <Content>
        <Header>
          <BackButton onPress={handleBack}>
            <ArrowLeft size={20} color="#F2400D" />
          <Title>Voltar</Title>
          </BackButton>
        </Header>

        <ProductImage
          source={{
            uri: productUrl,
          }}
          resizeMode="cover"
        />

        <ProductTitle>{product.title}</ProductTitle>
        <ProductPrice>R$ {product.priceInCents / 100}</ProductPrice>

        <Description>
          {product.description || "Nenhuma descrição disponível."}
        </Description>

        <Category>
          Categoria{"\n"}
          <Category>{product.category.title}</Category>
        </Category>

        <Card>
          <BarChart3 size={20} color="#009CF0" />
          <CardText>
            <TextHighlight>{viewProduct} pessoas</TextHighlight> visualizaram
            este produto nos últimos 7 dias
          </CardText>
        </Card>
      </Content>

      <Footer>
        <FooterPrice>R$ {product.priceInCents / 100}</FooterPrice>
        <ContactButton>
          <ContactButtonText onPress={handlePhoneContact}>
            Entrar em contato{"\n"} com {product.owner.name}
          </ContactButtonText>
        </ContactButton>
      </Footer>
    </Container>
  );
}

const TextHighlight = ({ children }: { children: React.ReactNode }) => (
  <Category style={{ fontWeight: "bold" }}>{children}</Category>
);
