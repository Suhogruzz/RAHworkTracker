import  {ChangeEvent,useState} from 'react';
import RecordModel from './RecordModel';
import "../App.css";

function Form() {
    const [records, setRecords] = useState<any[]>([]);
    const [form, setForm] = useState({date: '', km: ''});

    function parseDate(date: string) {
        const arr = String(date).split("-");
        return`${arr[2]}.${arr[1]}.${arr[0]}`;
    }

    function compare(b:string, a:string) {
        const arr1 = String(a).split(".");
        const arr2 = String(b).split(".");
        const year = Number(arr1[2]) - Number(arr2[2]);
        const month = Number(arr1[1]) - Number(arr2[1]);
        const day = Number(arr1[0]) - Number(arr2[0]);

        if (year !== 0) return year;
        if (month !== 0) return month;
        if (day !== 0) return day;
        return 0;
    }

    const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
        const name = evt.target.name;
        const value = evt.target.value;
        setForm(prevForm => ({...prevForm, [name]: value}));
    };

    const handleRemove = (date: string) => {
        setRecords(prevRecords => prevRecords.filter(o => o['id'] !== date));
    };

    const handleSubmit = (evt: ChangeEvent<HTMLFormElement> ) => {
        evt.preventDefault();
        if (!form.date || !form.km) return;
        form.date = parseDate(form.date);
        setRecords(prevRecords => {
            const arr: Array<any> = prevRecords.slice();
            const index = arr.findIndex((item) => item['id'] === form.date);
            if (index > -1) {
                const km = String(Number(arr[index]['km']) + Number(form.km));
                arr.splice(index, 1);
                arr.push(new RecordModel(form.date, km));
                arr.sort((a, b) => compare(a['id'], b['id']));

            } else {
                const record = new RecordModel(form.date, form.km);
                arr.push(record);
                arr.sort((a, b) => compare(a['id'], b['id']));
            }
            setForm({date: '', km: ''});
            return [...arr];
        });
    };

    return (
        <div className={"main"}>
            <form onSubmit={handleSubmit}>
                <div>
                <label htmlFor="date" className="form-label">Дата (ДД.ММ.ГГ)</label>
                <label htmlFor="km" className="form-label">Пройдено км</label>
                </div>
                <div>
                <input name={"date"} type={"date"} value={form.date} onChange={handleChange}/>
                <input name={"km"} type={"number"} value={form.km} onChange={handleChange}/>
                <input type={"submit"} value={"OK"}/>
                </div>
            </form>
            <div className={"secondary"}>
                <table>
                    <thead>
                    <tr>
                        <th>Дата (ДД.ММ.ГГ)</th>
                        <th>Пройдено км</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {records.map(element => {
                            return <tr key={element['id']}>
                                <th>{element['id']}</th>
                                <th>{element['km']}</th>
                                <th>{<button className={"remove"}
                                             onClick={() => handleRemove(element['id'])}>{"X"}</button>}</th>
                            </tr>
                        }
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Form;