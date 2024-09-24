document.addEventListener('click', event => {
  if (!timePickerPopup.contains(event.target) && !timePickerIcon.contains(event.target)) {
    timePickerPopup.style.display = 'none'
  }
})

timePickerIcon.addEventListener('click', event => {
  const iconRect = event.target.getBoundingClientRect()

  timePickerPopup.style.display = 'block'
  timePickerPopup.style.top = `${iconRect.bottom + window.scrollY}px`
  timePickerPopup.style.left = `${iconRect.right + window.scrollX - timePickerPopup.offsetWidth}px`
})

setTimeBtn.addEventListener('click', () => {
  time.value = formatTime()
  timePickerPopup.style.display = 'none'
})

saveTime.addEventListener('click', () => {
  updateTimeLocalStorage(false)
  updateStartTimeLocalStorage(false)
  updateEndTimeLocalStorage()
})

function formatTime(startTime = startTimePopup.value, endTime = endTimePopup.value) {
  if (startTime && endTime) {
    if (getCurrentLanguage() === 'de') {
      return `${startTime} - ${endTime} Uhr`
    } else if (getCurrentLanguage() === 'en') {
      const start12h = convertTo12HourFormat(startTime)
      const end12h = convertTo12HourFormat(endTime)
      return `${start12h} - ${end12h}`
    } else if (getCurrentLanguage() === 'fr') {
      const startFrench = startTime.replace(':', ' h ')
      const endFrench = endTime.replace(':', ' h ')
      return `${startFrench} - ${endFrench}`
    }
  }
  return undefined
}

function convertTo12HourFormat(time) {
  const [hour, minute] = time.split(':')
  const hour12 = hour % 12 || 12
  const period = hour >= 12 ? 'PM' : 'AM'
  return `${hour12}:${minute} ${period}`
}

function generateTimeOptions() {
  const storedStartTime = localStorage.getItem('startTime')
  const storedEndTime = localStorage.getItem('endTime')

  for (let hour = 0; hour < 24; hour++) {
    for (let minutes = 0; minutes < 60; minutes += 15) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`

      const optionStart = document.createElement('option')
      optionStart.value = timeString
      optionStart.textContent = timeString
      if (storedStartTime) {
        if (timeString === storedStartTime) optionStart.selected = true
      } else if (timeString === '14:00') {
        optionStart.selected = true
      }
      startTimePopup.appendChild(optionStart)

      const optionEnd = document.createElement('option')
      optionEnd.value = timeString
      optionEnd.textContent = timeString
      if (storedEndTime) {
        if (timeString === storedEndTime) optionEnd.selected = true
      } else if (timeString === '18:00') {
        optionEnd.selected = true
      }
      endTimePopup.appendChild(optionEnd)
    }
  }
}