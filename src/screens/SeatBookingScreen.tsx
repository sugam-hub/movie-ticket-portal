import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet, ScrollView, StatusBar, ImageBackground,TouchableOpacity, FlatList, ToastAndroid, ActivityIndicator } from 'react-native';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import LinearGradient from 'react-native-linear-gradient';
import AppHeader from '../components/AppHeader';
import CustomIcon from '../components/CustomIcon';
import EncryptedStorage from 'react-native-encrypted-storage';
import { useMutation, useQuery } from 'react-query';
import { BookTicket, getAllTickets } from '../api/ticket/ticket';

const timeArray: string[] = [
  "10:30",
  "12:30",
  "14:30",
  "15:00",
  "19:30",
  "21:00",
];

const generateDate = () => {
  const date = new Date();
  let weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let weekdays = [];
  for(let i=0; i < 7; i++){
    let temDate = {
      date: new Date(date.getTime() + i *24*60*60*1000).getDate(),
      day: weekday[new Date(date.getTime() + i *24*60*60*1000).getDay()],
    }
    weekdays.push(temDate);
  }
  return weekdays;
}


const SeatBookingScreen = ({navigation, route}: any) => {

  const generateSeats = () => {
    let numRow = 8;
    let numCol = 3;
    let rowArray = [];
    let start = 1;
    let reachnine = false;
  
    for(let i = 0; i < numRow; i++){
      let columnArray = [];
      for (let j=0; j < numCol; j++){
        let seatObject = {
          number: start,
          // taken: Boolean(Math.round(Math.random())),
          taken: 0,
          selected: false,
        }
        columnArray.push(seatObject);
        start++;
      }
      if(i==3){
        numCol += 2;
      }
      if(numCol < 9 && !reachnine){
        numCol += 2;
      }else{
        reachnine = true;
        numCol -= 2;
      }
      columnArray.sort((a, b) => a.number - b.number);
      rowArray.push(columnArray);
    }
    return rowArray;
  };
  const [dateArray, setDateArray] = useState<any[]>(generateDate());
  const [selectedDateIndex, setSelectedDateIndex] = useState<any>()
  const [price, setPrice] = useState<number>(0)

  const [twoDSeatArray, setTwoDSeatArray] = useState<any[][]>(generateSeats());
  const [selectedSeatArray, setSelectedSeatArray] = useState([]);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState<any>();

  const mutation = useMutation(BookTicket, {
    onSuccess: () => {  
    },
    onError: (error: any) => {

    }
  })

  const {data: ticketData, isLoading, isError} = useQuery("ticketData", getAllTickets);

  if(isLoading){
    return (
      <ActivityIndicator />
    )
  }

  const selectSeat = (index: number, subindex: number, num: number) => {
    if(!twoDSeatArray[index][subindex].taken){
      let array: any = [...selectedSeatArray];
      let temp = [...twoDSeatArray];
      temp[index][subindex].selected = !temp[index][subindex].selected;
      if(!array.includes(num)){
        array.push(num);
        setSelectedSeatArray(array);
      }else{
        const tempindex = array.indexOf(num);
        if(tempindex > -1){
          array.splice(tempindex, 1);
          setSelectedSeatArray(array);
        }
      }
      setPrice(array.length * 5.0);
      setTwoDSeatArray(temp);
    }
  }

  const BookSeats = async () => {
    if(selectedSeatArray.length !== 0 && 
      timeArray[selectedTimeIndex] !== undefined && 
      dateArray[selectedDateIndex] !== undefined){
        try{
          mutation.mutate({
            movie_name: route.params.movieName,
            seat_number: selectedSeatArray.join(", "),
            date: `${dateArray[selectedDateIndex].date} ${dateArray[selectedDateIndex].day}`,
            time: timeArray[selectedTimeIndex],
            price: price,
          })
        }catch(error){
          console.log("Something went wrong while storing in bookseat functions.")
        }
        navigation.navigate("Ticket", { 
          seatArray: selectedSeatArray,
          time: timeArray[selectedTimeIndex],
          date: dateArray[selectedDateIndex],
          ticketImage: route.params.PosterImage
        });
    }else{
      ToastAndroid.showWithGravity("Please select Seats, Date and Time of the show", 
      ToastAndroid.SHORT, 
      ToastAndroid.BOTTOM);
    } 
  }
  return (
    <ScrollView style={styles.container} bounces={false} showsVerticalScrollIndicator={false}>
      <StatusBar hidden />
      <View>
        <ImageBackground source={{uri: route.params?.BgImage}} style={styles.ImageBG}>
          <LinearGradient colors={[COLORS.BlackRGB10, COLORS.Black]}
            style={styles.linearGradient}
          >
            <View style={styles.appHeaderContainer}>

            <AppHeader
              name="close"
              header={''}
              action={() => navigation.goBack()}
              />  
            </View>
          </LinearGradient>
        </ImageBackground>
        <Text style={styles.screenText}>Screen this side</Text>
      </View>

      <View style={styles.seatContainer}>
        <View style={styles.containerGap20}>
          {
            twoDSeatArray?.map((item, index) => {
              return(
                <View key={index} style={styles.seatRow}>
                  {
                    item.map((subitem, subindex)=> {
                      return (
                        <TouchableOpacity key={subitem.number} onPress={()=> {
                          selectSeat(index, subindex, subitem.number)
                        }}>
                          <CustomIcon name='seat' style={[styles.seatIcon,
                             subitem.taken ? {color: COLORS.Grey}: {}, 
                             subitem.selected ? {color: COLORS.Orange} : {}]} />
                        </TouchableOpacity>
                      )
                    })
                  }
                </View>
              )
            })
          }
        </View>
        <View style={styles.seatRadioContainer}>
          <View style={styles.radioContainer}>
            <CustomIcon name= 'radio' style={styles.radioIcon} />
            <Text style={styles.radioText}>Available</Text>
          </View>

          <View style={styles.radioContainer}>
            <CustomIcon name= 'radio' style={[styles.radioIcon, {color: COLORS.Grey}]} />
            <Text style={styles.radioText}>Taken</Text>
          </View>

          <View style={styles.radioContainer}>
            <CustomIcon name= 'radio' style={[styles.radioIcon, {color: COLORS.Orange}]} />
            <Text style={styles.radioText}>Selected</Text>
          </View>
        </View>
      </View>

      <View>
        <FlatList 
        bounces={false}
        data={dateArray} 
        keyExtractor={(item)=>item.date}
        horizontal 
        contentContainerStyle={styles.containerGap24}
        renderItem={({item, index}) => {
          return (

            <TouchableOpacity onPress={() => {
              setSelectedDateIndex(index)
            }}>
              <View style={[styles.dataContainer, index == 0 ? {marginLeft: SPACING.space_24}: index == dateArray.length -1 ? {marginRight: SPACING.space_24} : {}, index == selectedDateIndex 
              ? {backgroundColor: COLORS.Orange}: {}]}>
                <Text style={styles.dateText}>{item.date}</Text>
                <Text style={styles.dayText}>{item.day}</Text>
              </View>
            </TouchableOpacity>
          )
        }}
        />
      </View>

      <View style={styles.OuterContainer}>
        <FlatList 
        bounces={false}
        data={timeArray} 
        keyExtractor={(item)=>item}
        horizontal 
        contentContainerStyle={styles.containerGap24}
        renderItem={({item, index}) => {
          return (

            <TouchableOpacity onPress={() => {
              setSelectedTimeIndex(index)
            }}>
              <View style={[styles.timeContainer, index == 0 ? {marginLeft: SPACING.space_24}: index == dateArray.length -1 ? {marginRight: SPACING.space_24} : {}, index == selectedTimeIndex 
              ? {backgroundColor: COLORS.Orange}: {}]}>
                <Text style={styles.timeText}>{item}</Text>
              </View>
            </TouchableOpacity>
          )
        }}
        />
      </View>
      
      <View style={styles.buttonPriceContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.totalPriceText}>Total Price</Text>
          <Text style={styles.price}>$ {price}.00</Text>
        </View>
        <TouchableOpacity onPress={BookSeats}>
          <Text style={styles.buttonText}>Buy Tickets</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flex: 1,
      backgroundColor: COLORS.Black
    },
    ImageBG: {
      width: "100%",
      aspectRatio: 3072/1727
    },
    linearGradient: {
      height: '100%'
    },
    appHeaderContainer: {
      marginHorizontal: SPACING.space_36,
      marginTop: SPACING.space_20 * 2,
    },
    screenText: {
      textAlign: "center",
      fontFamily: FONTFAMILY.poppins_regular,
      fontSize: FONTSIZE.size_10,
      color: COLORS.WhiteRGBA32,
    },
    seatContainer: {
      marginVertical: SPACING.space_20,
    },
    containerGap20: {
      gap: SPACING.space_20
    },
    seatRow: {
      flexDirection: 'row',
      gap: SPACING.space_20,
      justifyContent: "center",
    },
    seatIcon: {
      fontSize: FONTSIZE.size_24,
      color: COLORS.White,
    },
    seatRadioContainer: {
      flexDirection: "row",
      marginTop: SPACING.space_36,
      marginBottom: SPACING.space_10,
      alignItems: "center",
      justifyContent: "space-evenly",
    },
    radioContainer: {
      flexDirection: "row",
      gap: SPACING.space_10,
      alignItems: "center", 
    },
    radioIcon: {
      fontSize: FONTSIZE.size_20,
      color: COLORS.White
    },
    radioText: {
      fontFamily: FONTFAMILY.poppins_medium,
      fontSize: FONTSIZE.size_12,
      color: COLORS.White,
    },
    containerGap24: {
      gap: SPACING.space_24
    },
    dataContainer: {
      width: SPACING.space_10 * 7,
      height: SPACING.space_10 * 10,
      borderRadius: SPACING.space_10 * 10,
      backgroundColor: COLORS.DarkGrey,
      alignItems: "center",
      justifyContent: "center"
    },
    dateText: {
      fontFamily: FONTFAMILY.poppins_medium,
      fontSize: FONTSIZE.size_24,
      color: COLORS.White
    },
    dayText: {
      fontFamily: FONTFAMILY.poppins_regular,
      fontSize: FONTSIZE.size_12,
      color: COLORS.White
    },
    OuterContainer: {
      marginVertical: SPACING.space_24,

    },
    timeContainer: {
      paddingVertical: SPACING.space_10,
      borderWidth: 1,
      borderColor: COLORS.WhiteRGBA50,
      paddingHorizontal: SPACING.space_20,  
      borderRadius: BORDERRADIUS.radius_25,
      backgroundColor: COLORS.DarkGrey,
      alignItems: "center",
      justifyContent: "center",
    },
    timeText: {
      fontFamily: FONTFAMILY.poppins_regular,
      fontSize: FONTSIZE.size_14,
      color: COLORS.White,
    },
    buttonPriceContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: SPACING.space_24,
      paddingBottom: SPACING.space_24,
    },
    priceContainer: {
      alignItems: "center",
    },
    totalPriceText: {
      fontFamily: FONTFAMILY.poppins_regular,
      fontSize: FONTSIZE.size_14,
      color: COLORS.Grey,
    },
    price: {
      fontFamily: FONTFAMILY.poppins_medium,
      fontSize: FONTSIZE.size_24,
      color: COLORS.White,
    },
    buttonText: {
      borderRadius: BORDERRADIUS.radius_25,
      paddingHorizontal: SPACING.space_24,
      paddingVertical: SPACING.space_10, 
      fontFamily: FONTFAMILY.poppins_semibold,
      fontSize: FONTSIZE.size_16,
      color: COLORS.White,
      backgroundColor: COLORS.Orange
    }
});

export default SeatBookingScreen;