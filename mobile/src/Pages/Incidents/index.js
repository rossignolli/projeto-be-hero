import React, { useState, useEffect } from "react";
import { View, FlatList, Image, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import logoImg from "../../assets/logo.png";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import api from "../../services/api";

export default function Incidents() {

  const navigation = useNavigation();
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  
  function navigateToDetail(incident) {
    navigation.navigate("Detail", {incident});
  }

  async function loadIncidents() {

    if (loading){
      return;
    }


    if (total > 0 && incidents.length === total){
      return;
    }

    setLoading(true);
    const response = await api.get('incidents', {params: {page}});
    setIncidents([...incidents, ...response.data]); //SEMANA OMIN STACK 11 ANEXAR VETORES VIDEO 4 TEMPO:1:23:32
    setTotal(response.headers['x-total-count']);
    setPage(page+1)
    setLoading(false);
  }

  useEffect(() => {
    loadIncidents();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de <Text styles={styles.headerTextBold}> {total} casos</Text>.
        </Text>
      </View>
      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.description}>
        Escolha um dos casos abaixo e salve o dia
      </Text>

      <FlatList
        data={incidents}
        style={styles.incidentList}
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({ item: incident }) => (
          <View style={styles.Incident}>
            <Text style={styles.IncidentProperty}>ONG:</Text>
            <Text style={styles.IncidentValue}>{incident.name}</Text>
            <Text style={styles.IncidentProperty}>CASO:</Text>
            <Text style={styles.IncidentValue}>{incident.description}</Text>
            <Text style={styles.IncidentProperty}>VALOR:</Text>
            <Text style={styles.IncidentValue}>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</Text>
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => navigateToDetail(incident)}
            >
              <Text style={styles.detailsText}>Ver mais</Text>
              <Feather name="arrow-right" size={16} color="#e02041" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
