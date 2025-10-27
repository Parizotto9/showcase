import { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import InputMask from 'react-input-mask';
import { CalendarDays } from 'lucide-react';

interface InputDateProps {
  label?: string;
  className?: string;
  required?: boolean;
  onlyDay?: boolean;
  value: Date | null;
  onChange: (date: Date | null) => void;
}
type CustomInputProps = {
  value?: string;
  onClick?: () => void;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onlyDay?: boolean;
};

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ value, onClick, onChange, onlyDay }, ref) => (
    <InputMask
      mask={onlyDay ? '99/99/9999' : '99/99/9999 99:99'}
      value={value}
      onChange={onChange}
      placeholder={onlyDay ? 'dd/MM/yyyy' : 'dd/MM/yyyy HH:mm'}
    >
      {(inputProps) => (
        <div className="relative">
          <input
            {...inputProps}
            ref={ref}
            onClick={onClick}
            className="px-3 py-2 h-10 w-full rounded-md border bg-background text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none border-[#d1d5dbff] focus:border-[#a5a8ad] disabled:cursor-not-allowed disabled:opacity-50"
          />
          <CalendarDays
            onClick={onClick}
            color="#57576CFF"
            className="absolute right-1 top-1/2 transform -translate-y-1/2"
          />
        </div>
      )}
    </InputMask>
  )
);

const DateSelector = forwardRef<HTMLInputElement, InputDateProps>(
  ({ className, onlyDay, label, value, onChange, required, ...props }, ref) => {
    return (
      <div className={`w-full ${className}`}>
        {label && (
          <span className="mb-1 block  font-bold text-[#57576CFF]">
            {label} {required && '*'}
          </span>
        )}
        <DatePicker
          selected={value}
          onChange={onChange}
          showTimeSelect={!onlyDay}
          timeFormat="HH:mm"
          timeIntervals={15}
          wrapperClassName="datePicker"
          timeCaption="time"
          dateFormat={onlyDay ? 'dd/MM/yyyy' : 'dd/MM/yyyy HH:mm'}
          customInput={<CustomInput onlyDay={onlyDay} />}
        />
      </div>
    );
  }
);
export { DateSelector };