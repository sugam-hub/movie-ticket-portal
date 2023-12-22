import React from 'react';
import { Text, View, StyleSheet, StatusBar, ScrollView, ActivityIndicator } from 'react-native';
import AppHeader from '../components/AppHeader';
import { COLORS, SPACING } from '../theme/theme';
import { useQuery } from 'react-query';
import { getAllTickets } from '../api/ticket/ticket';
import { useFocusEffect } from '@react-navigation/native';

const TicketScreen = ({navigation, route}: any) => {

  const {data: ticketData, isLoading, isError, refetch} = useQuery("ticketData", getAllTickets, {
    staleTime: 3000,
  });

  useFocusEffect(
    React.useCallback(()=> {
      refetch();
    }, [refetch])
  )

  if(isLoading){
    return (
      <ActivityIndicator />
    )
  }

  if(ticketData == undefined || ticketData == null){
    return (
      <View style={styles.container}> 
        <StatusBar hidden />
        <View style={styles.appHeaderContainer}>
          <AppHeader
            name="close"
            header={'My Tickets'}
            action={() => navigation.goBack()}
          />  
          <Text>No tickets available</Text>
      </View>
    </View>
    )
  }
  
  return (
    <ScrollView style={styles.container}> 
        <StatusBar hidden />
        <View style={styles.appHeaderContainer}>
          <AppHeader
            name="close"
            header={'My Tickets'}
            action={() => navigation.goBack()}
            />  
      </View>
    
      {ticketData && ticketData.data.map((item: any)=> (
        <View style={styles.ticketContainer} key={item.id}> 
          <React.Fragment key={item.id}>
            <Text style={styles.ticketText}>Movie Name: {item.movie_name}</Text>
            <Text style={styles.ticketText}>Seat Number: {item.seat_number}</Text>
            <Text style={styles.ticketText}>Date: {item.date}</Text>
            <Text style={styles.ticketText}>Time: {item.time}</Text>
          </React.Fragment>
        </View>
      ))}
    </ScrollView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flex: 1,
      backgroundColor: COLORS.Black,
    },
    appHeaderContainer: {
      marginHorizontal: SPACING.space_2,
      marginTop: SPACING.space_20 ,
    },
    ticketContainer: {
      height: "auto",
      width: "auto",
      backgroundColor: COLORS.Black,
      padding: 5,
      margin: 10,
      borderRadius: 8,
      borderColor: '#ccc',
      borderWidth: 1,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 3,
    },
    ticketText: {
      fontSize: 16,
      marginBottom: 5,
    },
  });

export default TicketScreen;