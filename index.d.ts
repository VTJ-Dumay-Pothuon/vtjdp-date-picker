declare module '@vtjdp/date-picker' {
    export type DatePickerProps = { lang: string ; format: string ; start: string }
    export const DatePicker: React.FC<DatePickerProps>
  }