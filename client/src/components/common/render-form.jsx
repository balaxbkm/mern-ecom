import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";

const RenderForm = ({ formControls, formData, setFormData, onSubmit, buttonText, isButtonDisabled }) => {
    function renderInput(item) {
        let element = null;
        const value = formData[item.name] || '';

        switch (item.element) {
            case 'input':
                element = (
                    <>
                        <Label className="mb-1">{item.label}</Label>
                        <Input
                            type={item.type}
                            name={item.name}
                            id={item.name}
                            placeholder={item.placeholder}
                            value={value}
                            onChange={e => setFormData({ ...formData, [item.name]: e.target.value })}
                        />
                    </>
                );
                break;

            case 'select':
                element = (
                    <>
                        <Label className="mb-1">{item.label}</Label>
                        <Select value={value} onValueChange={value => setFormData({ ...formData, [item.name]: value })}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder={item.placeholder} />
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    item.options &&
                                        item.options.length > 0 ?
                                        item.options.map((option, i) => <SelectItem key={i} value={option.id}>{option.label}</SelectItem>) : null
                                }
                            </SelectContent>
                        </Select>
                    </>
                );
                break;

            case 'textarea':
                element = (
                    <>
                        <Label className="mb-1">{item.label}</Label>
                        <Textarea
                            name={item.name}
                            id={item.name}
                            placeholder={item.placeholder}
                            value={value}
                            onChange={e => setFormData({ ...formData, [item.name]: e.target.value })}
                        />
                    </>
                );
                break;

            default:
                element = (
                    <>
                        <Label className="mb-1">{item.label}</Label>
                        <Input
                            type={item.type}
                            name={item.name}
                            id={item.name}
                            placeholder={item.placeholder}
                            value={value}
                            onChange={e => setFormData({ ...formData, [item.name]: e.target.value })}
                        />
                    </>
                );
                break;
        }

        return element;
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-3 text-left mt-3">
                {
                    formControls.map((item, i) => (
                        <div className="grid w-full gap-2" key={i}>
                            {renderInput(item)}
                        </div>
                    ))
                }
            </div>
            <Button type="submit" className="mt-5 w-full" disabled={isButtonDisabled}>{buttonText || "Submit"}</Button>
        </form>
    );
}

export default RenderForm;