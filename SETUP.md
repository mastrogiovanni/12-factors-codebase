export ENDPOINT="http://localhost:3000/api"

# Define hotels Excelsior and Panorama
http POST ${ENDPOINT}/hotels name=Excelsior stars=5
http POST ${ENDPOINT}/hotels name=Panorama stars=4

# Add room to Excelsior
http POST ${ENDPOINT}/rooms hotel=Excelsior number=13 type=Suite price=50 maxGuests=2

# List of rooms at Excelsior
http GET http://localhost:3000/api/rooms hotel=Excelsior

# Make a reseervation for the Excelsior
http POST http://localhost:3000/api/bookings hotel=Excelsior checkin="01/05/2021" checkout="07/05/2021" amount=50 guests=2 nights=6 adults=1 children=1

# See all reservations for the Excelsior
http GET http://localhost:3000/api/bookings hotel=Excelsior

