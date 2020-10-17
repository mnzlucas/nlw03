import React, { useEffect , useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import  MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { useNavigation , useFocusEffect } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import mapMarker from '../images/map-marker.png';

import api from '../services/api';

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export default function OrphanagesMap() {

    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
    const navigation = useNavigation();

    useFocusEffect( () => {
      api.get('orphanages').then(response => {
        setOrphanages(response.data);
      });
    });

    function handleNavigateToCreateOrphanage() {
      navigation.navigate('SelectMapPosition');
    
    }
    function handleNavigateToOrphanageDetails(id: number) {
        navigation.navigate('OrphanagesDetails', { id });

    }
    function handleNavigateToSearchOrphanages() {
        navigation.navigate('SearchOrphanages');

    }

    
    return ( 
    <View style={styles.container}>
      <MapView 
        provider={PROVIDER_GOOGLE}
        style={styles.map} initialRegion={{
          latitude: -23.1805368,
          longitude: -46.9128759,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05, 
        }} > 
         {orphanages.map(orphanage => {

        return (
          <Marker 
          key={orphanage.id}
          icon={mapMarker}
          calloutAnchor= {{
            x: 2.7,
            y: 0.8,
          }}
          coordinate= {{ 
            latitude: orphanage.latitude,
            longitude: orphanage.longitude,
          }}>
            <Callout tooltip onPress= {() => handleNavigateToOrphanageDetails(orphanage.id)} >
              <View style={styles.calloutContainer}> 
                <Text style={styles.calloutText}> {orphanage.name} </Text>
              </View>
            </Callout>
          </Marker>
        );
      })}

      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText} > {orphanages.length} Orfanatos Encontrados </Text>

        <RectButton style={styles.createOrphanageButton} onPress={handleNavigateToCreateOrphanage} > 
          <Feather name= "plus"  size= { 20 } color="#FFF" />
        </RectButton>
      </View>

      <View style={styles.containerSearch}>
        <Text style={styles.containerSearchText}> Pesquisar Orfanatos </Text>

        <RectButton style={styles.searchOrphanagesButton} onPress={handleNavigateToSearchOrphanages} > 
          <Feather name= "search"  size= { 20 } color="#FFF" />
        </RectButton>
      </View>

    </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    }, 
  
    calloutContainer: {
      width: 160,
      height: 46,
      paddingHorizontal: 16,
      backgroundColor: 'rgba(255 , 255, 255, 0.8)',
      borderRadius: 16,
      justifyContent: 'center',
  
    },
  
    calloutText: {
      color: '#0089a5',
      fontSize: 14,
      fontFamily: 'Nunito_700Bold', 
  
    },
  
    footer: {
      position: 'absolute',
      left: 24,
      right: 24,
      bottom: 32,
  
      backgroundColor: '#FFF',
      borderRadius: 20,
      height: 56,
      paddingLeft: 24,
  
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  
      elevation: 10,
    },
  
    footerText: {
      fontFamily: 'Nunito_700Bold', 
      color: '#8fa7b3',
  
    },
  
    createOrphanageButton: {
      width: 56,
      height: 56,
      backgroundColor: '#15c3d6',
      borderRadius: 20,
  
      justifyContent: 'center',
      alignItems: 'center',
    },
    searchOrphanagesButton: {
      width: 56,
      height: 56,
      backgroundColor: '#15c3d6',
      borderRadius: 20,
  
      justifyContent: 'center',
      alignItems: 'center',
    },
    containerSearch: {
      position: 'absolute',
      left: 24,
      right: 24,
      bottom: 580,
  
      backgroundColor: '#FFF',
      borderRadius: 20,
      height: 56,
      paddingLeft: 24,
  
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  
      elevation: 10,
    },
  
    containerSearchText: {
      fontFamily: 'Nunito_700Bold', 
      color: '#8fa7b3',
  
    },
  });
