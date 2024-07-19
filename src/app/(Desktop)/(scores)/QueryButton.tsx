import ButtonNodge from "@/app/_components/UI/Button/ButtonNodge";
import { motion } from "framer-motion";


type QueryButtonOptions = {
    label: string;
    value: string;
}


interface QuerButtonProps {
    options: QueryButtonOptions[];
    queryParams: URLSearchParams;
    queryparam_name: string;
    setQueryParam: (param: string, value: string) => void;
}

const QuerButton = (props: QuerButtonProps) => {
    const MotionButton = motion(ButtonNodge)
    const currentParam = props.queryParams.get(props.queryparam_name)
    const currentOption = (props.options.find(option => option.value === currentParam))
    const currentValue = currentOption ? currentOption.value : "unset"

    function handleOptionsClick(option: QueryButtonOptions) {// get the index of the current param

        // get the next option
        // if there is no next option, set it to the first option
        // set the query param
        props.setQueryParam(props.queryparam_name, option.value ?? undefined)
    }

    return props.options.map((option) => {

        return option.value !== currentValue ? <div key={option.label} className="flex gap-3">
            <MotionButton onClick={() => handleOptionsClick(option)}
            >
                {option.label}
            </MotionButton>
        </div > : null
    }
    )





}

export default QuerButton