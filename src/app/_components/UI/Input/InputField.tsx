"use client"
import { secondsToMinutesAndSecondsString, stringToSeconds } from "@/utils/time";
import clsx from "clsx";
import { type ChangeEvent, useState, useEffect } from "react";


interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    callback: (e: number) => void;
    default?: number;
    updatedValue?: number;
}

function convertForState(timeValue: string) {
    switch (timeValue.length) {
        case 5:
            return timeValue;
        case 4:
            return timeValue + "0";
        case 3:
            return timeValue + "00";
        case 1:
            return "0" + timeValue + ":00";
        case 0:
            return "00:00";
        default:
            return "00:00";
    }
}
const InputField = (props: InputFieldProps) => {
    const [timeValue, setTimeValue] = useState(props.default ? secondsToMinutesAndSecondsString(props.default, true) : "");

    const handleTimeChange = (e: ChangeEvent<HTMLInputElement>) => {

        const inputValue = e.target.value;
        if (inputValue.length > 5) return;
        // Remove non-digit characters
        const sanitizedInput = inputValue.replace(/\D/g, '');

        // Format input va  lue to mm:ss
        let formattedInput = '';
        if (sanitizedInput.length >= 2) {
            formattedInput = sanitizedInput.substring(0, 2) + ':';
            if (sanitizedInput.length >= 4) {
                formattedInput += sanitizedInput.substring(2, 4);
            } else {
                formattedInput += sanitizedInput.substring(2);
            }
        } else {
            formattedInput = sanitizedInput;
        }

        setTimeValue(formattedInput);
        // Validate against the pattern 
        const timeInSeconds = stringToSeconds(convertForState(formattedInput));
        props.callback(timeInSeconds);

    };
    useEffect(() => {
        if (props.updatedValue) {
            setTimeValue(secondsToMinutesAndSecondsString(props.updatedValue, true));
        }
    }, [props.updatedValue])
    return (<>
        <input
            type="text"
            value={timeValue}
            onChange={handleTimeChange}
            onKeyDown={(e) => {
                if (e.key === 'Backspace' || e.keyCode === 8) {
                    const newValue = timeValue.slice(0, -1);
                    setTimeValue(newValue);
                    return;
                }
            }}
            onBlur={() => setTimeValue((prev) => convertForState(prev))}
            placeholder="mm:ss"
            pattern="[0-5]?[0-9]:[0-5][0-9]"
            title={"Please enter a valid time in the format mm:ss " + stringToSeconds(timeValue)}
            className={clsx("flex min-w-44 font-exo text-base text-white font-semibold tracking-wider items-center h-20 justify-center rounded-xl p-5 bg-osuhub-dark-ice-blue border-slate-700 ")}
        />
    </>
    );



}
export default InputField;