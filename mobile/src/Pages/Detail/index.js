import React from "react";
import { Text, View, Image, TouchableOpacity, Linking } from "react-native";
import logoImg from "../../assets/logo.png";
import styles from "./styles";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as MailCompose from 'expo-mail-composer'


export default function Detail() {
      const route = useRoute();
      const incident = route.params.incident;
      const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso ${incident.title} com o valor de ${Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)} reais`
      const navigation = useNavigation();


 

      function navigateBack() {
            navigation.goBack();
          }

          function sendMail (){
                MailCompose.composeAsync({
                      subject: `Voce está sendo o heroi do caso ${incident.title}`,
                      recipients: [incident.email],
                      body: message,
                })

          }

          function sendWhatsapp (){
                Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`)

      }

          
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <TouchableOpacity onPress={navigateBack}>
              <Feather name="arrow-left" size={28} color="#E82041"/>
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
      <Text style={[styles.IncidentProperty], {marginTop: 0,  fontWeight: 'bold'}}>ONG:</Text>
      <Text style={styles.IncidentValue}>{incident.name} de {incident.city}/{incident.uf} </Text>
      <Text style={styles.IncidentProperty}>CASO:</Text>
      <Text style={styles.IncidentValue}>{incident.description}</Text>
      <Text style={styles.IncidentProperty}>VALOR:</Text>
      <Text style={styles.IncidentValue}>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</Text>
      </View>
      <View style={styles.contactBox}>
            <Text style={styles.heroTitle}>Salve o dia!</Text>
            <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>
            <Text style={styles.heroDescription}>Entre em contato:</Text>

            <View style={styles.actions}>
                  <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>WhatsaApp</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>Email</Text>
                  </TouchableOpacity>
            </View>



      </View>
    </View>
  );
}
