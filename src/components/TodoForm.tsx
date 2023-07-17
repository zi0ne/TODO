import React from "react";
import "./component.css"

//TodoFormProps 인터페이스정의 : 입력받을 값은 문자열임을 알려줌
export interface TodoFormProps {
  value: string; // 입력필드
  onChange: (text:string)=>void; //변경 이벤트
  onAdd: (text: string) => void; // 클릭 이벤트
}


const TodoForm: React.FC<TodoFormProps> = ({ value, onChange, onAdd }) => {
  //const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value) {
      return;
    }
    onAdd(value);
    //setText("");
  };

  // input과button(헤더부분) 요소를 렌더링 onChange 이벤트 핸들러를사용하여 입력값이 변할 때 text 상태 업데이트
  return (
    <form onSubmit={handleSubmit}>
      <div className="inputDiv">
      <input type="text" placeholder="할 일을 입력하세요..." value={value} onChange={(e) => onChange(e.target.value)} />
      </div>
      <button className="button1">Add</button>
    </form>
  );
};

export default TodoForm;
