import { Header } from "@/components/header";
import { ProductCartProps, useCartStore } from "@/stores/cart-store";
import { View, Text, ScrollView, Alert, Linking } from "react-native";
import { Product } from "@/components/product";
import { formatCurrency } from "@/utils/functions/formatCurrency";
import { Input } from "@/components/input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button } from "@/components/button";
import { Feather } from "@expo/vector-icons";
import { LinkButton } from "@/components/link-button";
import { useState } from "react";
import { useNavigation } from "expo-router";


const PHONE_NUMBER = "5579991512933"

export default function Cart() {
    const [address, setAddress] = useState("")
    const cartStore = useCartStore();
    const navigation = useNavigation();

    const total = formatCurrency(cartStore.products.reduce((total, product) => total + product.price * product.quantity, 0))

    function handleProductRemove(product: ProductCartProps) {
        Alert.alert('Remover', `Deseja remover ${product.title} do carrinho?`, [
            {
                text: "Cancelar",
            },
            {
                text: "Remover",
                onPress: () => cartStore.remove(product.id)
            }
        ])

    }

    function handleOrder() {
        if (address.trim().length === 0) {
            return Alert.alert("Pedido", "Informe o endereço de entrega.")
        }

        const products = cartStore.products.map((product) => `\n ${product.quantity} ${product.title}`).join("")

        const message = `
        🍔 NOVO PEDIDO
        \n Entregar em: ${address}

        ${products}

        \n Valor total: ${total}        
        `
        Linking.openURL(`http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`)
        cartStore.clear()
        navigation.goBack()
    }

    return (
        <View className="flex-1 pt-8">
            <Header title="Seu carrinho"></Header>
            <KeyboardAwareScrollView>
                <ScrollView>
                    <View className="p-5 flex-1">
                        {cartStore.products.length > 0 ? (
                            <View className="border-b border-slate-700">
                                {cartStore.products.map((product) => (
                                    <Product key={product.id} data={product} onPress={() => handleProductRemove(product)} />
                                ))}
                            </View>
                        ) : (
                            <Text className="font-body  text-slate-400 text-center my-8">
                                Seu carrinho está vazio
                            </Text>
                        )}



                        <View className="flex-row gap-2 items-center mt-5 mb-4 mx-3">
                            <Text className="text-white text-2xl font-heading ">Total: </Text>
                            <Text className="text-lime-400 text-2xl font-heading">{total}</Text>
                        </View>

                        <Input placeholder="Digite seu endereço com rua, número, bairro, complemento  e CEP... " onChangeText={setAddress} />

                    </View>
                </ScrollView>
            </KeyboardAwareScrollView>

            <View className="p-5 gap-5">
                <Button onPress={handleOrder}>
                    <Button.Text>Enviar Pedido</Button.Text>
                    <Button.Icon>
                        <Feather name="arrow-right-circle" size={20} />
                    </Button.Icon>
                </Button>
                <LinkButton title="Voltar ao cardápio" href="/" />
            </View>
        </View>
    )
}