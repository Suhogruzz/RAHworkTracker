import  {ChangeEvent,useState} from 'react';
import Records from './Records';
import "../App.css";

function Form() {
    const [records, setRecords] = useState<any[]>([]);
    const [form, setForm] = useState({date: '', km: ''});
    function parseDate(date: string) {
        const arr = String(date).split("-");
        return`${arr[2]}.${arr[1]}.${arr[0]}`;
    }

    function compare(b:string, a:string) {
        const arr1 = a.split(".");
        const arr2 = b.split(".");
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
        setRecords(prevRecords => prevRecords.filter(i => (i['date']) !== date));
    };

    const handleSubmit = (evt: ChangeEvent<HTMLFormElement> ) => {
        evt.preventDefault();
        if (!form.date || !form.km) return;
        form.date = parseDate(form.date);
        setRecords(prevRecords => {
            const arr: Array<any> = prevRecords.slice();
            const index = arr.findIndex((item) => item['date'] === form.date);
            if (index > -1) {
                const km = String(Number(arr[index]['km']) + Number(form.km));
                arr.splice(index, 1);
                arr.push(new Records(form.date, km));
                arr.sort((a, b) => compare(a['date'], b['date']));

            } else {
                const record = new Records(form.date, form.km);
                arr.push(record);
                arr.sort((a, b) => compare(a['date'], b['date']));
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
                <input name={"date"} type={"date"} value={form.date} min="2000-01-01" max="2999-01-01"onChange={handleChange}/>
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
                            return <tr key={element['date']}>
                                <th>{element['date']}</th>
                                <th>{element['km']}</th>
                                <th>{<button className={"remove"}
                                             onClick={() => handleRemove(element['date'])}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                                    </svg>
                                                </button>}
                                </th>
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