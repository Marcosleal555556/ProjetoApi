import React, { useState } from "react";

// Importa o básico para o código funcionar
import { View, TextInput, Text, TouchableOpacity } from "react-native";

// Requisições HTTP
import axios from "axios";

// Importa a estilizaçao
import { styles } from "./src/styles/Style";

// Armazena as informações inseridas
const App = () => {
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState(null);

  // Definir a função, o async indica que esta função vai lidar com operações assíncronas.
  const fetchAddress = async () => {
    // O código será executado, se algo der errado,será lidado no catch
    try {
      // Solicitação HTTP. O await pausa a execução até que a solicitação seja concluída.
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      // O resultado é armazenado na variável response.
      setAddress(response.data);
    } catch (error) {
      // Variável que contém informações se teve erro.
      console.error("Error fetching address:", error);
      setAddress(null);
    }
  };

  return (
    // Parte visual do código
    <View style={styles.container}>
      <View style={styles.digite}>
        {/* Input para preencher e armazenar o cep inserido */}
        <TextInput
          placeholder="Digite o CEP"
          value={cep}
          onChangeText={setCep}
          keyboardType="numeric"
          
        />

        {/* Botão que inicializa a funçao fetchAdress */}
        <TouchableOpacity style={styles.touch} onPress={fetchAddress}>
          {/* Estilização do botão */}
          <Text
            style={{ fontSize: 25, backgroundColor: "red", color: "white", widht: 10, height: 25,  }}
          >
            Encontrar
          </Text>
        </TouchableOpacity>
        </View>
      

      {/* Após o botão ser clicado, retorna os resultados da função fetcAddress */}
      {address && (


        <View style={styles.resultados}>
          <Text>CEP: {address.cep}</Text>
          <Text>Rua: {address.logradouro}</Text>
          <Text>Bairro: {address.bairro}</Text>
          <Text>Cidade: {address.localidade}</Text>
          <Text>Estado: {address.uf}</Text>
        </View>
      )}
    </View>
  );
};

export default App;
