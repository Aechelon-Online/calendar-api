
 async function getData () {
      const now = moment().toISOString()
      let url = new URL("https://www.googleapis.com/calendar/v3/calendars/greglucemusic@gmail.com/events")
      url.search = new URLSearchParams({
      'key': 'AIzaSyAHgEiHBOLjLHixU-ptMhF_3hdimwT55ro',
      'singleEvents': true,
      'timeMin': now,
      'maxResults': 100,
      'orderBy' : 'starttime'
      })
      
      let apiCall = await fetch(url)
      
      const data = await apiCall.json()
      console.log(data)

      
      for (let i = 0; i < data['items'].length; i++) {
      const summary = data["items"][i]['summary']
      const location = data['items'][i]['location']
      const locationParts = location.split(",")
      const city = locationParts[2]
      const stateAndZip = locationParts[3]
      const stateSplit = stateAndZip.split(" ")
      const state = stateSplit[1]

      console.log(locationParts[1])
      console.log(locationParts[2])
      console.log(locationParts[3])


      const dateTime = data['items'][i]['start']['dateTime']
      const realDate = moment(dateTime).format('ll')
      const realTime = moment(dateTime).format('LT')
      const dateSplit = realDate.split(",",1).toString()
      const monthDateSplit = dateSplit.split(" ")
      const month = monthDateSplit[0]
      const date = monthDateSplit[1]
      
      
      document.querySelector(".calendar-api").innerHTML += 
      `
      <div class="date-wrapper">
        <div class="big-date">
          <h1 class="year">${month}</h1>
          <h1 class="day">${date}</h1>
        </div>
        <div class="date-loc">
          <h1 class="location"><a class="google-map" target="_blank" href="https://www.google.com/maps/search/?api=1&query=${location}">${summary}</a></h1>
          <h1 class="location">${city + " " + state}</h1>
          <h1 class="dateTime">${realTime}</h1>
        </div>
      </div>
      `
      }
}
getData()


