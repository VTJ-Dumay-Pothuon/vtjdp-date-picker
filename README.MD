# Date Picker
This is a simple date picker component for React. It displays an input field,
that can be linked to a label, aria-labels, etc… But the difference is that
when you click on the input field, a calendar appears, allowing you to select
a date with a simple click.
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