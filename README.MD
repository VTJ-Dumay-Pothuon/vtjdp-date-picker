# Date Picker
This is a simple date picker component for React. It displays an input field,
that can be linked to a label, aria-labels, etc… But the difference is that
when you click on the input field, a calendar appears, allowing you to select
a date with a simple click.
## Requirements
This component requires `Node ≥6.9.0`, `React ≥18.2`, and `PropTypes ≥15.7.2` .
## Installation
To install the date picker component, run the following command:
```bash
npm install @vtjdp/date-picker
```
## Usage
To use the date picker component, import it into your project as follows:
```jsx
import DatePicker from '@vdjdp/date-picker'
```
Then, use it in your project as follows:
```jsx
<DatePicker />
```
## Parameters
The date picker component accepts the following parameters:
| **parameter** | **description**                                       | **possible values**  | **default value** |
|:-------------:|:-----------------------------------------------------:|:--------------------:|:-----------------:|
| lang          | The language that will be used for the month display. | ISO 639-1 codes      | 'default'         |
| format        | The format for the date : standard, US, or ISO        | DMY | MDY | YMD      | 'DMY'             |
| start         | The first day of the week displayed in the calendar.  | day names in english | 'monday'          |


lang: 'default' means that the language will be the one of the browser.

Parameters can be passed to the component in an object, as follows:
```jsx
<DatePicker lang="en-US" format="MDY" start='sunday' />
```

DatePicker also accepts various parameters that will be passed 
to the input field, as follows:
```jsx
<DatePicker
    lang="en-US"
    format="MDY"
    start='sunday'
    id="date-of-birth"
    className="input-homepage"
    style={{width: '100%'}}
    value={dateOfBirth}
    onChange={(date) => setDateOfBirth(date)}
/>
```