import EventCard from './EventCard.jsx'
import { ScrollView, Text, View } from 'react-native';

function EventList({ navigation, path, handleNavigate, events, option, userId, userEvents, updateUserEvents, justJoined }) {
    return (
        <ScrollView>
            { events &&
                (events.length>0 ? events.map(event => (
                    <EventCard 
                        key = {event.id}
                        title={event.title}
                        expDate={event.date}
                        status={event.status}
                        content={event.content}
                        onView={() => navigation.navigate('EventInfo', { handleNavigate: handleNavigate, path: path, event: event, option: option, userId: userId, userEvents: userEvents, updateUserEvents: updateUserEvents })}
                        joined={userEvents && userEvents.filter(e => e.id == event.id).length>0}
                        option={option}
                        justJoined={justJoined}
                    />
                )) : <View style={{alignItems: 'center'}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold', textDecorationLine: 'underline'}}>No events available</Text>
                    </View>
                )
            }
        </ScrollView>
    )
}

export default EventList;