const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]

const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()

// Only edit below

// Create an array of size 7 for days of the week
const createArray = (length) => {
    const result = []

    for (let i = 0; i < length; i++) {
        result.push(i)
    }

    return result
}

const createData = () => {
    const current = new Date()
    current.setDate(1) // Set the date to the 1st day of the current month

    const startDay = current.getDay() // Get the day of the week (0-6) for the 1st day
    const daysInMonth = getDaysInMonth(current)

    const weeks = createArray(5)
    const result = []

    for (const weekIndex of weeks) {
        result.push({
            week: weekIndex + 1,
            days: []
        })

        for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
            const day = dayIndex - startDay + (weekIndex * 7) + 1
            const isValid = day > 0 && day <= daysInMonth

            result[weekIndex].days.push({
                dayOfWeek: dayIndex, // Changed to start from 0 (Sunday)
                value: isValid ? day : '',
            })
        }
    }

    return result
}

const addCell = (existing, classString, value) => {
    const result = /* html */ `
        ${existing}
        <td class="${classString}">
            &nbsp;${value}&nbsp;
        </td>
    `

    return result
}

const createHtml = (data) => {
    let result = ''

    for (const { week, days } of data) {
        let inner = ""
        inner = addCell(inner, 'table__cell table__cell_sidebar', `Week ${week}`)
    
        for (const { dayOfWeek, value } of days) {
            const isToday = new Date().getDate() === value
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6 // Sunday or Saturday
            const isAlternate = week % 2 === 0
            
            let classString = 'table__cell'

            if (isToday) classString += ' table__cell_today'
            if (isWeekend) classString += ' table__cell_weekend'
            if (isAlternate) classString += ' table__cell_alternate'
            
            inner = addCell(inner, classString, value)
        }

        result += `
            <tr>${inner}</tr>
        `
    }
    
    return result
}

// Only edit above

const current = new Date()
document.querySelector('[data-title]').innerText = `${MONTHS[current.getMonth()]} ${current.getFullYear()}`

const data = createData()
document.querySelector('[data-content]').innerHTML = createHtml(data)